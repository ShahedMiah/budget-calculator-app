import React from 'react';

type SavingsGoalProps = {
  target: number;
  current: number;
};

export default function SavingsGoal({ target, current }: SavingsGoalProps) {
  const progress = Math.min((current / target) * 100, 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Savings Goal</h3>
      
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Current: ${current.toFixed(2)}</span>
        <span className="text-sm text-gray-600">Target: ${target.toFixed(2)}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-600 mt-2">
        {progress.toFixed(1)}% of goal reached
      </p>
    </div>
  );
}