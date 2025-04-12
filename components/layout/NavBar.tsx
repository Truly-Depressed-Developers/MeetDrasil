import React from 'react';
import { AwardIcon, ClipboardListIcon, Home, QrCodeIcon, SettingsIcon } from 'lucide-react';
import NavBarLink from '@/components/layout/NavBarLink';
import Image from 'next/image';
import Link from 'next/link';
import SidebarTriggerWrapper from '@/components/layout/SidebarTriggerWrapper';

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between border-b-2 p-4">
      <Link href="/" className="flex items-center justify-center">
        <Image src={'/logo.png'} alt="Logo" width={48} height={48} className="rounded-lg" />
      </Link>
      <SidebarTriggerWrapper />

      {/* <NavBarLink text="A" url="/a">
        <ClipboardListIcon className="size-6" />
      </NavBarLink>
      <NavBarLink text="B" url="/b">
        <QrCodeIcon className="size-6" />
      </NavBarLink>
      <NavBarLink text="C" url="/c">
        <AwardIcon className="size-6" />
      </NavBarLink>
      <NavBarLink text="Settings" url="/settings">
        <SettingsIcon className="size-6" />
      </NavBarLink> */}
    </nav>
  );
}
