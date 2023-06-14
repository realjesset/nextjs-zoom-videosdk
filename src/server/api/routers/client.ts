import { env } from "@/env.mjs";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import createJWT from "@/utils/createJWT";
import { TRPCError } from "@trpc/server";
import { HttpStatusCode } from "axios";
import { z } from "zod";
import { APIReturnType } from "../types/common";
import { createTokenPayload } from "../utils/create-token-payload";

export const clientRouter = createTRPCRouter({
  getToken: publicProcedure
    .input(
      z.object({
        sessionId: z.string(), // scheduled session id
        userId: z.string(),
        username: z.string(),
      })
    )
    .output(APIReturnType(z.string()))
    .query(async ({ input }) => {
      const session = await prisma.scheduledSession.findUnique({
        where: {
          id: input.sessionId,
        },
      });

      if (!session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Session not found",
        });
      }

      /** token which is used to join videoSDK sessions */
      const token = createJWT(
        createTokenPayload({
          app_key: env.SDK_KEY,
          tpc: session.id, // internal tracking
          user_identity: input.username,
          session_key: session.hostId,
          role_type: input.userId === session.hostId ? 1 : 0,
          iat: Math.round(new Date().getTime() / 1000) - 30,
        }),
        env.SDK_SECRET
      );

      return {
        status: HttpStatusCode.Ok,
        data: token,
      };
    }),
});
