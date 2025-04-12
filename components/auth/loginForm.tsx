'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/lib/validation';
import { Label } from '../ui/label';
import type * as z from 'zod';
import { useState } from 'react';
import { ServerMessage } from '@/types/Auth';
import { cn } from '@/lib/utils';
import SocialLoginButtons from './socialLoginButtons';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';

type LoginFormProps = {
  className?: string;
};

export default function LoginForm({ className }: LoginFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [serverMessage, setServerMessage] = useState<ServerMessage | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    setServerMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (error) {
      setServerMessage({ type: 'error', message: error.message });
      return;
    }

    setServerMessage({ type: 'success', message: 'Logged in successfully, redirecting...' });

    router.push('/');
    router.refresh();
  };

  return (
    <div className={className}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Enter login and password for you account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {serverMessage && (
              <div
                className={cn(
                  `mb-4 rounded border px-4 py-2`,
                  serverMessage.type == 'success'
                    ? `bg-successAlert text-successAlert-foreground`
                    : `bg-errorAlert text-errorAlert-foreground`
                )}
                role="alert"
              >
                <span className="block text-sm font-semibold sm:inline">
                  {serverMessage.message}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register('email')} placeholder="name@example.com" />
                {errors.email && (
                  <p className="text-sm text-errorAlert-foreground">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" {...register('password')} />
                {errors.password && (
                  <p className="text-sm text-errorAlert-foreground">{errors.password.message}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="mt-4 w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Sign in
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&#39;t have an account?{' '}
            <Link href="/auth/register" className="mt-3 underline underline-offset-4">
              Sign up
            </Link>
          </div>
          <SocialLoginButtons />
        </CardContent>
      </Card>
    </div>
  );
}
