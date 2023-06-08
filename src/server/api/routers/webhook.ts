import { env } from "@/env.mjs";
import crypto from "crypto";
import { z } from "zod";
import { publicProcedure } from "../trpc";

export const webhookRouter = publicProcedure
  .meta({
    openapi: {
      method: "GET",
      path: "/webhook",
      tags: ["Get all zoom webhook events"],
    },
  })
  .input(
    z.object({
      event: z.string(),
      payload: z.object({}).passthrough(),
      event_ts: z.number(),
    })
  )
  .query(({ input }) => {
    const { event, payload, event_ts } = input;
    switch (event) {
      case "endpoint.url_validation":
        const hashForValidate = crypto
          .createHmac("sha256", env.ZOOM_WEBHOOK_SECRET_TOKEN)
          .update(payload.plainToken as string)
          .digest("hex");
        return {
          plainToken: payload.plainToken,
          encryptedToken: hashForValidate,
        };
    }

    return { status: 200 };
  });
