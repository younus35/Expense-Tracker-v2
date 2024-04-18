const path = require('path');
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
// const morgan = require('morgan');
const fs = require('fs');

const sequelize = require('./util/database');

const User = require('./model/users');
const Expense = require('./model/expenses');
const Order = require('./model/orders');
const resetPassword = require('./model/resetPassword');
const downloadFile = require('./model/download');


const app = express();

const dotenv = require('dotenv');// to include the .env file
dotenv.config();

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "script-src 'self' https://checkout.razorpay.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;"
    );
    next();
  });
// app.use(morgan('combined', {stream: accessLogStream}));

const userRoutes = require('./routes/users')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/passwords');
const reportsRouter = require("./routes/reports");

app.use(express.json()); // app.use(bodyParser.json({extended: false})); 

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password',passwordRoutes);
app.use("/reports", reportsRouter);

app.use((req, res) =>{
    console.log('url is ', req.url);
    res.sendFile(path.join(__dirname, `frontend/${req.url}`))
})

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(resetPassword);
resetPassword.belongsTo(User);

User.hasMany(downloadFile, {foreignKey: "userId"});
downloadFile.belongsTo(User, {foreignKey: "userId"})

sequelize
.sync()
.then(result =>{
    app.listen(process.env.PORT || 3000);
})
.catch(err => console.log(err));