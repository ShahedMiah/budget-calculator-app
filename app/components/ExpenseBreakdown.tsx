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

  const getGradientColor = (index: number, total: number) => {
    const hue = (index / total) * 255;
    return `hsla(${hue}, 70%, 50%, 0.8)`;
  };

  return (
    <div className="space-y-4">
      {categoryPercentages.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No expenses recorded yet
        </p>
      ) : (
        <div className="space-y-4">
          {categoryPercentages.map(({ category, amount, percentage }, index) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-900 dark:text-white">{category}</span>
                <div className="text-right">
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${amount.toFixed(2)}
                  </span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">
                    ({percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: getGradientColor(index, categoryPercentages.length)
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}