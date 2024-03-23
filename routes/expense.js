const express = require('express');
const router = express.Router();

const expenseControllers = require('../controllers/expense');

router.get('/get-expenses',expenseControllers.getExpense);

router.post('/add-expense',expenseControllers.postExpense);

router.delete('/delete-expense/:Id',expenseControllers.deleteExpense);

module.exports = router;