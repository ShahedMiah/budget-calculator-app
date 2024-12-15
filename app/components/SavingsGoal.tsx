import React from 'react';
import { Target } from 'lucide-react';

type SavingsGoalProps = {
  target: number;
  current: number;
};

export default function SavingsGoal({ target, current }: SavingsGoalProps) {
  const progress = Math.min((current / target) * 100, 100);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/40">
          <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Savings Goal</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Current: 
            <span className="text-gray-900 dark:text-white font-medium">
              ${current.toFixed(2)}
            </span>
          </span>
          <span className="text-gray-600 dark:text-gray-400">Target: 
            <span className="text-gray-900 dark:text-white font-medium">
              ${target.toFixed(2)}
            </span>
          </span>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200 dark:text-purple-200 dark:bg-purple-900">
                {progress.toFixed(1)}% Complete
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-purple-100 dark:bg-purple-900/40">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 dark:bg-purple-400 transition-all duration-500"
            />
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          ${(target - current).toFixed(2)} left to reach your goal
        </p>
      </div>
    </div>
  );
}