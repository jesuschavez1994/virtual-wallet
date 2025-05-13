"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const registerClientService = require('../utils/apiClient');
const registerUser = async (req, res) => {
    // Destructuring the request body
    const { documento, nombres, email, celular } = req.body;
    if (!documento || !nombres || !email || !celular) {
        res.status(400).json({
            code: 'ERR_MISSING_FIELDS',
            message: 'All fields are required.'
        });
        return;
    }
    try {
        const response = await registerClientService(documento, nombres, email, celular);
        if (response.success) {
            res.status(200).json(response.data); // Operación exitosa
        }
        else {
            res.status(400).json({
                code: 'ERR_REGISTRATION_FAILED',
                message: response.message
            });
        }
    }
    catch (error) {
        res.status(500).json({
            code: 'ERR_SERVER',
            message: 'An error occurred while registering the user.'
        });
    }
};
exports.registerUser = registerUser;
