var budget = 0;
var expenses = [];
// DOM Elements
var budgetInput = document.getElementById("budget-input");
var budgetStatus = document.getElementById("budget-status");
var setBudgetBtn = document.getElementById("set-budget-btn");
var budgetProgress = document.getElementById("budget-progress");
var categoryInput = document.getElementById("category");
var amountInput = document.getElementById("amount");
var dateInput = document.getElementById("date");
var expenseForm = document.getElementById("expense-form");
var expensesList = document.getElementById("expenses-list");
var totalExpenseElement = document.getElementById("total-expense");
// Event Listeners
setBudgetBtn.addEventListener("click", setBudget);
expenseForm.addEventListener("submit", addExpense);
// Function to set the budget
function setBudget() {
    budget = parseFloat(budgetInput.value);
    budgetStatus.textContent = "Budget set to: $".concat(budget);
    updateBudgetStatus();
}
// Function to add an expense
function addExpense(event) {
    event.preventDefault();
    var category = categoryInput.value;
    var amount = parseFloat(amountInput.value);
    var date = dateInput.value;
    if (category && amount > 0 && date) {
        var newExpense = { category: category, amount: amount, date: date };
        expenses.push(newExpense);
        displayExpenses();
        updateBudgetStatus();
        expenseForm.reset();
    }
}
// Function to display expenses
function displayExpenses() {
    expensesList.innerHTML = "";
    var totalExpense = 0;
    expenses.forEach(function (expense) {
        var li = document.createElement("li");
        li.textContent = "".concat(expense.category, " - $").concat(expense.amount, " on ").concat(expense.date);
        expensesList.appendChild(li);
        totalExpense += expense.amount;
    });
    totalExpenseElement.textContent = "Total Expense: $".concat(totalExpense);
}
// Function to update budget status and progress bar
function updateBudgetStatus() {
    var totalExpense = expenses.reduce(function (sum, expense) { return sum + expense.amount; }, 0);
    var budgetUsedPercentage = budget > 0 ? (totalExpense / budget) * 100 : 0;
    // Update the progress bar value
    budgetProgress.value = budgetUsedPercentage;
    // Update the status message
    if (budget > 0) {
        if (budgetUsedPercentage >= 80) {
            budgetStatus.textContent = "Warning: 80% of the budget has been utilized!";
            budgetStatus.style.color = "red";
        }
        else {
            budgetStatus.textContent = "Budget Remaining: $".concat(budget - totalExpense);
            budgetStatus.style.color = "black";
        }
    }
}
