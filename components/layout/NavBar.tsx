import React from 'react';
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
    </nav>
  );
}
