import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

type Transaction = {
  type: 'income' | 'expense';
  amount: number;
  category: string;
};

type BudgetSummaryProps = {
  transactions: Transaction[];
  formatMoney: (amount: number) => string;
};

export default function BudgetSummary({ transactions, formatMoney }: BudgetSummaryProps) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-xl border border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-900/20 p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/40">
            <ArrowUpCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Income</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {formatMoney(totalIncome)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-red-100 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/40">
            <ArrowDownCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">Total Expenses</p>
            <p className="text-2xl font-bold text-red-700 dark:text-red-300">
              {formatMoney(totalExpenses)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
            <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Balance</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {formatMoney(balance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}