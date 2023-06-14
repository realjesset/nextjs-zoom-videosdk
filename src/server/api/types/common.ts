import { HttpStatusCode } from "axios";
import { z, type ZodTypeAny } from "zod";

const ZHttpStatusCode = z.nativeEnum(HttpStatusCode);

export const APIReturnType = <T extends ZodTypeAny>(dataType: T) => {
  return z.object({
    status: ZHttpStatusCode,
    data: dataType,
  });
};
