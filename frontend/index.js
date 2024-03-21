const form = document.querySelector("form")

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    
    let user_details ={
         user:event.target.username.value,
         email:event.target.email.value,
         password:event.target.password.value
    }
    axios.post("http://localhost:3000/user/signup",user_details)
    .then(res => {
        if(res.data.message == 'Email already exists'){
            alert("Email already exists");
        }
    })
    .catch(err => console.log(err));
})