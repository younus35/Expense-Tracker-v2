const form = document.querySelector("form")

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    
    let user_details ={
         name:event.target.amount.value,
         email:event.target.description.value,
         password:event.target.category.value
    }
    console.log(user_details);
})