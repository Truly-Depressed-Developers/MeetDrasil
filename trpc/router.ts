import { router } from './init';
import { exampleRouter } from './routers/example';
import { hobbyRouter } from '@/trpc/routers/hobbyRouter';
import { eventRouter } from '@/trpc/routers/eventRouter';

export const appRouter = router({
  example: exampleRouter,
  hobby: hobbyRouter,
  event: eventRouter,
});

export type AppRouter = typeof appRouter;
