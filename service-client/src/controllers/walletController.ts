import { Request, Response } from 'express';

const { 
    checkBalanceService,
    confirmPaymentService,
    loadWalletService,
    makePaymentService  
} = require('../utils/apiClient');

const handleError = require('../utils/handleError');

export const loadWallet = async (req: Request, res: Response): Promise<void> => {
    const { documento, celular, monto } = req.body;

    console.log("loadWallet", {
        documento,
        celular,
        monto
    })
    if (!documento || !celular || !monto) {
        res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'All fields are required.' });
        return;
    }


    try {
        const response = await loadWalletService(documento, celular, monto);
        console.log("loadWallet response", response)
        if(response.success) {
            res.status(200).json(response); // Operación exitosa
        }
        else {
            res.status(400).json({
                code: 'ERR_LOAD_FAILED',
                message: response.message
            });
        }
    } 
    catch (error) {
        handleError(error, res, 'ERR_LOAD_FAILED');
    }
};

export const pay = async (req: Request, res: Response): Promise<void> => {

    const { documento, celular, monto } = req.body;

    if (!documento || !celular || !monto) {
        res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'All fields are required.' });
        return;
    }

    try {
        const response = await makePaymentService(documento, celular, monto);
        if (response.success) {
            res.status(200).json(response); // Successful operation
        }
        else {
            res.status(400).json({
                code: 'ERR_PAYMENT_FAILED',
                message: response.message
            });
        }
    } catch (error) {
        handleError(error, res, 'ERR_PAYMENT_FAILED');
    }
};

export const confirmPayment = async (req: Request, res: Response): Promise<void> => {
    const { sessionId, token } = req.body;

    if (!sessionId || !token) {
        res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'Session ID and token are required.' });
        return;
    }

    try {
        const response = await confirmPaymentService(sessionId, token);
        if (response.success) {
            res.status(200).json(response.data); // Successful operation
        }
        else {
            res.status(400).json({
                code: 'ERR_CONFIRMATION_FAILED',
                message: response.message
            });
        }
    } catch (error) {
        handleError(error, res, 'ERR_CONFIRMATION_FAILED');
    }
};

export const checkBalance = async (req: Request, res: Response): Promise<void> => {
    const { documento, celular } = req.query;

    console.log("QUERY", req.query);

    if (!documento || !celular) {
        res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'Document and celular are required.' });
        return;
    }

    try {
        const response = await checkBalanceService(documento, celular);
        if(response.success) {
            res.status(200).json(response); // Successful operation
        }
        else {
            res.status(400).json({
                code: 'ERR_BALANCE_CHECK_FAILED',
                message: response.message
            });
        }
    } catch (error) {
        handleError(error, res, 'ERR_BALANCE_CHECK_FAILED');
    }
};