'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await supabase.auth.signOut();
      router.push('/');
      router.refresh();
    })();
  }, [router, supabase.auth]);

  return (
    <div className="flex size-full items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div>
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Logging out</CardTitle>
              <CardDescription>
                In a moment you will be redirected to the homepage ...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
