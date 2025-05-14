const nodemailer = require('nodemailer');

// Configura el transportador de nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true para el puerto 465
    auth: {
        user: "demarco.moore@ethereal.email",
        pass: "fddH4w8CPYxkXvrvQp",
    },
});

transporter.verify().then(() => {
    console.log('Ready to send emails');    
})

/**
 * Envía un correo de confirmación con un token.
 * @param {string} to - Dirección de correo del destinatario.
 * @param {string} token - Token de confirmación.
 */
const sendEmail = async (to: string, token: string) => {
    const mailOptions = {
        from: "jesusgabrielchavez2024@gmail.com",
        to,
        subject: 'Confirmation Token',
        text: `Your confirmation token is: ${token}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (error: any) {
        throw new Error('Error sending email: ' + error.message);
    }
};

// Exporta la función usando CommonJS
module.exports = {
    sendEmail,
};