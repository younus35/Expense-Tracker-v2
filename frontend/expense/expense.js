const form = document.querySelector('form');
const details = document.querySelector('.expense_details');

form.addEventListener('submit', async (event) =>{
    try{
    const token = localStorage.getItem('token');
    event.preventDefault();
    let expense_details = {
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value
    };
    const response = await axios.post("http://localhost:3000/expense/add-expense",expense_details,{headers:{"Authorization":token}});
    console.log(response);
    showExpenseOnScreen(response.data);
   }
   catch(err){
    console.log(err);
   }
})
window.addEventListener('DOMContentLoaded', async ()=>{
    try{
    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:3000/expense/get-expenses",{headers:{"Authorization":token}})
    for(var i=0; i<response.data.length; i++){
         showExpenseOnScreen(response.data[i]);
    }
   }
   catch(err){
      console.log(err);
   }
})

function showExpenseOnScreen(expense_details){
    const newli = document.createElement('li');
    const newlit = document.createTextNode(expense_details.amount+'-'+expense_details.description+'-'+expense_details.category);
    newli.appendChild(newlit);
    const button = document.createElement('button');
    const buttont = document.createTextNode('delete expense');
    button.appendChild(buttont);
    button.onclick = async () =>{
       try{
        const token = localStorage.getItem('token');
         await axios.delete(`http://localhost:3000/expense/delete-expense/${expense_details.id}`,{headers:{"Authorization":token}})
           details.removeChild(newli);
       }
       catch(err){
        console.log(err);
       }
    }
    newli.appendChild(button);
    details.appendChild(newli)
}

document.getElementById('rzp-button').onclick = async (e) =>{
    const token = localStorage.getItem('token');
    const response = await axios.get('https://localhost:3000/purchase/premiumship', {headers:{"Authorization":token}});
    var options = {
        "key":response.data.key_id,
        "order_id":response.data.order_id,
        "handler": async (response) =>{
            await axios.post("http://localhost:3000/purchase/update-transaction",{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{headers:{"Authorization":token}})
            alert('you are a premium user now');
        }
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed', (response)=>{
        console.log(response)
        alert('Something went wrong')
    })
}