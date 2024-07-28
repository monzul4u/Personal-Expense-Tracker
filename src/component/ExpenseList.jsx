import React, { useState } from "react";

const ExpenseList = ({ expenses, onEditExpense, onDeleteExpense }) => {
  // Track the currently editing expense
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const handleEditClick = (expense) => {
    setEditingExpenseId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount.toFixed(2)); // Pre-fill input with current values
  };

  const handleEditSave = (expenseId) => {
    if (
      !editTitle.trim() ||
      isNaN(parseFloat(editAmount)) ||
      parseFloat(editAmount) <= 0
    ) {
      alert("Please enter a valid title and amount.");
      return;
    }

    onEditExpense(expenseId, {
      title: editTitle,
      amount: parseFloat(editAmount),
    });
    setEditingExpenseId(null);
    setEditTitle("");
    setEditAmount("");
  };

  const handleCancelEdit = () => {
    setEditingExpenseId(null);
    setEditTitle("");
    setEditAmount("");
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-600">No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center mb-2"
            >
              {editingExpenseId === expense.id ? (
                // Edit mode
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mr-2"
                    placeholder="Expense Title"
                  />
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mr-2"
                    placeholder="Amount"
                    min="0.01"
                    step="0.01"
                  />
                  <button
                    onClick={() => handleEditSave(expense.id)}
                    className="text-green-500 hover:text-green-700 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-red-500 hover:text-red-700"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                // Normal display mode
                <>
                  <span className="font-medium">{expense.title}</span>
                  <span className="font-medium">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <div>
                    <button
                      onClick={() => handleEditClick(expense)}
                      className="mr-2 text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
