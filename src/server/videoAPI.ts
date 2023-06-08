import { env } from "@/env.mjs";
import createJWT from "@/utils/createJWT";
import axios from "axios";
import jwt from "jsonwebtoken";

let token = createJWT({ iss: env.API_KEY, aud: null }, env.API_SECRET);

/**
 * axios instance with zoom api base url and authorization header
 */
const videoAPI = axios.create({
  baseURL: "https://api.zoom.us/v2",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Add a request interceptor
videoAPI.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    try {
      jwt.verify(token, env.API_SECRET);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        // the token is expired, generate a new one
        token = createJWT({ iss: env.API_KEY }, env.API_SECRET);
      } else {
        // some other error happened, reject the promise
        return Promise.reject(error);
      }
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default videoAPI;
