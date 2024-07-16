const transporter = require('../util/nodemailer');
const User = require('../model/users');
const ResetPassword = require('../model/resetPassword');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

exports.forgotPassword = async (req, res, next) =>{
    try{
        const email = req.body.email;
        const requestId = uuidv4();

        // const recepientEmail = await User.findOne({where:{email:email}});
        const recepientEmail = await User.findOne({email:email});
         console.log(recepientEmail._id);
    
        if (!recepientEmail) {
            return res
              .status(404)
              .json({ message: "Please provide the registered email!" });
          }
        
        await ResetPassword.create({
            _id: requestId,
            isActive: true,
            userId: recepientEmail._id
          });
          
           await transporter.sendMail({
            from: "picwork35@gmail.com",
            to: email,
            subject: "Expense Tracker Reset lINK",
            html: `<p>Click <a href="http://localhost:3000/password/resetpassword/${requestId}">here</a> to reset your password.</p>`,
          });
        return res.status(202).json({
           message:
           "Link for reset the password is successfully send on your Mail Id!",
        });
    }
    catch(err){
        console.log(err);
        return res.status(409).json({message: "failed to change password"})
    }
}

exports.resetpassword = async (req, res) => {
    try{
        const id = req.params.resetpasswordid;
        //console.log(id);
        const forgotpasswordrequest = await ResetPassword.findOne({_id:id})
        if(forgotpasswordrequest){
            if(forgotpasswordrequest.isActive){
            // forgotpasswordrequest.update({ isActive: false});
            forgotpasswordrequest.isActive = false;
            await forgotpasswordrequest.save();
           return res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
        }else{
            res.send({message: "this link is inactive now"});
        }
    }
 }
    catch(err) {
        console.log(err);
    }
    
}

exports.updatePassword = async(req, res, next) =>{
    try {
        const { newpassword } = req.query;
        const resetpasswordid  = req.params.id;
        const userIdObj = await ResetPassword.findOne({ where : { id: resetpasswordid }, attributes: ["userId"],})
        const userInstance = await User.findOne({
         where: { id: userIdObj.userId },
        });
        console.log(userInstance);
        const hashedPsw = await bcrypt.hash(newpassword, 10);
        
        await userInstance.update({ password: hashedPsw });
        res
        .status(201)
        .json({ message: "Successfully updated the password", success: true });
           
    } catch(error){
        console.log(error);
    }
}