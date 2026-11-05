const [, , method, ...args] = process.argv
const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "income.json")

let incomes = fs.readFileSync(filePath, "utf-8")
incomes = JSON.parse(incomes || "[]")

function save() {
  fs.writeFileSync(filePath, JSON.stringify(incomes, null, 4))
}

if (method == "GET") {
  console.table(incomes)
} else if (method == "POST") {
  const [amount, ...purpose] = args
  if (!amount || isNaN(amount) || !purpose.length) {
    console.log("Ishlatish: node income POST <amount> <purpose>")
    return
  }
  
  const newIncome = {
    id: incomes.length ? incomes.at(-1).id + 1 : 1,
    amount: Number(amount),
    purpose: purpose.join(" "),
    date: new Date().toLocaleString(),
  }

  incomes.push(newIncome)
  save()
  console.log("Income qo'shildi:", newIncome)
} else if (method == "DELETE") {
  const [incomeId] = args
  const index = incomes.findIndex((income) => income.id == incomeId)
  if (index == -1) {
    console.log("Bunday id li income topilmadi:", incomeId)
    return
  }
  const [deleted] = incomes.splice(index, 1)
  save()
  console.log("Income o'chirildi:", deleted)
} else if (method == "PUT") {
  const [incomeId, ...fields] = args
  const income = incomes.find((income) => income.id == incomeId)
  if (!income) {
    console.log("Bunday id li income topilmadi:", incomeId)
    return
  }
  for (const field of fields) {
    const [key, value] = field.split("=")
    if (key == "amount") {
      if (isNaN(value)) {
        console.log("amount son bo'lishi kerak")
        return
      }
      income.amount = Number(value)
    } else if (key == "purpose") {
      income.purpose = value
    }
  }
  save()
  console.log("Income yangilandi:", income)
} else {
  console.log("Method noto'g'ri. GET, POST, DELETE yoki PUT ishlating")
}
