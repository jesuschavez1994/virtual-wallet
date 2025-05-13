"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const walletController_1 = require("../controllers/walletController");
const router = (0, express_1.Router)();
// User registration route
router.post('/register', userController_1.registerUser);
// Wallet operations
router.post('/load-money', walletController_1.loadWallet);
router.post('/pay', walletController_1.pay);
router.post('/confirm-payment', walletController_1.confirmPayment);
router.get('/balance', walletController_1.checkBalance);
module.exports = router;
