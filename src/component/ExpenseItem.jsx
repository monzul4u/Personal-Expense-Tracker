import React, { useState } from "react";

const ExpenseItem = ({ expense, onEditExpense, onDeleteExpense }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(expense.title);
  const [editedAmount, setEditedAmount] = useState(expense.amount);

  const handleEdit = () => {
    if (isEditing) {
      onEditExpense(expense.id, { title: editedTitle, amount: editedAmount });
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="bg-white p-4 shadow-md rounded-md flex justify-between items-center">
      <div className="flex flex-col">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(parseFloat(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            />
          </>
        ) : (
          <>
            <span className="text-lg font-medium">{expense.title}</span>
            <span className="text-gray-500">£{expense.amount.toFixed(2)}</span>
          </>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          className="py-1 px-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
          onClick={handleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className="py-1 px-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => onDeleteExpense(expense.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
