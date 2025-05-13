import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Change this to your actual API base URL

export interface ClientRegistration {
    documento: string;
    nombres: string;
    email: string;
    celular: string;
}

export interface WalletLoad {
    documento: string;
    celular: string;
    valor: number;
}

export interface Payment {
    documento: string;
    celular: string;
    valor: number;
}

export interface BalanceCheck {
    documento: string;
    celular: string;
}

export const registerClient = async (data: ClientRegistration) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, data);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const loadWallet = async (data: WalletLoad) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/load`, data);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const makePayment = async (data: Payment) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/pay`, data);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const confirmPayment = async (sessionId: string, token: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/confirm`, { sessionId, token });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const checkBalance = async (data: BalanceCheck) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/balance`, data);
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};