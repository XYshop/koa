import Router from "@koa/router";
import pool from "../server/client";
import { auth } from "../middleware/auth";
import ResponseFormat from "../support/response";

const router = new Router();

router.get("/movies", auth, async (ctx) => {
  // Set cookie, if cookie is expired will not send to server
  ctx.cookies.set("time", "expired", {
    maxAge: 60 * 1000,
  });
  console.log(ctx.cookies.get("time"));

  const db = await pool.connect();
  const res = await db
    .collection("movies")
    .find({ poster: { $exists: true }, "tomatoes.viewer.rating": { $gt: 1 } })
    .limit(10)
    .toArray();

  ctx.body = ResponseFormat.success(res);
});

export default router;
