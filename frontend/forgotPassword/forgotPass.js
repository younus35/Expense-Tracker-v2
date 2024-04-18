const form = document.querySelector('form');

form.addEventListener('submit', async (event) =>{
    try{
    event.preventDefault();
    const mail_details = {email: event.target.email.value};
    const response = await axios.post("http://54.91.33.84:3000/password/forgotpassword",mail_details);
       if(response.status === 202){
        const message = document.querySelector('.hidden');
        message.innerHTML = `<p class="text-center text-success mt-2 mb-0">Mail send successfully</p>`;
       }else{
        throw new Error('Something went wrong!!!');
       }
    }
    catch(err) {
        console.log(err);
    }
})