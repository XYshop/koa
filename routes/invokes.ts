import Router from "@koa/router"
import fetch from 'node-fetch';
import ResponseFormat from "../support/response"

const router = new Router()

router.get("/invoke-uuid", async (ctx) => {
  const token = ctx.request.header.authorization;
  if (!token) ctx.throw(401, "Missing authorization header");

  try {
    const response = await fetch("http://httpbin.org/uuid", {
      headers: {
        "Authorization": token!,
        "Content-Type": "application/json"
      }
    })
    const res = await response.json() as { uuid: string }
    ctx.body = ResponseFormat.success(res.uuid)
  } catch (err) {
    console.log("uuid fetch error!");
  }
})

export default router