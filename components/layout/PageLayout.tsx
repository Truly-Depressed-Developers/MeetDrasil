import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function PageLayout({ children, className }: PageLayoutProps) {
  return <div className={cn('mx-auto p-6', className)}>{children}</div>;
}

type PageTitleProps = {
  children: ReactNode;
  className?: string;
};

export function PageTitle({ children, className }: PageTitleProps) {
  return <h1 className={cn('mb-6 text-center text-2xl font-bold', className)}>{children}</h1>;
}

type PageSectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export function PageSectionTitle({ children, className }: PageSectionTitleProps) {
  return (
    <>
      <h2 className={cn('mb-2 mt-6 text-lg font-semibold', className)}>{children}</h2>
      <hr className="mb-4 border-muted" />
    </>
  );
}
