const axios = require('axios');

import { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:8081/api'; // Cambia esto a la URL de tu servicio

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export const registerClientService = async (
    documento: string, 
    nombres: string, 
    email: string, 
    celular: string
): Promise<ApiResponse<void>> => {
    try {
        console.log("LLEGMOS AQUI", `${BASE_URL}/register`);
        const response: AxiosResponse<ApiResponse<void>> = await axios.post(`${BASE_URL}/register`, {
            documento,
            nombres,
            email,
            celular
        });
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error registering client'
        };
    }
};

export const loadWalletService = async (
    documento: string, 
    celular: string, 
    monto: number
): Promise<ApiResponse<void>> => {
    console.log("loadWalletService", documento, celular, monto);
    try {
        const response: AxiosResponse<ApiResponse<void>> = await axios.post(`${BASE_URL}/wallet/load`, {
            documento,
            celular,
            monto
        });
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error loading wallet'
        };
    }
};

export const makePaymentService = async (
    documento: string, 
    celular: string, 
    monto: number
): Promise<ApiResponse<{ sessionId: string }>> => {
    try {
        const response: AxiosResponse<ApiResponse<{ sessionId: string }>> = await axios.post(`${BASE_URL}/wallet/pay`, {
            documento,
            celular,
            monto
        });
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error making payment'
        };
    }
};

export const confirmPaymentService = async (sessionId: string, token: string): Promise<ApiResponse<void>> => {
    try {
        const response: AxiosResponse<ApiResponse<void>> = await axios.post(`${BASE_URL}/wallet/confirm`, {
            sessionId,
            token
        });
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error confirming payment'
        };
    }
};

export const checkBalanceService = async (documento: string, celular: string): Promise<ApiResponse<{ balance: number }>> => {
    try {
        const response: AxiosResponse<ApiResponse<{ balance: number }>> = await axios.get(`${BASE_URL}/wallet/balance`, {
            params: { documento, celular }
        });
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error checking balance'
        };
    }
};