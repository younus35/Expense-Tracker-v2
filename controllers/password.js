const Sib = require('@getbrevo/brevo');

exports.forgotPassword = async (req, res, next) =>{
    try{
        const email = req.body.email;
        
        const transEmailApi = new Sib.TransactionalEmailsApi();
        
        const apiKey = transEmailApi.authentications["apiKey"];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        
        let sendSmtpEmail = new Sib.SendSmtpEmail();

        sendSmtpEmail.subject = "Expense Tracker Reset Password";
        sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email</h1></body></html>";
        sendSmtpEmail.sender = {"email": "picwork35@gmail.com","name": "AFNAN",};
        sendSmtpEmail.to = [{"email":email}];
    
        await transEmailApi.sendTransacEmail(sendSmtpEmail);
        return res.status(200).json({
           message:
           "Link for reset the password is successfully send on your Mail Id!",
        });
    }
    catch(err){
        console.log(err);
        return res.status(409).json({message: "failed to change password"})
    }
}