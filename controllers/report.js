const Expense = require("../model/expenses");
const { Op } = require("sequelize");
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

      const expenses = await Expense.find(
         {date:date, userId: req.user._id},
      );
      return res.send(expenses);
    } catch (error) {
      console.log(error);
    }
  };
  
  exports.monthlyReports = async (req, res, next) => {
    try {
      const month = req.body.month;
      console.log(month);
      const expenses = await Expense.find({
        date: { $regex: `-${month}-`, $options: 'i' }, // For case-insensitive match
        userId: req.user._id
      });
      return res.send(expenses);
    } catch (error) {
      console.log(error);
    }
  };

exports.downloadReports = async (req, res, next) =>{
  try{
    const userInstance = await User.findById(req.user._id);
    if(userInstance.ispremiumuser){
       const expenses = await userInstance.getExpenses();
       const stringifiedExpenses = JSON.stringify(expenses);
       const userId = req.user._id;
       const filename = `Expense${userId}/${new Date()}.txt`;
       const fileUrl = await uploadToS3(stringifiedExpenses, filename);

      //  await userInstance.createDownloadFile({fileUrl:fileUrl.Location});
      await DownloadFile.create({ fileUrl: fileUrl.Location, userId: userInstance._id });
       res.status(200).json({fileUrl})
  }
}
  catch(err){
    console.log(err);
  }
}