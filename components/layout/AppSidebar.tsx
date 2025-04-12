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
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { NavUser } from '../navUser/NavUser';
import NavHeader from '../navHeader/NavHeader';

const items = [
  {
    title: 'Home',
    url: '/events',
    icon: Home,
  },
  {
    title: 'Create Event',
    url: '#',
    icon: MapPlus,
  },
  {
    title: 'Your Events',
    url: '#',
    icon: CalendarFold,
  },
  {
    title: 'Your Hobbys',
    url: 'hobby',
    icon: UserPen,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar side="right">
      <NavHeader company={{ name: 'Fajna Firma', plan: 'Basic' }} />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="cursor-pointer list-none">
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
        <NavUser user={{ name: 'John Doe', email: 'johndoe@gmail.com' }} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
