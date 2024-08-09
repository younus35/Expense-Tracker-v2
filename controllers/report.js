const Expense = require("../model/expenses");
// const { Op } = require("sequelize");
const AWS = require('aws-sdk');
const User = require("../model/users");

function uploadToS3(data, filename){
   const BUCKET_NAME = 'expensetrackerreports';
   
   let s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
   })
    var params ={
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: "public-read"
    }
    return new Promise((resolve, reject)=>{
      s3Bucket.upload(params, (err, res)=>{
        if(err){
         reject(err);
        }else{
         resolve(res);
        }
     });
    }) 
  
}


exports.dailyReports = async (req, res, next) => {
    try {
      const date = req.body.date;

      const expenses = await Expense.findAll({
        where: { date:date, userId: req.user.id },
      });
      
      return res.send(expenses);
    } catch (error) {
      console.log(error);
    }
  };
  
  exports.monthlyReports = async (req, res, next) => {
    try {
      const month = req.body.month;
      console.log(month);
      // const expenses = await Expense.findAll({
      //   where: {
      //     date: {
      //       [Op.like]: `%-${month}-%`,
      //     },
      //     userId: req.user.id,
      //   },
      //   raw: true,
      // });
      return res.send(expenses);
    } catch (error) {
      console.log(error);
    }
  };

exports.downloadReports = async (req, res, next) =>{
  try{
    const userInstance = await User.findByPk(req.user.id);
    if(userInstance.ispremiumuser){
       const expenses = await req.user.getExpenses();
       const stringifiedExpenses = JSON.stringify(expenses);
       const userId = req.user.id;
       const filename = `Expense${userId}/${new Date()}.txt`;
       const fileUrl = await uploadToS3(stringifiedExpenses, filename);

       await userInstance.createDownloadFile({fileUrl:fileUrl.Location});
       res.status(200).json({fileUrl})
  }
}
  catch(err){
    console.log(err);
  }
}