'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavBarLinkProps = {
  text: string;
  url: string;
  children: ReactNode;
};

export default function NavBarLink({ text, url, children }: NavBarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={cn(
        'flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground transition-colors',
        {
          'text-foreground': isActive,
          'text-muted-foreground': !isActive,
        }
      )}
      prefetch={true}
    >
      {children}
      {text}
    </Link>
  );
}
