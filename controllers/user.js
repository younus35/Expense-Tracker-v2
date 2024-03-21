const User = require('../model/users');

exports.postUser = (req, res, next) =>{
    const user = req.body.user;//here user is user in index.js line 7
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