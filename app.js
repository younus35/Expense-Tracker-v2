const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');

const User = require('./model/users');
const Expense = require('./model/expenses');


const app = express();
app.use(cors());

const userRoutes = require('./routes/users')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase');
const Order = require('./model/orders');

app.use(bodyParser.json({extended: false}));

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
.sync()
.then(result =>{
    app.listen(3000);
})
.catch(err => console.log(err));