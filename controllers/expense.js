const Expense = require('../model/expenses');
const User = require('../model/users');
const sequelize = require('../util/database');

exports.getExpense = async (req, res, next)=>{
    try{
         const page = parseInt(req.query.page) || 1;
         const EXPENSE_PER_PAGE = parseInt(req.query.rows);
         let totalExpenses = await Expense.count({where:{userId: req.user.id}});
         const expenses = await Expense.findAll({
            where:{userId: req.user.id},
            offset:(page-1)*EXPENSE_PER_PAGE,
            limit:EXPENSE_PER_PAGE
        });
        res.json({expenses, 
            ispremiumuser:req.user.ispremiumuser,
            currentPage: page,
            hasNextPage: EXPENSE_PER_PAGE * page < totalExpenses,
            nextPage: page +1,
            hasPreviousPage: page -1,
            previousPage: page-1,
            lastPage: Math.ceil(totalExpenses/EXPENSE_PER_PAGE)
        });
    }
    catch(err){
         console.log(err);
    }
}

exports.postExpense = async (req, res, next)=>{
    const t = await sequelize.transaction();
    try{
        const {amount,description,category,date} = req.body;
        // Equivalent to:
        // const amount = req.body.amount;
        // const description = req.body.description;
        // const category = req.body.category;
        const createdExpense = await Expense.create({amount,description,category,date,userId:req.user.id}, {transaction: t})//propetry name and value name are same
        const totalExpense = Number(req.user.totalExpenses) + Number(amount);
        await User.update({
            totalExpenses: totalExpense
        },{
            where:{id:req.user.id},
            transaction: t
        })
        await t.commit();
        res.json(createdExpense);
     }
     catch(err){
        await t.rollback();
         console.log(err);
     }
}

exports.deleteExpense = async (req, res, next)=>{
    const t = await sequelize.transaction();
    try{
      const id = req.params.Id;
      const response = await Expense.findByPk(id);
      const totalExpense = Number(req.user.totalExpenses) - Number(response.amount);
      await User.update({
        totalExpenses: totalExpense
      },{
        where:{id: req.user.id},
        transaction: t
      })
      console.log(totalExpense);
      const destroyedItem = await response.destroy({where:{id: id, userId:req.user.id}, transaction: t});
      await t.commit();
      res.json(destroyedItem);
    }
    catch(err){
        await t.rollback();
        console.log(err);
    }
}