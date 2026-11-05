const [, , flag] = process.argv
const fs = require("fs")
const path = require("path")

let incomes = fs.readFileSync(path.join(__dirname, "income.json"), "utf-8")
incomes = JSON.parse(incomes || "[]")

let expenses = fs.readFileSync(path.join(__dirname, "expenses.json"), "utf-8")
expenses = JSON.parse(expenses || "[]")

const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)
const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0)

if (flag == "--more") {
  console.log("INCOMES:")
  console.table(incomes)
  console.log("EXPENSES:")
  console.table(expenses)
  console.log("Jami income:", totalIncome)
  console.log("Jami expense:", totalExpense)
}

console.log("Balance:", totalIncome - totalExpense)
