import { env } from "@/env.mjs";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import createJWT from "@/utils/createJWT";
import { z } from "zod";

export const clientRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getToken: publicProcedure
    .input(
      z.object({
        topic: z.string(),
        role: z.number().min(0).max(1),
        username: z.string().optional(),
        password: z.string(),
      })
    )
    .query(({ input }) => {
      const iat = Math.round(new Date().getTime() / 1000) - 30;
      const payload = {
        app_key: env.SDK_KEY,
        iat,
        tpc: input.topic,
        role_type: input.role,
        user_identity: input.username,
        pwd: input.password,
        cloud_recording_option: 0,
        cloud_recording_election: 0,
        session_key: "",
      };

      return createJWT(payload, env.SDK_SECRET);
    }),
});
