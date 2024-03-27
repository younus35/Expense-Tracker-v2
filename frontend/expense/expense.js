const form = document.querySelector('form');
const details = document.querySelector('.expense_details tbody');

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
    //console.log(response);
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
    if(response.data.ispremiumuser){
        const buyButton = document.getElementById('rzp-button');
        buyButton.textContent = 'Premium User';
        buyButton.disabled = true;
    }
    //console.log(response.data.expenses[0])
    for(var i=0; i<response.data.expenses.length; i++){
         showExpenseOnScreen(response.data.expenses[i]);
    }
   }
   catch(err){
      console.log(err);
   }
})

function showExpenseOnScreen(expense_details){
    // const newli = document.createElement('li');
    const newRow = document.createElement('tr');
    // const newlit = document.createTextNode(expense_details.amount+'-'+expense_details.description+'-'+expense_details.category);
    const amountCell = document.createElement('td');
    amountCell.textContent = expense_details.amount;

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = expense_details.description;

    const categoryCell = document.createElement('td');
    categoryCell.textContent = expense_details.category;
    // newli.appendChild(newlit);
    // const button = document.createElement('button');
    // const buttont = document.createTextNode('delete expense');
    // button.appendChild(buttont);
    const deleteButtonCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Expense';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.onclick = async () =>{
       try{
        const token = localStorage.getItem('token');
         await axios.delete(`http://localhost:3000/expense/delete-expense/${expense_details.id}`,{headers:{"Authorization":token}})
           details.removeChild(newRow);
       }
       catch(err){
        console.log(err);
       }
    }
    deleteButtonCell.appendChild(deleteButton);
    newRow.appendChild(amountCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(categoryCell);
    newRow.appendChild(deleteButtonCell);

    details.appendChild(newRow);
    // newli.appendChild(button);
    // details.appendChild(newli)
}

document.getElementById('rzp-button').onclick = async (e) =>{
    try{
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/purchase/premiumship', {headers:{"Authorization":token}});
    var options = {
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler": async (response) =>{
            const res = await axios.post("http://localhost:3000/purchase/update-transaction",{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{headers:{"Authorization":token}})
            alert('you are a premium user now');
            //console.log(res.data.token);
            localStorage.setItem('token',res.data.token);
            if(response.razorpay_signature !== null){
                const buyButton = document.getElementById('rzp-button');
                buyButton.textContent = 'Premium User';
                buyButton.disabled = true;
            }
        }
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed', (response)=>{
        alert('Something went wrong')
    })
  }
  catch(err) {
    console.log(err);
  }
}

