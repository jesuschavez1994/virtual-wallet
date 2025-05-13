import { Request, Response } from 'express';
const User = require('../models/User');
const  Wallet  = require('../models/Wallet');
const PaymentSession = require('../models/PaymentSession');
const  {generateToken}  = require('../utils/tokenGenerator');
const  {sendEmail}  = require('../services/emailService');

/**
 * Registra un nuevo cliente.
 */
const registerClient = async (req:Request , res:Response) => {
    const { document, names, email, celular } = req.body;

    if (!document || !names || !email || !celular) {
        return res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'All fields are required.' });
    }

    try {
        const user = new User({ document, names, email, celular });
        await user.save();
        return res.status(201).json({ code: 'SUCCESS', message: 'Client registered successfully.', success: true, });
    } catch (error) {
        return res.status(500).json({ code: 'ERR_SERVER', message: 'Failed to register client.', success: false, });
    }
};

/**
 * Carga dinero en la billetera.
 */
const loadWallet = async (req:Request , res:Response) => {
    const { documento, celular, monto } = req.body;

    if (!documento || !celular || !monto) {
        return res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'All fields are required.', success: false, });
    }
    if (monto <= 0) {
        return res.status(400).json({ code: 'ERR_INVALID_AMOUNT', message: 'Amount must be greater than zero.', success: false, });
    }
    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ documento: documento, celular });

        if (!user) {
            return res.status(404).json({ code: 'ERR_USER_NOT_FOUND', message: 'User not found.', success: false });
        }

        // Verificar si la billetera existe, si no, crearla
        let wallet = await Wallet.findOne({ userId: user._id })
        if (!wallet) {
            console.log("CREANDO WALLET")
            wallet = new Wallet({ userId: user._id, balance: 0 });
            await wallet.save();
        }

        // Cargar dinero en la billetera
        wallet.balance += monto;
        await wallet.save();
        console.log("SE GUARDO LA WALLET", wallet);
        return res.status(200).json({ code: 'SUCCESS', message: 'Wallet loaded successfully.', success: true, });
    } catch (error) {
        return res.status(500).json({ code: 'ERR_SERVER', message: 'Failed to load wallet.', success: false, });
    }
};

/**
 * Inicia un pago.
 */
const pay = async (req: Request, res: Response) => {
    const { documento, celular, monto } = req.body;

    if (!documento || !celular || !monto) {
        return res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'All fields are required.', success: false });
    }

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ documento, celular });
        if (!user) {
            return res.status(404).json({ code: 'ERR_USER_NOT_FOUND', message: 'User not found.', success: false });
        }

        // Verificar si la billetera existe y tiene saldo suficiente
        const wallet = await Wallet.findOne({ userId: user._id });
        if (!wallet || wallet.balance < monto) {
            return res.status(400).json({ code: 'ERR_INSUFFICIENT_BALANCE', message: 'Insufficient balance.', success: false });
        }

        // Generar un token de 6 dígitos
        const token = generateToken();

        console.log('USER', user);

        // Enviar el token al correo electrónico del usuario
        await sendEmail(user.email, `Tu token de confirmación es: ${token}`);

        // Generar un ID de sesión único
        const sessionId = new Date().getTime().toString(); // Simplemente un timestamp como ID de sesión

        // Calcular la fecha de expiración (por ejemplo, 5 minutos después de la creación)
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // Guardar la sesión de pago en la base de datos
        const paymentSession = new PaymentSession({
            sessionId,
            userId: user._id,
            token,
            monto,
            expiresAt,
        });
        await paymentSession.save();

        return res.status(200).json({
            code: 'SUCCESS',
            message: 'Payment initiated. Check your email for the confirmation token.',
            success: true,
            sessionId, // Enviar el ID de sesión al cliente
        });
    } catch (error) {
        console.error('Error initiating payment:', error);
        return res.status(500).json({ code: 'ERR_SERVER', message: 'Failed to initiate payment.', success: false });
    }
};

/**
 * Confirma un pago.
 */
const confirmPayment = async (req:Request , res:Response) => {
    const { sessionId, token } = req.body;

    if (!sessionId || !token) {
        return res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'Session ID and token are required.', success: false, });
    }

    try {
        // Aquí iría la lógica para validar el sessionId y token
        return res.status(200).json({ code: 'SUCCESS', message: 'Payment confirmed successfully.', success: true, });
    } catch (error) {
        return res.status(500).json({ code: 'ERR_SERVER', message: 'Failed to confirm payment.', success: false, });
    }
};

/**
 * Consulta el balance de la billetera.
 */
const checkBalance = async (req:Request , res:Response) => {

    const { documento, celular } = req.query;

    if (!documento || !celular) {
        return res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'Document and celular are required.', success: false, });
    }

    try {
         // Verificar si el usuario existe
        const user = await User.findOne({ documento, celular });
        if (!user) {
            return res.status(404).json({ code: 'ERR_USER_NOT_FOUND', message: 'User not found.',success: false });
        }

        const wallet = await Wallet.findOne({ userId: user._id });
        if (!wallet) {
            return res.status(404).json({ code: 'ERR_WALLET_NOT_FOUND', message: 'Wallet not found.', success: false, });
        }

        return res.status(200).json({ code: 'SUCCESS', balance: wallet.balance, success: true, message: 'Balance retrieved successfully.' });
    } catch (error) {
        return res.status(500).json({ code: 'ERR_SERVER', message: 'Failed to check balance.', success: false, });
    }
};

// Exporta los métodos usando CommonJS
module.exports = {
    registerClient,
    loadWallet,
    pay,
    confirmPayment,
    checkBalance,
};