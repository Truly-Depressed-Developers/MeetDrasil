'use client';

import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

type SidebarProviderWrapperProps = {
  children: React.ReactNode;
};

const SidebarProviderWrapper = ({ children }: SidebarProviderWrapperProps) => {
  return (
    <SidebarProvider className="flex flex-col" defaultOpen={false}>
      {children}
    </SidebarProvider>
  );
};

export default SidebarProviderWrapper;
