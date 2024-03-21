const Sequelize = require('sequelize');

const sequelize = new Sequelize('Expense-Tracker', 'root', 'MDafnan18x',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;