// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Expense = sequelize.define('expenses',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     date:Sequelize.STRING,
//     amount:Sequelize.INTEGER,
//     description:Sequelize.STRING,
//     category:Sequelize.STRING
// })

// module.exports = Expense;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    date: {
        type: String,
        required: true
      },
    amount: {
        type: Number,
        required: true,
        min: 0
      },
    description: {
        type: String,
        required: true,
        trim: true
      },
    category: {
        type: String,
        required: true,
      },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
})

module.exports = mongoose.model('Expense', expenseSchema);
