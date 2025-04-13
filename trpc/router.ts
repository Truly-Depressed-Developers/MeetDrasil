import { router } from './init';
import { exampleRouter } from './routers/example';
import { hobbyRouter } from '@/trpc/routers/hobbyRouter';
import { eventRouter } from '@/trpc/routers/eventRouter';
import { userRouter } from '@/trpc/routers/userRouter';

export const appRouter = router({
  example: exampleRouter,
  hobby: hobbyRouter,
  event: eventRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
