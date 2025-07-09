import Router from "@koa/router";
import jwt from "jsonwebtoken";
import pool from "../server/client";
import { loadKeys } from "../support/utils";
import ResponseFormat from "../support/response";

const router = new Router();

router.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body;
  const db = await pool.connect();
  const res = await db
    .collection("users")
    .findOne(
      { email: email, password: password },
      { projection: { _id: 0, name: 0 } },
    );

  if (!res) ctx.throw("user is invalid!");

  const { privateKey } = loadKeys();
  // You must sign the token with the RS256 algorithm
  const token = jwt.sign(res!, privateKey, { algorithm: "RS256" });
  ctx.body = ResponseFormat.success(token);
});

export default router;
