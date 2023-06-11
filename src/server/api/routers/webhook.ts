import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import crypto from "crypto";
import { z } from "zod";
import { ee } from "../root";
import { publicProcedure } from "../trpc";
import {
  SessionEndedSchema,
  SessionStartedSchema,
  SessionUserJoinSchema,
  SessionUserLeaveSchema,
  ValidationSchema,
} from "../types/webhook";

export const webhookRouter = publicProcedure
  .meta({
    openapi: {
      method: "POST",
      path: "/webhook",
      tags: ["Get all zoom webhook events"],
    },
  })
  .input(z.object({}).passthrough()) // trpc-openapi doesn't support discriminated unions yet
  .output(z.any())
  .query(({ input }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    return handleWebhook(input as unknown as any);
  });

const discriminatedUnions = z.discriminatedUnion("event", [
  ValidationSchema,
  SessionStartedSchema,
  SessionEndedSchema,
  SessionUserJoinSchema,
  SessionUserLeaveSchema,
]);

type WebhookInput = z.infer<typeof discriminatedUnions>;

const handleWebhook = async ({ event, payload }: WebhookInput) => {
  switch (event) {
    case "endpoint.url_validation":
      const hashForValidate = crypto
        .createHmac("sha256", env.ZOOM_WEBHOOK_SECRET_TOKEN)
        .update(payload.plainToken)
        .digest("hex");
      return {
        plainToken: payload.plainToken,
        encryptedToken: hashForValidate,
      };
    case "session.started": {
      console.log("session.started", payload.object.session_name);

      const session = await prisma.scheduledSession.update({
        where: {
          id: payload.object.session_name,
        },
        data: {
          currentSessionId: payload.object.id,
          participantsCount: {
            increment: 1,
          },
        },
      });
      ee.dispatch("session.started", session);
      break;
    }
    case "session.ended": {
      console.log("session.ended", payload.object.session_name);
      const session = await prisma.scheduledSession.update({
        where: {
          id: payload.object.session_name,
        },
        data: {
          currentSessionId: null,
          participantsCount: 0,
        },
      });
      console.log(session);
      break;
    }
    case "session.user_join": {
      console.log("session.user_join", payload.object.session_name);
      await prisma.scheduledSession.update({
        where: {
          id: payload.object.session_name,
        },
        data: {
          participantsCount: {
            increment: 1,
          },
        },
      });
      break;
    }
    case "session.user_leave": {
      console.log("session.user_leave", payload.object.session_name);
      await prisma.scheduledSession.update({
        where: {
          id: payload.object.session_name,
        },
        data: {
          participantsCount: {
            decrement: 1,
          },
        },
      });
      break;
    }
  }
  return { status: 200 };
};
