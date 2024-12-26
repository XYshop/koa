import Router from "@koa/router";
import { MongoClient } from "mongodb";
import ResponseFormat from "../support/response.js";

const router = new Router();

const uri = import.meta.env.MONGODB_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    console.log("Connecting...");

    await client.connect().then(() => {
      console.log("Connected success!");
    });

    return await client.db("sample_mflix").collection("comments").findOne();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

router.get("/", async (ctx) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  const res = await run();
  ctx.body = ResponseFormat.success(res);
});

export default router;
