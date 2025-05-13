"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/User');
/**
 * Registra un nuevo usuario.
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 */
const registerUser = async (req, res) => {
    const { documento, nombres, email, celular } = req.body;
    if (!documento || !nombres || !email || !celular) {
        return res.status(400).json({
            code: 'ERR_MISSING_FIELDS',
            message: 'Todos los campos son requeridos.',
        });
    }
    try {
        const newUser = new User({ documento, nombres, email, celular });
        await newUser.save();
        return res.status(201).json({
            code: 'SUCCESS',
            message: 'Cliente registrado exitosamente.',
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 'ERR_SERVER',
            message: 'Error al registrar el cliente.',
        });
    }
};
// Exporta el método usando CommonJS
module.exports = registerUser;
