const form = document.querySelector('form');
const details = document.querySelector('.expense_details');

form.addEventListener('submit', async (event) =>{
    try{
    event.preventDefault();
    let expense_details = {
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value
    };
    const response = await axios.post("http://localhost:3000/expense/add-expense",expense_details);
    console.log(response);
    showExpenseOnScreen(response.data);
   }
   catch(err){
    console.log(err);
   }
})
window.addEventListener('DOMContentLoaded', async ()=>{
    try{
    const response = await axios.get("http://localhost:3000/expense/get-expenses")
    for(var i=0; i<response.data.length; i++){
         showExpenseOnScreen(response.data[0]);
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
         await axios.delete(`http://localhost:3000/expense/delete-expense/${expense_details.id}`)
           details.removeChild(newli);
       }
       catch(err){
        console.log(err);
       }
    }
    newli.appendChild(button);
    details.appendChild(newli)
}
