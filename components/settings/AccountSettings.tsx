import { PageSectionTitle } from '@/components/layout/PageLayout';
import { AuthButton } from '@/components/auth/AuthButton';
import { trpc } from '@/trpc/server';

export default async function AccountSettings() {
  const user = await trpc.user.getCurrent();
  const loggedIn = user !== null && user.isAnonymous === false;

  return (
    <>
      <PageSectionTitle>Account</PageSectionTitle>
      {loggedIn ? (
        <div className="grid grid-cols-1 gap-4">
          <span className="col-span-full text-center text-sm text-muted-foreground">
            Logged in as{' '}
            <span className="text-foreground">
              {user.email} / {user.name}
            </span>
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
