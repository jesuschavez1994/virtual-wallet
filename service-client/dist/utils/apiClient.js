"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBalanceService = exports.confirmPaymentService = exports.makePaymentService = exports.loadWalletService = exports.registerClientService = void 0;
const axios = require('axios');
const BASE_URL = 'http://localhost:8081';
const registerClientService = async (document, names, email, celular) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
            document,
            names,
            email,
            celular
        });
        return response.data;
    }
    catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error registering client'
        };
    }
};
exports.registerClientService = registerClientService;
const loadWalletService = async (document, celular, amount) => {
    try {
        const response = await axios.post(`${BASE_URL}/load`, {
            document,
            celular,
            amount
        });
        return response.data;
    }
    catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error loading wallet'
        };
    }
};
exports.loadWalletService = loadWalletService;
const makePaymentService = async (document, celular, amount) => {
    try {
        const response = await axios.post(`${BASE_URL}/pay`, {
            document,
            celular,
            amount
        });
        return response.data;
    }
    catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error making payment'
        };
    }
};
exports.makePaymentService = makePaymentService;
const confirmPaymentService = async (sessionId, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/confirm`, {
            sessionId,
            token
        });
        return response.data;
    }
    catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error confirming payment'
        };
    }
};
exports.confirmPaymentService = confirmPaymentService;
const checkBalanceService = async (document, celular) => {
    try {
        const response = await axios.get(`${BASE_URL}/balance`, {
            params: { document, celular }
        });
        return response.data;
    }
    catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error checking balance'
        };
    }
};
exports.checkBalanceService = checkBalanceService;
