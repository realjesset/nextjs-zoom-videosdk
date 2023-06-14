import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import videoAPI from "@/server/videoAPI";
import { TRPCError } from "@trpc/server";
import { HttpStatusCode } from "axios";
import { ScheduledSessionSchema } from "prisma/generated/zod.ts";
import { z } from "zod";
import { APIReturnType } from "../types/common";

export const sessionRouter = createTRPCRouter({
  /**
   * Starts a session.
   * @param id - The session ID.
   * @param userId - The user ID of the user to determine if they are the host.
   */
  start: publicProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .output(APIReturnType(z.undefined()))
    .mutation(async ({ input }) => {
      const find_session = await prisma.scheduledSession.findFirst({
        where: {
          id: input.id,
          hostId: input.userId,
        },
      });

      if (!find_session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Session not found",
        });
      }

      const r = await prisma.scheduledSession.update({
        where: {
          id: find_session.id,
        },
        data: {
          state: "STARTED",
        },
      });

      console.log({ r });

      return { status: HttpStatusCode.Ok };
    }),
  /**
   * Stops a session.
   * @param id - The session ID.
   * @param userId - The user ID of the user to determine if they are the host.
   */
  stop: publicProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .output(APIReturnType(z.undefined()))
    .mutation(async ({ input }) => {
      const find_session = await prisma.scheduledSession.findFirst({
        where: {
          id: input.id,
          hostId: input.userId,
        },
      });

      if (!find_session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Session not found",
        });
      }

      await prisma.scheduledSession.update({
        where: {
          id: find_session.id,
        },
        data: {
          state: "ENDED",
        },
      });

      return { status: HttpStatusCode.Ok };
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        hostId: z.string(),
        hostname: z.string(),
      })
    )
    .output(APIReturnType(ScheduledSessionSchema))
    .mutation(async ({ input }) => {
      const session = await prisma.scheduledSession.create({
        data: input,
      });
      if (!session) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create session",
        });
      }

      return { status: HttpStatusCode.Created, data: session };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const session = await prisma.scheduledSession.delete({
        where: {
          id: input.id,
        },
        select: {
          currentSessionId: true,
        },
      });

      if (!session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Session not found",
        });
      }

      if (session.currentSessionId) {
        // end zoom session
        const res = await videoAPI.put(
          `/videosdk/sessions/${session.currentSessionId}/status`,
          {
            action: "end",
          }
        );

        if (res.status !== HttpStatusCode.NoContent) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to end session",
          });
        }
      }
      return { status: HttpStatusCode.Ok, data: session };
    }),
  list: publicProcedure
    .output(APIReturnType(z.array(ScheduledSessionSchema)))
    .query(async () => {
      const sessions = await prisma.scheduledSession.findMany();
      if (!sessions) return { status: HttpStatusCode.Ok, data: [] };
      return {
        status: HttpStatusCode.Ok,
        data: sessions.sort((a) => (a.state === "STARTED" ? -1 : 1)), // sorted by started
      };
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .output(APIReturnType(ScheduledSessionSchema))
    .query(async ({ input }) => {
      const session = await prisma.scheduledSession.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!session) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Session not found",
        });
      }
      return {
        status: HttpStatusCode.Ok,
        data: session,
      };
    }),
});
