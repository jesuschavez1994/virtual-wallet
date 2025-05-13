import mongoose, { Document, Schema } from 'mongoose';

export interface IPaymentSession extends Document {
    sessionId: string; // ID único para identificar la sesión de pago
    userId: string; // ID del usuario que realiza el pago
    token: string; // Token de 6 dígitos generado para confirmar el pago
    amount: number; // Monto del pago
    createdAt: Date; // Fecha de creación de la sesión
    expiresAt: Date; // Fecha de expiración del token
    isConfirmed: boolean; // Indica si el pago ha sido confirmado
}

const PaymentSessionSchema: Schema = new Schema({
    sessionId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    token: { type: String, required: true },
    monto: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }, // Por ejemplo, 5 minutos después de `createdAt`
    isConfirmed: { type: Boolean, default: false },
});

const PaymentSession = mongoose.model<IPaymentSession>('PaymentSession', PaymentSessionSchema);

module.exports = PaymentSession;