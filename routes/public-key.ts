import { readFileSync } from "fs";
import { join, dirname } from "path";
import Router from "@koa/router";
import ResponseFormat from "../support/response";

const router = new Router();

router.get("/public-key", (ctx) => {
  const publicKeyPath = join(dirname(import.meta.url), "../public.key");
  const text = readFileSync(publicKeyPath, "utf-8");
  ctx.body = ResponseFormat.success(text);
});

export default router;
