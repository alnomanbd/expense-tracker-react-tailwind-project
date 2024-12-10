import { useState } from "react";
import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";
import SubmissionForm from "./SubmissionForm";
import TotalBalanceStat from "./TotalBalanceStat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseTrackerBoard = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  // Handle form submission (creating or updating a transaction)
  const handleFormData = (data) => {
    if (transactionToEdit) {
      // Update the existing transaction
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === transactionToEdit.id
            ? { ...transaction, ...data }
            : transaction
        )
      );
      setTransactionToEdit(null); // Reset the transactionToEdit state after updating
      toast.success("Transaction edited successfully!");
    } else {
      // Add a new transaction
      setTransactions((prevTransactions) => [...prevTransactions, data]);
      toast.success("Transaction added successfully!");
    }
  };

  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "Income"
  );
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  const totalIncome = incomeTransactions.reduce(
    (acc, transaction) => acc + parseInt(transaction.amount || 0),
    0
  );
  const totalExpense = expenseTransactions.reduce(
    (acc, transaction) => acc + parseInt(transaction.amount || 0),
    0
  );

  const totalBalance = totalIncome - totalExpense;

  // Set the transaction to edit when the "edit" button is clicked
  const handleEditTransaction = (transaction) => {
    const confirmEdit = window.confirm(
      "Are you sure you want to edit this transaction?"
    );
    if (confirmEdit) {
      setTransactionToEdit(transaction);
    }
  };

  const handleDeleteTransaction = (transactionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (confirmDelete) {
      setTransactions((prevTransactions) =>
        prevTransactions.filter((t) => t.id !== transactionId)
      );
      toast.success("Transaction deleted successfully!");
    }
  };

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SubmissionForm
          formData={handleFormData}
          transactionToEdit={transactionToEdit}
        />

        <div className="lg:col-span-2">
          <TotalBalanceStat
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <IncomeList
              incomes={incomeTransactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
            <ExpenseList
              expenses={expenseTransactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </div>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
};

export default ExpenseTrackerBoard;
