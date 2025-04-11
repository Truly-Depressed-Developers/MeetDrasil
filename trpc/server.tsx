import 'server-only';

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';
import { makeQueryClient } from './query-client';
import { createCallerFactory } from './init';
import { AppRouter, appRouter } from './router';
import { createContext } from './context';

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(caller, getQueryClient);
