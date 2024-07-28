import React, { useEffect, useState } from "react";
import ExpenseForm from "./component/ExpenseForm";
import ExpenseList from "./component/ExpenseList";
import Header from "./component/Header";

const App = () => {
  // Retrieve initial data from localStorage or set default values
  const [budget, setBudget] = useState(() => {
    return parseFloat(localStorage.getItem("budget")) || 1000;
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? parseFloat(savedBalance) : budget;
  });

  useEffect(() => {
    // Update balance whenever budget or expenses change
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const newBalance = budget - totalExpenses;
    setBalance(newBalance);

    // Persist data to localStorage
    localStorage.setItem("budget", budget.toString());
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("balance", newBalance.toString());
  }, [budget, expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: expenses.length + 1,
    };
    setExpenses([...expenses, newExpense]);
  };

  const editExpense = (id, updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    );
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const updateBudget = (newBudget) => {
    setBudget(newBudget);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <Header budget={budget} balance={balance} onUpdateBudget={updateBudget} />
      <div className="max-w-lg w-full mt-6">
        <ExpenseForm onAddExpense={addExpense} />
        <ExpenseList
          expenses={expenses}
          onEditExpense={editExpense}
          onDeleteExpense={deleteExpense}
        />
      </div>
    </div>
  );
};

export default App;
