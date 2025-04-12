import { z } from 'zod';
import { procedure, protectedProcedure, router } from '../init';

export const exampleRouter = router({
  getExampleData: procedure.query(() => {
    return 'Lorem ipsum dolor sit amet';
  }),
  getExampleDataWithInput: procedure.input(z.string()).query((opts) => {
    const { input } = opts;
    return `Input received: ${input}`;
  }),
  getExampleUserData: protectedProcedure.query((opts) => {
    const { ctx } = opts;

    return { email: ctx.user.email, isAnonymous: ctx.user.isAnonymous };
  }),
});
