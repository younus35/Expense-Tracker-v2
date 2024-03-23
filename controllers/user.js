const User = require('../model/users');
const bcrypt = require('bcrypt');

exports.postUser = async (req, res, next) =>{
    try{
    const user = req.body.user;//here user is user in frontend signup index.js line 7
    const email = req.body.email;
    const password = req.body.password;
    const saltrounds = 10;
    const hash = await bcrypt.hash(password, saltrounds);
        const createdUser = await User.create({
            name: user,
            email: email,
            password: hash
        })
        res.json(createdUser);
        }
    catch(err){
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.json({message:'Email already exists'})
        }else{
        console.log(err)
        }
    }
}

exports.checkUser = async (req, res, next) =>{
    try{
       const email = req.body.email;
       const password = req.body.password;
       const response = await User.findAll({where:{email}})//we can also write { email: email } but as both are same so we wrote it like that
       if(response.length > 0){
        const match = await bcrypt.compare(password, response[0].password);  
           if(match){
            res.status(200).json({message:"User Logged In Successfully"});
           }
           else{
            return res.status(401).json({message:"Password is Incorrect"});
           } 
       }else{
           return res.status(404).json({message:"User does not exists"});
       }
    }
    catch(err){
         res.status(500).json({message:err});
    }
}
