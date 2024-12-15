import { useState, useEffect } from 'react';

export const CURRENCY_MAP = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  INR: '₹',
  CNY: '¥'
} as const;

export type CurrencyCode = keyof typeof CURRENCY_MAP;

export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  useEffect(() => {
    // Load saved currency from localStorage on mount
    const savedCurrency = localStorage.getItem('currency') as CurrencyCode;
    if (savedCurrency && savedCurrency in CURRENCY_MAP) {
      setCurrency(savedCurrency);
    }
  }, []);

  const updateCurrency = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  const formatMoney = (amount: number) => {
    return `${CURRENCY_MAP[currency]}${amount.toFixed(2)}`;
  };

  return {
    currency,
    setCurrency: updateCurrency,
    formatMoney,
    currencySymbol: CURRENCY_MAP[currency]
  };
}