const User = require('../model/users');

exports.postUser = (req, res, next) =>{
    const user = req.body.user;//here user is user in frontend signup index.js line 7
    const email = req.body.email;
    const password = req.body.password;
    User.create({
        name: user,
        email: email,
        password: password
    })
    .then((user) =>{
        res.json(user);
    })
    .catch(err => {
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.json({message:'Email already exists'})
        }else{
        console.log(err)
        }
    });
}

exports.checkUser = async (req, res, next) =>{
    try{
       const email = req.body.email;
       const password = req.body.password;
       const response = await User.findAll({where:{email}})
    //console.log(response);
       if(response.length > 0){
           if(response[0].password === password){
            res.status(200).json({message:"User Logged In Successfully"});
           }else{
            return res.status(409).json({message:"Password is Incorrect"});
           }
       }else{
           return res.status(404).json({message:"User does not exists"});
       }
    }
    catch(err){
         res.status(500).json({message:err});
    }
}