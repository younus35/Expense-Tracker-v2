const leaderboard = document.querySelector('.leaderboard tbody');

window.addEventListener('DOMContentLoaded', async ()=>{
    try{
       const token = localStorage.getItem('token');
       const response = await axios.get('http://localhost:3000/premium/show-leaderboard', {headers:{"Authorization":token}})
       const userLeaderBoardArray = response.data;
       console.log(userLeaderBoardArray);
       if(!userLeaderBoardArray.ispremiumuser){
        alert('you are not a premium user');
        window.location.href = "../expense/expense.html"
       }
       // console.log(response.data)
       else{
        userLeaderBoardArray.forEach((user) =>{
            showUserLeaderBoard(user);
        })  
      }
    }
    catch(err){
        console.log(err);
    }
})

function showUserLeaderBoard(user){
    const newRow = document.createElement('tr');
    
    const nameCell = document.createElement('td');
    nameCell.textContent = user.name
 
    const totalCell = document.createElement('td');
    totalCell.textContent = user.totalExpenses

    newRow.appendChild(nameCell);
    newRow.appendChild(totalCell);

    leaderboard.appendChild(newRow);
}