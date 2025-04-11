'use client';

import { JSX, useState } from 'react';
import { Provider } from '@supabase/supabase-js';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { createClient } from '@/supabase/client';

type Props = {
  onError?: (error: string) => void;
};

export default function SocialLoginButtons({ onError }: Props): JSX.Element {
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSocialLogin = async (provider: Provider) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setIsLoading(false);
      onError?.(error.message);
    }
  };

  return (
    <div className="mt-4 space-y-3 border-t pt-4">
      <p className="text-center text-sm text-muted-foreground"> or continue with</p>
      <Button
        disabled
        variant="outline"
        onClick={() => handleSocialLogin('google')}
        className={cn(
          `flex w-full items-center justify-center rounded border p-2`,
          isLoading && 'cursor-wait opacity-50'
        )}
      >
        <FaGoogle className="mr-2" />
        <span>{isLoading ? 'Redirecting...' : 'Sign in with Google'}</span>
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        You will be redirected to{' '}
        <span className="text-foreground">{process.env.NEXT_PUBLIC_SUPABASE_URL}</span>
      </p>
    </div>
  );
}
