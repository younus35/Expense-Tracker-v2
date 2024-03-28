const express = require('express');

const router = express.Router();
const passwordControllers = require('../controllers/password');

router.post('/forgotpassword',passwordControllers.forgotPassword);

router.get('/resetpassword/:resetpasswordid',passwordControllers.resetpassword)

router.get('/updatepassword/:id',passwordControllers.updatePassword);

module.exports = router;