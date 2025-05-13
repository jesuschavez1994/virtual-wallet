"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerUser = require('../controllers/userController');
const { registerClient, loadWallet, pay, confirmPayment, checkBalance, } = require('../controllers/walletController'); // Importa los métodos correctamente
const router = (0, express_1.Router)();
// User registration route
router.post('/register', registerUser);
// Wallet operations
router.post('/wallet/load', loadWallet);
router.post('/wallet/pay', pay);
router.post('/wallet/confirm', confirmPayment);
router.get('/wallet/balance', checkBalance);
module.exports = router;
