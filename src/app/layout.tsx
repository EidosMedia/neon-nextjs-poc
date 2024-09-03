import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toolbar } from '@mui/material';
import { WebVitals } from './_components/web-vitals';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebVitals />
        <Toolbar />
        {children}
      </body>
    </html>
  );
}
