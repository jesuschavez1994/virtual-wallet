"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const crypto_1 = require("crypto");
const generateToken = () => {
    const token = (0, crypto_1.randomInt)(100000, 999999).toString();
    return token;
};
exports.generateToken = generateToken;
