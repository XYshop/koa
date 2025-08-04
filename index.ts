import Koa from "koa";
import { koaBody } from "koa-body";
import Logger from "koa-logger";

import { getRoutes } from "./support/utils.js";

const app = new Koa();

getRoutes(app);

app
  .use(koaBody({ multipart: true }))
  .use(Logger())

  .listen(3000, () => console.log("listening on port 3000...!"));
