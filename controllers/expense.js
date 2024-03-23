const Expense = require('../model/expenses');

exports.getExpense = async (req, res, next)=>{
    try{
         const expenses = await Expense.findAll();
         res.json(expenses);
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
       const createdExpense = await Expense.create({amount,description,category})//propetry name and value name are same
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