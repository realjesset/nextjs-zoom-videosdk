import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import videoAPI from "@/server/videoAPI";
import { z } from "zod";
import { type Session, type Sessions } from "../types/session";

export const sessionRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        type: z.union([z.literal("past"), z.literal("live")]),
      })
    )
    .query(async ({ input }) => {
      const sessions = await videoAPI.get<Sessions>("/videosdk/sessions", {
        data: { type: input.type },
      });
      return sessions.data;
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const session = await videoAPI.get<Session>(
        `/videosdk/sessions/${input.id}`
      );
      return session.data;
    }),
});
