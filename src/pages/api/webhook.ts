/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "@/env.mjs";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import crypto from "crypto";
import { type NextApiRequest, type NextApiResponse } from "next";
import cors from "nextjs-cors";
import { createOpenApiNextHandler } from "trpc-openapi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Setup CORS
  await cors(req, res);

  const body = req.body;

  switch (body.event) {
    case "endpoint.url_validation":
      console.log("here");
      const hashForValidate = crypto
        .createHmac("sha256", env.ZOOM_WEBHOOK_SECRET_TOKEN)
        .update(body.payload.plainToken as string)
        .digest("hex");
      return res.send({
        plainToken: body.payload.plainToken as string,
        encryptedToken: hashForValidate,
      });
  }
  return res.send({ status: 200 });
};

export default handler;
