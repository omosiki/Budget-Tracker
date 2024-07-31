 let expense = []
function AccessTheArray(){
    console.log("Updating expenses table:", expense);
    const displayUserdata = document.getElementById("expensesTable")
    displayUserdata.innerHTML = ""
    if(expense === 0){
        const empty = document.createElement("tr")
        empty.innerHTML = `<td>No data </td>`
        displayUserdata.appendChild(empty)
    }else{
        expense.forEach((data, index ) =>{
            const createRow = document.createElement("tr")
            createRow.innerHTML = `
            <td>${data.expenseNames}</td>
            <td>${data.amounts.toFixed(2)}</td>
    
            <td>${data.categorys}</td>
            <td>${data.dates}</td>
            <td><button class="edit-button" data-index="${index}" ">Edit</button></td>
          <td><button class="delete-button" data-index="${index}">Delete</button></td>
            `
            displayUserdata.appendChild(createRow)
            updateSummaryStatistics()
        })
        function updateSummaryStatistics() {
            console.log("Updating summary statistics:", expense);
            const totalExpenses = expense.reduce(
              (total, data) => total + data.amounts,
              0
            );
            const averageExpense = expense.length
              ? totalExpenses / expense.length
              : 0;
            const maximumExpense = expense.length
              ? Math.max(...expense.map((data) => data.amounts))
              : 0;
          
            document.getElementById("totalExpense").innerText = `$${totalExpenses.toFixed(2)}`;
            document.getElementById("averageExpense").innerText = `$${averageExpense.toFixed(2)}`;
            document.getElementById("maximumExpense").innerText = `$${maximumExpense.toFixed(2)}`;
          }
       }
    
        document.querySelectorAll(".edit-button").forEach((editbutton)=>{
            editbutton.addEventListener("click", function (){
                const index = this.getAttribute("data-index")
                console.log("logged", index)
                editdata(index)
               
            })
            })
            document.querySelectorAll(".delete-button").forEach((deletebutton)=>{
                deletebutton.addEventListener("click", function(){
                    const index = this.getAttribute("data-index")
                    console.log("logged", index)
                    deleteExpense(index)
                })
            })

}       
 function editdata(index){
    const data = expense[index]
    console.log(data)
    const create = document.createElement("tr")
    create.innerHTML = `
        <td><input type="text" id="editExpenseName"  value="${data.expenseNames}"</td>
        <td><input type="amount" id="editAmount" value="${data.amounts}"</td>
        <td><input type="text" id="editCategory" value="${data.categorys}"</td>
        <td><input type="date" id="editDate" value="${data.dates}"</td>
      
        <td><button class="save-button" data-index="${index}" style=" border-radius:9px;">Save </button></td>
        <td><button class="cancel-button" data-index="${index}" style=" border-radius:9px;">cancel </button></td>
    `;
      // replace the existing row with data
      const displayUserdata = document.getElementById("expensesTable")
      displayUserdata.replaceChild(create,displayUserdata.childNodes[index] )
      //add event listener to save and cancel button
    
      document
         .querySelector(`.save-button[data-index="${index}"]`)
         .addEventListener("click", function (){
          saveExpense(index)
      })
      document
         .querySelector(`.cancel-button[data-index="${index}"]`)
         .addEventListener("click", function (){
          AccessTheArray()
          updateSummaryStatistics()
      })      
}

      
function saveExpense(index){
    //update with edited value
    expense[index].expenseNames = document.getElementById("editExpenseName").value
   expense[index].amounts = parseFloat(document.getElementById("editAmount").value);
   expense[index].categorys = document.getElementById("editCategory").value
   expense[index].dates = document.getElementById("editDate").value
//    expense[index].dates = document.getElementById("editdate").value
   console.log(expense[index])
   AccessTheArray()
   updateSummaryStatistics()
   
}
function deleteExpense(index){
    expense.splice(index,1)
    AccessTheArray()
    updateSummaryStatistics()
}
let expenseForm = document.getElementById("expenseForm")
const button = document.getElementById("submit")
button.addEventListener("click", function(element){
    element.preventDefault()
    const expenseNames = document.getElementById("expenseName").value;
    const amounts = parseFloat(document.getElementById("amount").value);
    const categorys = document.getElementById("category").value;
    const dates = document.getElementById("date").value;
    console.log(expenseNames, amounts, categorys, dates)
    
    // validate form input
    if(!expenseNames || isNaN(amounts)  || !categorys  || !dates){
        alert("Please fill in all fields with valid data.")
        return;
    }
    const user = [expenseNames, amounts, categorys, dates]
    // store into an array
    expense.push({expenseNames, amounts, categorys, dates})
  AccessTheArray()
 savetolocalStorage(user)
expenseForm.reset()
})



  
function savetolocalStorage(user){
    const users = JSON.parse(localStorage.getItem("users")) ||[]
    if(!Array.isArray(users)){
        users = []
    }
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
}

