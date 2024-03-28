const express = require('express');

const router = express.Router();
const passwordControllers = require('../controllers/password');

router.post('/forgotpassword',passwordControllers.forgotPassword)

module.exports = router;