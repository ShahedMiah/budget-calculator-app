import React from 'react';

type Transaction = {
  type: 'income' | 'expense';
  amount: number;
  category: string;
};

type ExpenseBreakdownProps = {
  transactions: Transaction[];
};

export default function ExpenseBreakdown({ transactions }: ExpenseBreakdownProps) {
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  // Calculate percentages
  const categoryPercentages = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / totalExpenses) * 100
  }));

  // Sort by amount (highest to lowest)
  categoryPercentages.sort((a, b) => b.amount - a.amount);

  return (
    <div className="space-y-4">
      {categoryPercentages.map(({ category, amount, percentage }) => (
        <div key={category}>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{category}</span>
            <span>${amount.toFixed(2)} ({percentage.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      ))}

      {categoryPercentages.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No expenses recorded yet
        </p>
      )}
    </div>
  );
}