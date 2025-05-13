import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    documento: string;
    nombres: string;
    email: string;
    celular: string;
}

const userSchema: Schema = new Schema({
    documento: { type: String, required: true, unique: true },
    nombres: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    celular: { type: String, required: true }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);
module.exports = User;