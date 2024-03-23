const form = document.querySelector('form');

form.addEventListener('submit', async (event) =>{
    try{
       event.preventDefault();
       const login_details = {
         email:event.target.email.value,
         password:event.target.password.value
       }
       const response = await axios.post('http://localhost:3000/user/signin',login_details)
       if(response.status === 200){
          alert(response.data.message)
          window.location.replace("../expense/expense.html")
       }
    }
    catch(err){
        const message = document.querySelector('.hidden');
        message.innerHTML = `<p class="text-center text-danger mt-2 mb-0">${err.message}</p>`;
    }
})