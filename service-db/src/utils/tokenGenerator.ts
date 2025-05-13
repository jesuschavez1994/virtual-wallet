import { randomInt } from 'crypto';

export const generateToken = (): string => {
    const token = randomInt(100000, 999999).toString();
    return token;
};