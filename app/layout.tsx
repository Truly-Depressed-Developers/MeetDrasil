import './globals.scss';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { TRPCProvider } from '@/trpc/client';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import NavBar from '@/components/layout/NavBar';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/components/auth/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hacknarok',
  description: 'Hacknarok',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-dvh flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            <AuthProvider>
              <main className="grow overflow-y-auto">{children}</main>
              <NavBar />
              <Toaster position="top-center" />
            </AuthProvider>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
