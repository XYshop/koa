import jwt from "jsonwebtoken";
import { loadKeys } from "../support/utils";
import type { Context, Next } from "koa";

export const auth = async (ctx: Context, next: Next) => {
  const token = ctx.request.header.authorization;
  if (!token) ctx.throw(401, "Missing authorization header");

  const { publicKey } = loadKeys();

  const isVerified = jwt.verify(token.split(" ")[1], publicKey, {
    algorithms: ["RS256"],
  });

  ctx.state.user = isVerified;
  await next();
};
