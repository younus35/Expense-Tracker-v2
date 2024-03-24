const express = require('express');
const router = express.Router();

const purchaseControllers = require('../controllers/purchase');
const userAuthentication = require('../middleware/auth');

router.get('/premiumship', userAuthentication.authenticate, purchaseControllers.purchasepremium);

router.post('/update-transaction', userAuthentication.authenticate, purchaseControllers.updateTransactionStatus);

module.exports = router;