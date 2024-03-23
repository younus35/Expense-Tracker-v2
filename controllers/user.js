const User = require('../model/users');
const bcrypt = require('bcrypt');

exports.postUser = (req, res, next) =>{
    const user = req.body.user;//here user is user in frontend signup index.js line 7
    const email = req.body.email;
    const password = req.body.password;
    const saltrounds = 10;
    //create a promise for bcrypt
    const hashPasswordPromise = new Promise((resolve, reject) => {
        bcrypt.hash(password, saltrounds, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
    hashPasswordPromise.then(hash =>{
        User.create({
            name: user,
            email: email,
            password: hash
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
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.checkUser = async (req, res, next) =>{
    try{
       const email = req.body.email;
       const password = req.body.password;
       const response = await User.findAll({where:{email}})//we can also write { email: email } but as both are same so we wrote it like that
    //console.log(response);
       if(response.length > 0){
        const comparePasswords = new Promise((resolve, reject) => {
            bcrypt.compare(password, response[0].password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        const match = await comparePasswords;  
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
