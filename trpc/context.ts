import { createClient } from '@/supabase/server';

export const createContext = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    console.log('No session found or error fetching session', user, error?.message);

    return {
      auth: false as const,
      user: null,
    };
  }

  return {
    auth: true as const,
    user: {
      id: user.id,
      email: user.email,
      isAnonymous: user.is_anonymous,
    },
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
