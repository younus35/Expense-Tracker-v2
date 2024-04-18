const leaderboard = document.querySelector('.leaderboard tbody');
const logoutBtn = document.getElementById("logout");

window.addEventListener('DOMContentLoaded', async ()=>{
    try{
       const token = localStorage.getItem('token');
       const response1 = await axios.get("http://54.83.107.191:3000/expense/get-expenses",{headers:{"Authorization":token}})
       if(response1.data.ispremiumuser){
       const response = await axios.get('http://54.83.107.191:3000/premium/show-leaderboard', {headers:{"Authorization":token}})
       const userLeaderBoardArray = response.data;
       //console.log(userLeaderBoardArray);
        userLeaderBoardArray.forEach((user) =>{
            //should add the code here to show only for premium users
            showUserLeaderBoard(user);
        })  
        }else {
           alert("Buy premium to view");
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

async function logout() {
    try {
      localStorage.clear();
      window.location.href = "../login/signin.html";
    } catch (error) {
      console.log(error);
    }
  }

logoutBtn.addEventListener("click", logout);