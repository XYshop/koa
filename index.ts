import Koa from "koa";
import Router from "@koa/router";
import koaBody from "koa-body";
import Logger from "koa-logger";

import { getRoutes } from "./support/utils.js";

const app = new Koa();
const router = new Router();

getRoutes(app);

app
  .use(Logger())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaBody({ multipart: true }))

  .listen(3000, () => console.log("listening on port 3000...!"));
