import { PageSectionTitle } from '@/components/layout/PageLayout';
import { createClient } from '@/supabase/server';
import { AuthButton } from '@/components/auth/AuthButton';

export default async function AccountSettings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const loggedIn = user !== null && user.is_anonymous === false;

  return (
    <>
      <PageSectionTitle>Account</PageSectionTitle>
      {loggedIn ? (
        <div className="grid grid-cols-1 gap-4">
          <span className="col-span-full text-center text-sm text-muted-foreground">
            Logged in as <span className="text-foreground">{user.email}</span>
          </span>
          <AuthButton path="/auth/logout" text="Log out" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <span className="col-span-full text-center text-sm text-muted-foreground">
            Not logged in
          </span>
          <AuthButton path="/auth/register" text="Create account" />
          <AuthButton path="/auth/login" text="Sign in" />
        </div>
      )}
    </>
  );
}
