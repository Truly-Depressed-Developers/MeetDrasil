import React from 'react';
import { AwardIcon, ClipboardListIcon, Home, QrCodeIcon, SettingsIcon } from 'lucide-react';
import NavBarLink from '@/components/layout/NavBarLink';

export default function NavBar() {
  return (
    <nav className="grid h-16 min-h-16 grid-cols-5 items-center border-t-2">
      <NavBarLink text="Home" url="/">
        <Home className="size-6" />
      </NavBarLink>
      <NavBarLink text="A" url="/a">
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
      </NavBarLink>
    </nav>
  );
}
