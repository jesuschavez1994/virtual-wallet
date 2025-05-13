"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBalance = exports.confirmPayment = exports.pay = exports.loadWallet = void 0;
const { checkBalanceService, confirmPaymentService, loadWalletService, makePaymentService } = require('../utils/apiClient');
const handleError = require('../utils/handleError');
const loadWallet = async (req, res) => {
    const { document, celular, value } = req.body;
    if (!document || !celular || !value) {
        res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'All fields are required.' });
        return;
    }
    try {
        const response = await loadWalletService(document, celular, value);
        if (response.success) {
            res.status(200).json(response.data); // Successful operation
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
exports.loadWallet = loadWallet;
const pay = async (req, res) => {
    const { document, celular, amount } = req.body;
    if (!document || !celular || !amount) {
        res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'All fields are required.' });
        return;
    }
    try {
        const response = await makePaymentService(document, celular, amount);
        if (response.success) {
            res.status(200).json(response.data); // Successful operation
        }
        else {
            res.status(400).json({
                code: 'ERR_PAYMENT_FAILED',
                message: response.message
            });
        }
    }
    catch (error) {
        handleError(error, res, 'ERR_PAYMENT_FAILED');
    }
};
exports.pay = pay;
const confirmPayment = async (req, res) => {
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
    }
    catch (error) {
        handleError(error, res, 'ERR_CONFIRMATION_FAILED');
    }
};
exports.confirmPayment = confirmPayment;
const checkBalance = async (req, res) => {
    const { document, celular } = req.body;
    if (!document || !celular) {
        res.status(400).json({ code: 'ERR_MISSING_FIELDS', message: 'Document and celular are required.' });
        return;
    }
    try {
        const response = await checkBalanceService(document, celular);
        if (response.success) {
            res.status(200).json(response.data); // Successful operation
        }
        else {
            res.status(400).json({
                code: 'ERR_BALANCE_CHECK_FAILED',
                message: response.message
            });
        }
    }
    catch (error) {
        handleError(error, res, 'ERR_BALANCE_CHECK_FAILED');
    }
};
exports.checkBalance = checkBalance;
