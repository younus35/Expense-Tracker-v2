const User = require('../model/users');
const Expense = require('../model/expenses');


exports.getUserLeaderBoard = async (req, res, next)=>{
    try{
        const users = await User.findAll();
        const expenses = await Expense.findAll();
        
        const userTotalExpenses = {};

        expenses.forEach((expense)=>{
            if(userTotalExpenses[expense.userId]){
            userTotalExpenses[expense.userId] += expense.amount
            }else{
                userTotalExpenses[expense.userId] = expense.amount
            }
        })
        //console.log(userTotalExpenses);
        var userLeaderBoardDetails = [];
        users.forEach((user)=>{
             userLeaderBoardDetails.push({name:user.name, total:userTotalExpenses[user.id] || 0})
        })
       // console.log(userLeaderBoardDetails)
        userLeaderBoardDetails.sort((a,b)=> b.total - a.total);
        
        res.status(200).json(userLeaderBoardDetails);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}