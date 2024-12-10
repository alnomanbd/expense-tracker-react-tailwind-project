import { useState } from "react";

const SubmissionForm = ({ formData, transactionToEdit }) => {
  const [isExpenseOpen, setIsExpenseOpen] = useState(true);
  const [data, setData] = useState({
    id: crypto.randomUUID(),
    type: "Expense",
    category: "Education",
    amount: "",
    date: "",
  });

  const expenseCategories = [
    "Education",
    "Food",
    "Health",
    "Bill",
    "Insurance",
    "Tax",
    "Transport",
    "Telephone",
  ];
  const incomeCategories = ["Salary", "Outsourcing", "Bond", "Dividend"];

  // If there's a transactionToEdit, update form data
  if (transactionToEdit && transactionToEdit.id !== data.id) {
    setData(transactionToEdit); // Directly set the form data from transactionToEdit
    setIsExpenseOpen(transactionToEdit.type === "Expense");
  }

  // Handle form submission (create or update transaction)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    formData(data);
    // Reset form data after submission
    setData({
      id: crypto.randomUUID(),
      type: isExpenseOpen ? "Expense" : "Income",
      category: isExpenseOpen ? "Education" : "Salary", // Default to "Salary" for Income
      amount: "",
      date: "",
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle tab switch (Expense/Income)
  const handleTabSwitch = (tabType) => {
    setIsExpenseOpen(tabType === "Expense");
    setData((prevData) => ({
      ...prevData,
      type: tabType,
      category: tabType === "Expense" ? "Education" : "Salary", // Set default category based on tab
    }));
  };

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form onSubmit={handleFormSubmit}>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div
            onClick={() => handleTabSwitch("Expense")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              isExpenseOpen && "active"
            }`}
          >
            Expense
          </div>
          <div
            onClick={() => handleTabSwitch("Income")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              !isExpenseOpen && "active"
            }`}
          >
            Income
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              value={data.category} // Bind the selected value to the state
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              {isExpenseOpen
                ? expenseCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))
                : incomeCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              value={data.amount}
              onChange={handleInputChange}
              id="amount"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleInputChange}
              id="date"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;
