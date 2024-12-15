import React from 'react';
import { useForm } from 'react-hook-form';

type TransactionFormData = {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
};

export default function TransactionForm({ onSubmit }: { onSubmit: (data: TransactionFormData) => void }) {
  const { register, handleSubmit, reset } = useForm<TransactionFormData>();

  const onFormSubmit = (data: TransactionFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select {...register('type')} className="mt-1 block w-full rounded-md border border-gray-300 p-2">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          {...register('category')}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          step="0.01"
          {...register('amount', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          {...register('description')}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Transaction
      </button>
    </form>
  );
}