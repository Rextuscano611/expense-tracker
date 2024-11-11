interface Expense {
    category: string;
    amount: number;
    date: string;
}

let budget: number = 0;
let expenses: Expense[] = [];

// DOM Elements
const budgetInput = document.getElementById("budget-input") as HTMLInputElement;
const budgetStatus = document.getElementById("budget-status") as HTMLParagraphElement;
const setBudgetBtn = document.getElementById("set-budget-btn") as HTMLButtonElement;
const budgetProgress = document.getElementById("budget-progress") as HTMLProgressElement;

const categoryInput = document.getElementById("category") as HTMLInputElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const dateInput = document.getElementById("date") as HTMLInputElement;
const expenseForm = document.getElementById("expense-form") as HTMLFormElement;

const expensesList = document.getElementById("expenses-list") as HTMLUListElement;
const totalExpenseElement = document.getElementById("total-expense") as HTMLParagraphElement;

// Event Listeners
setBudgetBtn.addEventListener("click", setBudget);
expenseForm.addEventListener("submit", addExpense);

// Function to set the budget
function setBudget() {
    budget = parseFloat(budgetInput.value);
    budgetStatus.textContent = `Budget set to: $${budget}`;
    updateBudgetStatus();
}

// Function to add an expense
function addExpense(event: Event) {
    event.preventDefault();

    const category = categoryInput.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (category && amount > 0 && date) {
        const newExpense: Expense = { category, amount, date };
        expenses.push(newExpense);

        displayExpenses();
        updateBudgetStatus();
        expenseForm.reset();
    }
}

// Function to display expenses
function displayExpenses() {
    expensesList.innerHTML = "";
    let totalExpense = 0;

    expenses.forEach(expense => {
        const li = document.createElement("li");
        li.textContent = `${expense.category} - $${expense.amount} on ${expense.date}`;
        expensesList.appendChild(li);
        totalExpense += expense.amount;
    });

    totalExpenseElement.textContent = `Total Expense: $${totalExpense}`;
}

// Function to update budget status and progress bar
function updateBudgetStatus() {
    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const budgetUsedPercentage = budget > 0 ? (totalExpense / budget) * 100 : 0;

    // Update the progress bar value
    budgetProgress.value = budgetUsedPercentage;

    // Update the status message
    if (budget > 0) {
        if (budgetUsedPercentage >= 80) {
            budgetStatus.textContent = "Warning: 80% of the budget has been utilized!";
            budgetStatus.style.color = "red";
        } else {
            budgetStatus.textContent = `Budget Remaining: $${budget - totalExpense}`;
            budgetStatus.style.color = "black";
        }
    }
}
