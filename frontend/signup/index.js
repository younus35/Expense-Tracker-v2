const form = document.querySelector("form")

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    
    let user_details ={
         user:event.target.username.value,// here username is the name of the input field
         email:event.target.email.value,
         password:event.target.password.value
    }
    axios.post("http://localhost:3000/user/signup",user_details)
    .then(res => {
        if(res.data.message == 'Email already exists'){
            const message = document.querySelector('.hidden');
            message.innerHTML = `<p class="text-center text-danger mt-2 mb-0">email already exist</p>`;
        }
    })
    .catch(err => console.log(err));
})