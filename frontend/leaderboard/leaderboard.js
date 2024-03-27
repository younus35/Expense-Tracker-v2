const leaderboard = document.querySelector('.leaderboard tbody');

window.addEventListener('DOMContentLoaded', async ()=>{
    try{
       const token = localStorage.getItem('token');
       const response = await axios.get('http://localhost:3000/premium/show-leaderboard', {headers:{"Authorization":token}})
        const userLeaderBoardArray = response.data;
        userLeaderBoardArray.forEach((user) =>{
            showUserLeaderBoard(user);
        })  
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
    totalCell.textContent = user.total

    newRow.appendChild(nameCell);
    newRow.appendChild(totalCell);

    leaderboard.appendChild(newRow);
}