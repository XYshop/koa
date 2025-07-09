import fs from "fs"
import path from "path"
import Router from "@koa/router"
import ResponseFormat from "../support/response"

const router = new Router()

router.get("/public-key", (ctx) => {
  const publicKeyPath = path.join(__dirname, '../public.key')
  const text = fs.readFileSync(publicKeyPath, 'utf-8')
  ctx.body = ResponseFormat.success(text)
})

export default router