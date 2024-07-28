import React, { useState } from "react";

const ExpenseForm = ({ onAddExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0) {
      onAddExpense({ title, amount: parseFloat(amount) });
      setTitle("");
      setAmount("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-md shadow-md mb-6"
    >
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Expense Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter expense title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter amount"
          min="0.01"
          step="0.01"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
