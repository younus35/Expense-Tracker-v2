const form = document.querySelector('form');

form.addEventListener('submit', async (event) =>{
    try{
       event.preventDefault();
       const login_details = {
         email:event.target.email.value,
         password:event.target.password.value
       }
       const response = await axios.post('http://3.87.83.144:3000/user/signin',login_details)
       if(response.status === 200){
          alert(response.data.message)
          localStorage.setItem('token', response.data.token);
          window.location.href = "../expense/expense.html";
       }else if(response.status === 401){
        alert(response.data.message);
       }
    }
    catch(err){
        const message = document.querySelector('.hidden');
        message.innerHTML = `<p class="text-center text-danger mt-2 mb-0">${err.message}</p>`;
    }
})