import { ReactNode } from 'react';
import { toast } from 'sonner';

type ToastNotificationData = {
  title: string;
  description?: string;
  button?: {
    title: string;
    action: () => void;
  };
  vibrate?: number;
  icon?: ReactNode;
};

const showToast = async (data: ToastNotificationData) => {
  toast(data.title, {
    description: data.description,
    action: data.button
      ? {
          label: data.button!.title,
          onClick: () => {
            data.button!.action();
          },
        }
      : null,
    icon: data.icon,
  });

  if (
    data.vibrate !== undefined &&
    'vibrate' in navigator &&
    typeof navigator.vibrate === 'function'
  ) {
    navigator.vibrate(data.vibrate);
  }
};

export { showToast };
