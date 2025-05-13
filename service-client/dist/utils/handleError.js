"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
/**
 * Maneja errores y envía una respuesta al cliente.
 * @param error - El error capturado.
 * @param res - El objeto de respuesta de Express.
 * @param errorCode - El código de error personalizado.
 */
const handleError = (error, res, errorCode) => {
    if (axios.isAxiosError(error)) {
        // Ahora TypeScript sabe que 'error' es un AxiosError
        res.status(error.response?.status || 500).json({
            code: errorCode,
            message: error.response?.data?.message || error.message,
        });
    }
    else if (error instanceof Error) {
        // Ahora TypeScript sabe que 'error' es una instancia de Error
        res.status(500).json({
            code: errorCode,
            message: error.message || 'An unexpected error occurred.',
        });
    }
    else {
        // Manejar errores genéricos
        res.status(500).json({
            code: errorCode,
            message: 'An unexpected error occurred.',
        });
    }
};
// Exporta la función usando CommonJS
module.exports = handleError;
