import { auth } from "@/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

const { GET, POST, PATCH, PUT, DELETE } = toNextJsHandler(auth.handler);

export { GET, POST, PATCH, PUT, DELETE };
