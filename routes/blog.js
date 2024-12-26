import Router from "@koa/router";

const router = new Router();

router.get("/blog", (ctx) => {
  ctx.body = "Hello blog！";
});

export default router;
