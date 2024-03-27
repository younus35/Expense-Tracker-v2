const User = require('../model/users');
const Expense = require('../model/expenses');
const sequelize = require('../util/database');


exports.getUserLeaderBoard = async (req, res, next)=>{
    try{
        const userLeaderBoardDetails = await User.findAll({ //insted of findAll() where it gives all attributes use the below
            attributes:['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total']],
            include: [{
                model: Expense,
                attributes:[]
            }],
            group:['user.id'],
            order:[['total','DESC']]
        });
        // const userTotalExpenses = await Expense.findAll({
        //     attributes: ['userId', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total']],
        //     group:['userid'],
            
        // });// we have optimised in the User.findAll using the joins SO NO NEED OF IT NOW
        // const userTotalExpenses = {};
        // expenses.forEach((expense)=>{
        //     if(userTotalExpenses[expense.userId]){
        //     userTotalExpenses[expense.userId] += expense.amount
        //     }else{
        //         userTotalExpenses[expense.userId] = expense.amount
        //     }
        // })
        //console.log(userTotalExpenses);
        // var userLeaderBoardDetails = [];
        // users.forEach((user)=>{
        //      userLeaderBoardDetails.push({name:user.name, total:userTotalExpenses[user.id] || 0})
        // })
        // console.log(userLeaderBoardDetails)
        // userLeaderBoardDetails.sort((a,b)=> b.total - a.total);

        res.status(200).json(userLeaderBoardDetails);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}