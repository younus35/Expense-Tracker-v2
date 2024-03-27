const Expense = require('../model/expenses');
const User = require('../model/users');

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
    try{
        const {amount,description,category} = req.body;
        // Equivalent to:
        // const amount = req.body.amount;
        // const description = req.body.description;
        // const category = req.body.category;
        const createdExpense = await Expense.create({amount,description,category,userId:req.user.id})//propetry name and value name are same
        const totalExpense = Number(req.user.totalExpenses) + Number(amount);
        await User.update({
            totalExpenses: totalExpense
        },{
            where:{id:req.user.id}
        })
        res.json(createdExpense);
     }
     catch(err){
         console.log(err);
     }
}

exports.deleteExpense = async (req, res, next)=>{
    try{
      const id = req.params.Id;
      const response = await Expense.findByPk(id);
      const destroyedItem = await response.destroy();
      res.json(destroyedItem);
    }
    catch(err){
        console.log(err);
    }
}