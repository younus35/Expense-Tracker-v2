const Expense = require('../model/expenses');
const User = require('../model/users');
// const sequelize = require('../util/database');
const mongoose = require('mongoose');

exports.getExpense = async (req, res, next)=>{
    try{
         const page = parseInt(req.query.page) || 1;
         const EXPENSE_PER_PAGE = parseInt(req.query.rows) || 5;
        //  let totalExpenses = await Expense.count({where:{userId: req.user.id}});
         let totalExpenses = await Expense.countDocuments({userId: req.user._id})
        //  const expenses = await Expense.find({
        //     where:{userId: req.user.id},
        //     offset:(page-1)*EXPENSE_PER_PAGE,
        //     limit:EXPENSE_PER_PAGE
        // });
        const expenses = await Expense.find({ userId: req.user._id })
            .skip((page - 1) * EXPENSE_PER_PAGE)
            .limit(EXPENSE_PER_PAGE);
            
        res.json({expenses, 
            ispremiumuser:req.user.ispremiumuser,
            currentPage: page,
            hasNextPage: EXPENSE_PER_PAGE * page < totalExpenses,
            nextPage: page +1,
            hasPreviousPage: page >1,
            previousPage: page-1,
            lastPage: Math.ceil(totalExpenses/EXPENSE_PER_PAGE)
        });
    }
    catch(err){
         console.log(err);
    }
}

exports.postExpense = async (req, res, next)=>{
    // const t = await sequelize.transaction();
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {amount,description,category,date} = req.body;
        // Equivalent to:
        // const amount = req.body.amount;
        // const description = req.body.description;
        // const category = req.body.category;
        // const createdExpense = await Expense.create({amount,description,category,date,userId:req.user.id}, {transaction: t})//propetry name and value name are same
        const createdExpense = new Expense({amount,description,category,date,userId:req.user._id})
        await createdExpense.save({session})
        const totalExpense = Number(req.user.totalExpenses) + Number(amount);
        // await User.update({
        //     totalExpenses: totalExpense
        // },{
        //     where:{id:req.user.id},
        //     transaction: t
        // })
        await User.findByIdAndUpdate(req.user._id, {
            totalExpenses: totalExpense
          }, { session });
        // await t.commit();
        await session.commitTransaction();
        session.endSession();
        res.json(createdExpense);
     }
     catch(err){
        // await t.rollback();
        await session.abortTransaction();
        session.endSession();
         console.log(err);
     }
}

exports.deleteExpense = async (req, res, next)=>{
    // const t = await sequelize.transaction();
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
      const id = req.params.Id;
    //   console.log(id);
    //   const response = await Expense.findByPk(id);
    const response = await Expense.findById(id).session(session);
    if (!response) {
        throw new Error('Expense not found');
    }
      const totalExpense = Number(req.user.totalExpenses) - Number(response.amount);
    //   await User.update({
    //     totalExpenses: totalExpense
    //   },{
    //     where:{id: req.user.id},
    //     transaction: t
    //   })
      await User.findByIdAndUpdate(req.user._id,
        {totalExpenses: totalExpense},
        {session} //  { new: true, session } Omitting { new: true }: Returns the document before the update.  Including { new: true }: Returns the document after the update.
      )
    // console.log(totalExpense);
    //  const destroyedItem = await response.destroy({where:{id: id, userId:req.user.id}, transaction: t});
    const destroyedItem = await Expense.deleteOne({ _id: id, userId: req.user._id }).session(session);
    //   await t.commit();
      await session.commitTransaction();
      session.endSession();
      res.json(destroyedItem);
    }
    catch(err){
        // await t.rollback();
        await session.abortTransaction();
        session.endSession();
        console.log(err);
    }
}