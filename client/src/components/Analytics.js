import { Progress } from "antd";
import React from "react";
import "../resources/Analytics.css";

function Analytics({ transactions }) {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalexpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalexpenseTransactionsPercentage =
    (totalexpenseTransactions.length / totalTransactions) * 100;

  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalexpenseTurnover = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  console.log(totalexpenseTurnover);
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalexpenseTurnoverPercentage =
    (totalexpenseTurnover / totalTurnover) * 100;

  const categories = [
    "Freelance",
    "Other",
    "Meals",
    "Travel",
    "Education",
    "Technology",
    "Office",
    "Postage",
    "Marketing",
    "Tax",
    "Fees"
  ];

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Entries : {totalTransactions}</h4>
            <hr />
            <h5>Income : {totalIncomeTransactions.length}</h5>
            <h5>Expense : {totalexpenseTransactions.length}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor="#5DD64F"
                type="circle"
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#E5572F"
                type="circle"
                percent={totalexpenseTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>In/Out Snapshot : </h4>
            <hr />
            <h5 className="income-snap-header">Total Income : $ {totalIncomeTurnover.toFixed(2)}</h5>
            <h5>Total Expenses : $ {totalexpenseTurnover.toFixed(2)}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor="#5DD64F"
                type="circle"
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#E5572F"
                type="circle"
                percent={totalexpenseTurnoverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
       <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Income by Category</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type == "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && <div className="category-card">
                  <h5>{category}</h5>
                  <Progress strokeColor='#0B5AD9' percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Expenses by Category</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type == "expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
               amount > 0 && <div className="category-card">
                  <h5>{category}</h5>
                  <Progress strokeColor='#0B5AD9' percent={((amount / totalexpenseTurnover) * 100).toFixed(0)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
