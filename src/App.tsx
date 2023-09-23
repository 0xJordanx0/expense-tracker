import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Button } from "@nextui-org/react";
import { Doughnut } from "react-chartjs-2";
import moment from "moment";
import { useState } from "react";

import AddTransaction from "./components/AddTransaction";

const TransactionType = ["Income", "Expense"];

export default function App() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const chartData = {
    labels: ["Expense", "Saving"],
    datasets: [
      {
        data: [expense, income-expense],
        backgroundColor: ["#e74c3c", "#f39c12"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
        align: "start" as const,
        fullSize: true,
        labels: {
          boxWidth: 100,
          color: "white",
          padding: 15,
        },
      },
    },
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  function addTransaction(tx: Transaction) {
    setTransactions((prev) => [tx, ...prev]);
    if (tx.type === 0) {
      //If is income
      setIncome((prev) => (prev += tx.amount));
    } else {
      setExpense((prev) => (prev += tx.amount));
    }
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <header className="my-16">
          <h3 className="text-2xl font-bold text-center">Expense Tracker</h3>
        </header>
        <main className="flex gap-4 w-full">
          <aside className="rounded-lg bg-[#34495e]">
            <h3 className="text-2xl text-white font-bold my-4 text-center">
              Overview
            </h3>
            <Doughnut data={chartData} options={options} />
          </aside>
          <section className="w-full">
            <div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 bg-income text-white w-1/3 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">Income</h3>
                  <p className="text-sm font-semibold">${income}</p>
                </div>
                <div className="flex flex-col gap-2 bg-expense text-white w-1/3 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">Expense</h3>
                  <p className="text-sm font-semibold">${expense}</p>
                </div>
                <div className="flex flex-col gap-2 bg-saving text-white w-1/3 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">Savings</h3>
                  <p className="text-sm font-semibold">${income-expense}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex flex-col gap-4 w-full">
                {transactions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#ecf0f1] flex justify-between gap-4 items-center w-full p-4 rounded-full"
                  >
                    <div className="flex items-center gap-2">
                      {item.type === 0 ? (
                        <span className="bg-income w-20 text-center text-xs font-bold text-white p-2 rounded-full">
                          {TransactionType[item.type]}
                        </span>
                      ) : (
                        <span className="bg-expense text-xs w-20 text-center font-bold text-white p-2 rounded-full">
                          {TransactionType[item.type]}
                        </span>
                      )}
                      <span className="bg-black w-12 text-center text-xs font-bold text-white p-2 rounded-full">
                        ${item.amount}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs">
                        {moment(Date()).format("DD/MM/YYYY")}
                      </span>
                      <Button
                        size="sm"
                        className="rounded-full bg-[#2c3e50] text-white"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <aside className="rounded-lg bg-[#34495e] p-4">
            <AddTransaction addTransaction={addTransaction} />
          </aside>
        </main>
      </div>
    </>
  );
}
