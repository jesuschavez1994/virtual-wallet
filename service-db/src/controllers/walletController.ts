import { Request, Response } from 'express';
const { User } = require('../models/User');
const { Wallet } = require('../models/Wallet');
const { generateToken } = require('../utils/tokenGenerator');
const { sendEmail } = require('../services/emailService');

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
    const { document, celular, value } = req.body;

    if (!document || !celular || !value) {
        return res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'All fields are required.', success: false, });
    }

    try {
        const wallet = await Wallet.findOne({ document, celular });
        if (!wallet) {
            return res.status(404).json({ code: 'ERR_WALLET_NOT_FOUND', message: 'Wallet not found.', success: false, });
        }

        wallet.balance += value;
        await wallet.save();
        return res.status(200).json({ code: 'SUCCESS', message: 'Wallet loaded successfully.', success: true, });
    } catch (error) {
        return res.status(500).json({ code: 'ERR_SERVER', message: 'Failed to load wallet.', success: false, });
    }
};

/**
 * Inicia un pago.
 */
const pay = async (req:Request , res:Response) => {
    const { document, celular, amount } = req.body;

    if (!document || !celular || !amount) {
        return res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'All fields are required.', success: false, });
    }

    try {
        const wallet = await Wallet.findOne({ document, celular });
        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ code: 'ERR_INSUFFICIENT_BALANCE', message: 'Insufficient balance.', success: false, });
        }

        const token = generateToken();
        await sendEmail(wallet.email, token);

        const sessionId = new Date().getTime(); // Simple session ID generation
        return res.status(200).json({ code: 'SUCCESS', message: 'Payment initiated. Check your email for confirmation.', success: true, sessionId, token });
    } catch (error) {
        return res.status(500).json({ code: 'ERR_SERVER', message: 'Failed to initiate payment.', success: false, });
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
    const { document, celular } = req.body;

    if (!document || !celular) {
        return res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'Document and celular are required.', success: false, });
    }

    try {
        const wallet = await Wallet.findOne({ document, celular });
        if (!wallet) {
            return res.status(404).json({ code: 'ERR_WALLET_NOT_FOUND', message: 'Wallet not found.', success: false, });
        }

        return res.status(200).json({ code: 'SUCCESS', balance: wallet.balance, success: true, });
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