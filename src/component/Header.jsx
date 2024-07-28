import React, { useState } from "react";

const Header = ({ budget, balance, onUpdateBudget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleBudgetChange = (e) => {
    setNewBudget(parseFloat(e.target.value));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Update budget in parent component
      onUpdateBudget(newBudget);
    }
    setIsEditing(!isEditing);
  };

  return (
    <header className="bg-blue-500 text-white p-4 shadow-md flex justify-between items-center rounded-md">
      <div>
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <div className="mt-2">
          {isEditing ? (
            <input
              type="number"
              value={newBudget}
              onChange={handleBudgetChange}
              className="w-full px-2 py-1 text-black rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          ) : (
            <span className="text-lg">
              Budget: <strong>${budget.toFixed(2)}</strong>
            </span>
          )}
        </div>
        <div className="mt-2">
          <span className="text-lg">
            Net Balance: <strong>${balance.toFixed(2)}</strong>
          </span>
        </div>
      </div>
      <button
        onClick={handleEditToggle}
        className="py-1 px-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
      >
        {isEditing ? "Save" : "Edit Budget"}
      </button>
    </header>
  );
};

export default Header;
