const form = document.querySelector('form');

form.addEventListener('submit', async (event) =>{
    try{
     event.preventDefault();
     const newPassword = document.getElementById("password").value;
     const res = await axios.post("http://localhost:3000/password/updatepassword", {password: newPassword});
     alert(res.data.message);
     window.location.href = "../login/signin.html";
    }
    catch(err){
        console.log(err);
    }
})