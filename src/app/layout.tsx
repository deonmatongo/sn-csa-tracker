import type { Metadata } from 'next';
import { Space_Mono, DM_Sans } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: '--font-mono',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ServiceNow CSA — 4-Week Study Tracker',
  description: 'Track your ServiceNow Certified System Administrator exam preparation across 4 weeks.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full font-[family-name:var(--font-sans)]">{children}</body>
    </html>
  );
}
