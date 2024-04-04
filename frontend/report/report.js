const dateInput = document.getElementById("date");
const dateShowBtn = document.getElementById("dateShowBtn");
const tbodyDaily = document.getElementById("tbodyDailyId");
const tfootDaily = document.getElementById("tfootDailyId");

const monthInput = document.getElementById("month");
const monthShowBtn = document.getElementById("monthShowBtn");
const tbodyMonthly = document.getElementById("tbodyMonthlyId");
const tfootMonthly = document.getElementById("tfootMonthlyId");

const downloadBtn = document.getElementById("download");

async function getDailyReport(e) {
    try {
      e.preventDefault();
      //const token = localStorage.getItem("token");
      const date = new Date(dateInput.value);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;
       
  
      let totalAmount = 0;
      const res = await axios.post(
        "http://localhost:3000/reports/dailyReports",
        {
          date: formattedDate,
        },
        { headers: { Authorization: token } }
      );
  
      tbodyDaily.innerHTML = "";
      tfootDaily.innerHTML = "";
  
      res.data.forEach((expense) => {
        totalAmount += expense.amount;
  
        const tr = document.createElement("tr");
        tr.setAttribute("class", "trStyle");
        tbodyDaily.appendChild(tr);
  
        const th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.appendChild(document.createTextNode(expense.date));
  
        const td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(expense.category));
  
        const td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(expense.description));
  
        const td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(expense.amount));
  
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
      });
  
      const tr = document.createElement("tr");
      tr.setAttribute("class", "trStyle");
      tfootDaily.appendChild(tr);
  
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
  
      td3.setAttribute("id", "dailyTotal");
      td4.setAttribute("id", "dailyTotalAmount");
      td3.appendChild(document.createTextNode("Total"));
      td4.appendChild(document.createTextNode(totalAmount));
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getMonthlyReport(e) {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const month = new Date(monthInput.value);
      const formattedMonth = `${(month.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      let totalAmount = 0;
      const res = await axios.post(
        "http://localhost:3000/reports/monthlyReports",
        {
          month: formattedMonth,
        },
        { headers: { Authorization: token } }
      );
  
      tbodyMonthly.innerHTML = "";
      tfootMonthly.innerHTML = "";
  
      res.data.forEach((expense) => {
        totalAmount += expense.amount;
  
        const tr = document.createElement("tr");
        tr.setAttribute("class", "trStyle");
        tbodyMonthly.appendChild(tr);
  
        const th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.appendChild(document.createTextNode(expense.date));
  
        const td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(expense.category));
  
        const td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(expense.description));
  
        const td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(expense.amount));
  
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
      });
  
      const tr = document.createElement("tr");
      tr.setAttribute("class", "trStyle");
      tfootMonthly.appendChild(tr);
  
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
  
      td3.setAttribute("id", "monthlyTotal");
      td4.setAttribute("id", "monthlyTotalAmount");
      td3.appendChild(document.createTextNode("Total"));
      td4.appendChild(document.createTextNode(totalAmount));
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
    } catch (error) {
      console.log(error);
    }
  }
  
dateShowBtn.addEventListener("click", async() =>{
      const token = localStorage.getItem("token");
      const response1 = await axios.get("http://localhost:3000/expense/get-expenses",{headers:{"Authorization":token}})
       if(response1.data.ispremiumuser){
      getDailyReport()
       }
       else{
        alert("Buy Premium");
       }
});
monthShowBtn.addEventListener("click", async() =>{
  const token = localStorage.getItem("token");
  const response1 = await axios.get("http://localhost:3000/expense/get-expenses",{headers:{"Authorization":token}})
   if(response1.data.ispremiumuser){
     getMonthlyReport();
   }
   else{
    alert("Buy Premium");
   }
});
  
downloadBtn.addEventListener("click", async () =>{
  try{
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/reports/download", {headers:{"Authorization":token}})
     if(response.status === 200){
         var a = document.createElement('a');
         a.href = response.data.fileUrl.Location;
         a.download = 'myexpense.csv';
         a.click();
     }else{
      console.log('something went wrong')
     }
  }
  catch(err) {
    console.log(err);
  }
 })