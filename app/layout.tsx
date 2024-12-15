import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Budget Calculator',
  description: 'Track your income, expenses, and savings goals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}