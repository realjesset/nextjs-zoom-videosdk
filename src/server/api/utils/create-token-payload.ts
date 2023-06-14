import { env } from "@/env.mjs";

type payload = {
  app_key?: string;
  iat: number;
  tpc: string;
  role_type?: number;
  user_identity: string;
  pwd?: string;
  cloud_recording_option?: number;
  cloud_recording_election?: number;
  session_key: string;
};

export const createTokenPayload = (payload: payload) => ({
  app_key: payload.app_key || env.SDK_KEY,
  iat: payload.iat,
  tpc: payload.tpc,
  role_type: payload.role_type || 0,
  user_identity: payload.user_identity,
  pwd: payload.pwd || "1234567",
  cloud_recording_option: payload.cloud_recording_option || 0,
  cloud_recording_election: payload.cloud_recording_election || 0,
  session_key: payload.session_key,
});
