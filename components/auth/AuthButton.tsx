'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { JSX } from 'react';

type Props = {
  path: string;
  text: string;
};

export function AuthButton({ path, text }: Props): JSX.Element {
  const router = useRouter();

  return <Button onClick={() => router.push(path)}>{text}</Button>;
}
