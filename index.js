import Koa from "koa";
import Router from "@koa/router";
import { getRoutes } from "./support/utils.js";

const app = new Koa();
const router = new Router();

getRoutes(app);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, () => console.log("listening on port 3000...!"));
