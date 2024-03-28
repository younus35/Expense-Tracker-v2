const form = document.querySelector('form');

form.addEventListener('submit', async (event) =>{
    try{
    event.preventDefault();
    const mail_details = {email: event.target.email.value};
    const response = await axios.post("http://localhost:3000/password/forgotpassword",mail_details);
    // console.log(response);
    }
    catch(err) {
        console.log(err);
    }
})