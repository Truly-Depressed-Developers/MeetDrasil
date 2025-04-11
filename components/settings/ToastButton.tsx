'use client';

import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/showToast';
import { redirect } from 'next/navigation';

export default function ToastButton() {
  const showToastNotification = async () => {
    const toastData = {
      title: 'Toast',
      description: 'Example toast',
      button: {
        title: 'Home',
        action: () => {
          // Async to wait for toast to close because redirect cancels it
          setTimeout(() => redirect('/'), 0);
        },
      },
    };

    await showToast(toastData);
  };

  return <Button onClick={showToastNotification}>Show toast</Button>;
}
