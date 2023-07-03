import { z } from "zod";

export const SessionUserJoinSchema = z.object({
  payload: z.object({
    account_id: z.string(),
    object: z.object({
      session_id: z.string(),
      id: z.string(),
      user: z.object({
        name: z.string(),
        user_key: z.string(),
        id: z.string(),
        join_time: z.string(),
      }),
      session_name: z.string(),
    }),
  }),
  event_ts: z.number(),
  event: z.literal("session.user_join"),
});

export const SessionUserLeaveSchema = z.object({
  payload: z.object({
    account_id: z.string(),
    object: z.object({
      session_id: z.string(),
      id: z.string(),
      user: z.object({
        leave_time: z.string(),
        name: z.string(),
        user_key: z.string(),
        id: z.string(),
        leave_reason: z.string(),
      }),
      session_name: z.string(),
    }),
  }),
  event_ts: z.number(),
  event: z.literal("session.user_leave"),
});

export const SessionStartedSchema = z.object({
  event: z.literal("session.started"),
  payload: z.object({
    account_id: z.string(),
    object: z.object({
      session_name: z.string(),
      start_time: z.string(),
      session_id: z.string(),
      id: z.string(),
    }),
  }),
  event_ts: z.number(),
});

export const SessionEndedSchema = z.object({
  event: z.literal("session.ended"),
  payload: z.object({
    account_id: z.string(),
    object: z.object({
      session_name: z.string(),
      start_time: z.string(),
      session_id: z.string(),
      id: z.string(),
    }),
  }),
  event_ts: z.number(),
});

export const ValidationSchema = z.object({
  payload: z.object({ plainToken: z.string() }),
  event: z.literal("endpoint.url_validation"),
  event_ts: z.number(),
});
