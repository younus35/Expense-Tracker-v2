const express = require('express');
const router = express.Router();
const userAuthentication = require('../middleware/auth');

const expenseControllers = require('../controllers/expense');

router.get('/get-expenses', userAuthentication.authenticate,expenseControllers.getExpense);

router.post('/add-expense', userAuthentication.authenticate, expenseControllers.postExpense);

router.delete('/delete-expense/:Id', userAuthentication.authenticate,expenseControllers.deleteExpense);

module.exports = router;