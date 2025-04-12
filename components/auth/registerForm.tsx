'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema } from '@/lib/validation';
import { Label } from '../ui/label';
import type * as z from 'zod';
import { useState } from 'react';
import { ServerMessage } from '@/types/Auth';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SocialLoginButtons from './socialLoginButtons';
import { createClient } from '@/supabase/client';

type RegisterFormProps = {
  className?: string;
};

export default function RegisterForm({ className }: RegisterFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [serverMessage, setServerMessage] = useState<ServerMessage | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const email = data.email;
    const password = data.password;

    setLoading(true);

    const { data: loginInfo, error } = await supabase.auth.updateUser({
      email,
      password,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    setLoading(false);

    if (error) {
      setServerMessage({ type: 'error', message: error.message });
      return;
    }

    if (loginInfo.user && !session) {
      // This means email confirmation is REQUIRED
      setServerMessage({
        type: 'success',
        message: 'Signed up successfully! Check you inbox to confirm the account.',
      });
    } else if (loginInfo.user && session) {
      // This means email confirmation is DISABLED - user is signed up and logged in
      setServerMessage({
        type: 'success',
        message: 'Signed up successfully! Redirecting...',
      });

      router.push('/');
      router.refresh();
    } else {
      setServerMessage({
        type: 'error',
        message: 'Unexpected error happened. Try again later.',
      });
    }
  };

  return (
    <div className={className}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Enter your email and password to create a new account</CardDescription>
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
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="password">Repeat password</Label>
                <Input type="password" {...register('confirmPassword')} />
                {errors.confirmPassword && (
                  <p className="text-sm text-errorAlert-foreground">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <Button type="submit" className="mt-4 w-full">
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Sign up
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="mt-3 underline underline-offset-4">
              Sign in
            </Link>
          </div>
          <SocialLoginButtons />
        </CardContent>
      </Card>
    </div>
  );
}
