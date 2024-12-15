'use client';

import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import BudgetSummary from './components/BudgetSummary';
import SavingsGoal from './components/SavingsGoal';
import ExpenseBreakdown from './components/ExpenseBreakdown';
import Settings from './components/Settings';
import { useCurrency } from './hooks/useCurrency';

type Transaction = {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: Date;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savingsGoal, setSavingsGoal] = useState({
    target: 5000,
    current: 2500
  });
  const { currency, setCurrency, formatMoney } = useCurrency();

  const handleTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, { ...transaction, date: new Date() }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Budget Calculator
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Track your income, expenses, and savings goals
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Cards */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <BudgetSummary transactions={transactions} formatMoney={formatMoney} />
            </div>

            {/* Transaction Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add Transaction</h2>
              <TransactionForm onSubmit={handleTransaction} currencySymbol={formatMoney(0).charAt(0)} />
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Expense Categories</h2>
              <ExpenseBreakdown transactions={transactions} formatMoney={formatMoney} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Savings Goal */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <SavingsGoal
                target={savingsGoal.target}
                current={savingsGoal.current}
                formatMoney={formatMoney}
              />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Transactions</h2>
              <div className="space-y-3">
                {transactions.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No transactions yet
                  </p>
                ) : (
                  transactions.slice().reverse().slice(0, 5).map((t, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${t.type === 'income' 
                        ? 'bg-green-50 dark:bg-green-900/20' 
                        : 'bg-red-50 dark:bg-red-900/20'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{t.category}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{t.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {new Date(t.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p
                          className={`font-semibold ${t.type === 'income' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'}`}
                        >
                          {t.type === 'income' ? '+' : '-'}{formatMoney(t.amount)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <Settings currency={currency} setCurrency={setCurrency} />
    </div>
  );
}