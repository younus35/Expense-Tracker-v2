const express = require('express');
const premiumControllers = require('../controllers/premium');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/show-leaderboard', userAuthentication.authenticate,premiumControllers.getUserLeaderBoard);

module.exports = router;