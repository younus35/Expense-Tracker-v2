const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');

const User = require('./model/users');
const Expense = require('./model/expenses');
const Order = require('./model/orders');


const app = express();

const dotenv = require('dotenv');// to include the .env file
dotenv.config();

app.use(cors());

const userRoutes = require('./routes/users')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');

app.use(bodyParser.json({extended: false}));

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);

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