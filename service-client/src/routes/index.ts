import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import {pay, loadWallet, checkBalance,confirmPayment} from '../controllers/walletController';

const router = Router();

// User registration route
router.post('/register', registerUser);

// Wallet operations
router.post('/load-money', loadWallet);
router.post('/pay', pay);
router.post('/confirm-payment', confirmPayment);
router.get('/balance', checkBalance);

module.exports = router;