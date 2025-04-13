import React from 'react';

import { X } from 'lucide-react';
import { SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { trpc } from '@/trpc/client';

const NavHeader = () => {
  const { setOpen } = useSidebar();
  const { data: user, isLoading } = trpc.user.getCurrent.useQuery();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarHeader className="flex flex-row justify-between p-4">
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarFallback className="rounded-lg">{getInitials(user.companyName)}</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user.companyName}</span>
          <span className="truncate text-xs">{user.companyPlan}</span>
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
