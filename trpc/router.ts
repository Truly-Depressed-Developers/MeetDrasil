import { router } from './init';
import { exampleRouter } from './routers/example';
import { hobbyRouter } from '@/trpc/routers/hobbyRouter';
import { eventRouter } from '@/trpc/routers/eventRouter';
import { userRouter } from '@/trpc/routers/userRouter';
import { companyRouter } from '@/trpc/routers/companyRouter';

export const appRouter = router({
  example: exampleRouter,
  hobby: hobbyRouter,
  event: eventRouter,
  user: userRouter,
  company: companyRouter,
});

export type AppRouter = typeof appRouter;
