import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { clientRouter } from "./routers/client";
import { webhookRouter } from "./routers/webhook";

import EE from "./event-emitter";
import { sessionRouter } from "./routers/session";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  client: clientRouter,
  webhook: webhookRouter,
  session: sessionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/** event emitter */
export const ee = new EE();
