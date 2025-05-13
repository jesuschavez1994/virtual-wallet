import { Router } from 'express';
const registerUser = require('../controllers/userController');
const {
    registerClient,
    loadWallet,
    pay,
    confirmPayment,
    checkBalance,
} = require('../controllers/walletController'); // Importa los métodos correctamente

const router = Router();

// User registration route
router.post('/register', registerUser);

// Wallet operations
router.post('/wallet/load', loadWallet);
router.post('/wallet/pay', pay);
router.post('/wallet/confirm', confirmPayment);
router.get('/wallet/balance', checkBalance);

module.exports = router;