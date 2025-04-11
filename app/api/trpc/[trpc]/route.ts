import { appRouter } from '@/trpc/router';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from '@/trpc/context';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: createContext,
  });

export { handler as GET, handler as POST };
