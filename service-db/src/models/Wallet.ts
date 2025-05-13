import mongoose, { Document, Schema } from 'mongoose';

export interface IWallet extends Document {
    userId: string;
    balance: number;
}

const WalletSchema: Schema = new Schema({
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, default: 0 }
});

const Wallet = mongoose.model<IWallet>('Wallet', WalletSchema);

module.exports = Wallet;