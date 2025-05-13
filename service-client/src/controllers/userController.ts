import { Request, Response } from 'express';

const { registerClientService } = require('../utils/apiClient');

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    // Destructuring the request body
    const { documento, nombres, email, celular } = req.body;

    console.log("BODY", {
        documento,
        nombres,
        email,
        celular
    });

    if (!documento || !nombres || !email || !celular) {
        res.status(400).json({
            code: 'ERR_MISSING_FIELDS',
            message: 'All fields are required.'
        });
        return;
    }

    try {
        console.log('CONSULTANDO...')
        const response = await registerClientService(documento, nombres, email, celular);

        console.log('await', response);

        if(response.success) {
            res.status(200).json(response); // Operación exitosa
        }
        else {
            res.status(400).json({
                code: 'ERR_REGISTRATION_FAILED',
                message: response.message
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 'ERR_SERVER',
            message: 'An error occurred while registering the user.'
        });
    }
};