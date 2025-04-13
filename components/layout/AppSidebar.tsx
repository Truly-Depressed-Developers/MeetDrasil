'use client';

import React from 'react';
import Link from 'next/link';
import { Home, MapPlus, CalendarFold, UserPen } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavUser } from '../navUser/NavUser';
import NavHeader from '../navHeader/NavHeader';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Create Event',
    url: '/addEvent',
    icon: MapPlus,
  },
  {
    title: 'Your Events',
    url: '#',
    icon: CalendarFold,
  },
  {
    title: 'Your Hobbies',
    url: 'hobby',
    icon: UserPen,
  },
];

const AppSidebar = () => {
  const { setOpen } = useSidebar();

  return (
    <Sidebar side="right">
      <NavHeader />
      <SidebarContent>
        <SidebarGroup>
          {items.map((item) => (
            <SidebarMenuItem
              onClick={() => setOpen(false)}
              key={item.title}
              className="cursor-pointer list-none"
            >
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
