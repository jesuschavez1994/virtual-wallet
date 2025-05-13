"use strict";
const nodemailer = require('nodemailer');
// Configura el transportador de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // o cualquier otro servicio de correo
    auth: {
        user: process.env.EMAIL_USER, // tu correo electrónico
        pass: process.env.EMAIL_PASS, // tu contraseña de correo electrónico
    },
});
/**
 * Envía un correo de confirmación con un token.
 * @param {string} to - Dirección de correo del destinatario.
 * @param {string} token - Token de confirmación.
 */
const sendConfirmationEmail = async (to, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Confirmation Token',
        text: `Your confirmation token is: ${token}`,
    };
    try {
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        throw new Error('Error sending email: ' + error.message);
    }
};
// Exporta la función usando CommonJS
module.exports = {
    sendConfirmationEmail,
};
