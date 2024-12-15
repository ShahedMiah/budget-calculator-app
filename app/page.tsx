'use client';

import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import BudgetSummary from './components/BudgetSummary';
import SavingsGoal from './components/SavingsGoal';
import ExpenseBreakdown from './components/ExpenseBreakdown';

type Transaction = {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savingsGoal, setSavingsGoal] = useState({
    target: 5000,
    current: 2500
  });

  const handleTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Budget Calculator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
              <TransactionForm onSubmit={handleTransaction} />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
              <BudgetSummary transactions={transactions} />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Expense Categories</h2>
              <ExpenseBreakdown transactions={transactions} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <SavingsGoal
                target={savingsGoal.target}
                current={savingsGoal.current}
              />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              <div className="space-y-2">
                {transactions.slice().reverse().slice(0, 5).map((t, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      t.type === 'income' ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{t.category}</p>
                        <p className="text-sm text-gray-600">{t.description}</p>
                      </div>
                      <p
                        className={`font-semibold ${
                          t.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {t.type === 'income' ? '+' : '-'}${t.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}