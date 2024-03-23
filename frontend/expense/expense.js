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
