const Expense = require('../model/expenses');
const User = require('../model/users');
const sequelize = require('../util/database');

exports.getExpense = async (req, res, next)=>{
    try{
         const expenses = await Expense.findAll({where:{userId: req.user.id}});
         res.json({expenses, ispremiumuser:req.user.ispremiumuser});
    }
    catch(err){
         console.log(err);
    }
}

exports.postExpense = async (req, res, next)=>{
    const t = await sequelize.transaction();
    try{
        const {amount,description,category} = req.body;
        // Equivalent to:
        // const amount = req.body.amount;
        // const description = req.body.description;
        // const category = req.body.category;
        const createdExpense = await Expense.create({amount,description,category,userId:req.user.id}, {transaction: t})//propetry name and value name are same
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