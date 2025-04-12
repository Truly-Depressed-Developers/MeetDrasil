import React from 'react';

import { X } from 'lucide-react';
import { SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

type NavHeaderProps = {
  company: {
    name: string;
    plan: string;
  };
};

const NavHeader = ({ company }: NavHeaderProps) => {
  const { setOpen } = useSidebar();
  return (
    <SidebarHeader className="flex flex-row justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="rounded-lg">{getInitials(company.name)}</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{company.name}</span>
          <span className="truncate text-xs">{company.plan}</span>
        </div>
      </div>
      <div
        onClick={() => setOpen(false)}
        className="flex cursor-pointer items-center justify-center"
      >
        <X />
      </div>
    </SidebarHeader>
  );
};

export default NavHeader;
