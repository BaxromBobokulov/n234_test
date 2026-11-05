const [, , method, ...args] = process.argv
const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "expenses.json")

let expenses = fs.readFileSync(filePath, "utf-8")
expenses = JSON.parse(expenses || "[]")

function save() {
  fs.writeFileSync(filePath, JSON.stringify(expenses, null, 4))
}

if (method == "GET") {
  console.table(expenses)
} else if (method == "POST") {
  const [amount, ...purpose] = args
  if (!amount || isNaN(amount) || !purpose.length) {
    console.log("Ishlatish: node expenses POST <amount> <purpose>")
    return
  }
  const newExpense = {
    id: expenses.length ? expenses.at(-1).id + 1 : 1,
    amount: Number(amount),
    purpose: purpose.join(" "),
    date: new Date().toLocaleString(),
  }
  expenses.push(newExpense)
  save()
  console.log("Expense qo'shildi:", newExpense)
} else if (method == "DELETE") {
  const [expenseId] = args
  const index = expenses.findIndex((expense) => expense.id == expenseId)
  if (index == -1) {
    console.log("Bunday id li expense topilmadi:", expenseId)
    return
  }
  const [deleted] = expenses.splice(index, 1)
  save()
  console.log("Expense o'chirildi:", deleted)
} else if (method == "PUT") {
  const [expenseId, ...fields] = args
  const expense = expenses.find((expense) => expense.id == expenseId)
  if (!expense) {
    console.log("Bunday id li expense topilmadi:", expenseId)
    return
  }
  for (const field of fields) {
    const [key, value] = field.split("=")
    if (key == "amount") {
      if (isNaN(value)) {
        console.log("amount son bo'lishi kerak")
        return
      }
      expense.amount = Number(value)
    } else if (key == "purpose") {
      expense.purpose = value
    }
  }
  save()
  console.log("Expense yangilandi:", expense)
} else {
  console.log("Method noto'g'ri. GET, POST, DELETE yoki PUT ishlating")
}
