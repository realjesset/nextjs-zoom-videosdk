import jwt from "jsonwebtoken";

interface Payload {
  [key: string]: unknown;
}

const createJWT = (payload: Payload = {}, secret: string): string => {
  const expiresIn = "2h"; // set the token to expire in 2 hours

  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};

export default createJWT;
