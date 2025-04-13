import './globals.scss';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { TRPCProvider } from '@/trpc/client';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import NavBar from '@/components/layout/NavBar';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/components/auth/AuthContext';
import SidebarProviderWrapper from '@/components/layout/SidebarProviderWrapper';
import AppSidebar from '@/components/layout/AppSidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Meetdrasil',
  description:
    'MeetDrasil is an app designed to help employees in large companies navigate corporate life—not through another productivity tool, but by fostering real human connections.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-dvh flex-col overflow-hidden antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            <AuthProvider>
              <SidebarProviderWrapper>
                <NavBar />
                <main className="grow overflow-y-auto">{children}</main>
                <Toaster position="top-center" />
                <AppSidebar />
              </SidebarProviderWrapper>
            </AuthProvider>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
