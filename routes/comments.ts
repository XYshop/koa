import Router from "@koa/router";
import pool from "../server/client";
import { ObjectId } from "mongodb";
import ResponseFormat from "../support/response";
const router = new Router();

router.get("/comments", async (ctx) => {
  const { name } = ctx.query;
  const db = await pool.connect();
  if (name) {
    const res = await db
      .collection("comments")
      .aggregate([
        { $match: { name: name } },
        { $sort: { date: -1 } },
        {
          $lookup: {
            from: "movies",
            localField: "movie_id",
            foreignField: "_id",
            as: "movie_info",
          },
        },
        {
          $unwind: {
            path: "$movie_info",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            text: 1,
            name: 1,
            email: 1,
            date: 1,
            movie_id: 1,
            "movie_info.title": 1,
            "movie_info.plot": 1,
            "movie_info.languages": 1,
            "movie_info.directors": 1,
            "movie_info.cast": 1,
          },
        },
      ])
      .toArray();

    ctx.body = ResponseFormat.success(res);
  } else {
    const res = await db.collection("comments").find().limit(10).toArray();
    ctx.body = ResponseFormat.success(res);
  }
});

router.get("/comments/:movieId", async (ctx) => {
  const { movieId } = ctx.params;
  const db = await pool.connect();
  if (movieId) {
    const res = await db
      .collection("comments")
      .aggregate([
        { $match: { movie_id: new ObjectId(movieId) } },
        { $sort: { date: -1 } },
        {
          $lookup: {
            from: "users",
            localField: "email",
            foreignField: "email",
            as: "user_id",
          },
        },
        {
          $project: {
            _id: 1,
            text: 1,
            name: 1,
            email: 1,
            date: 1,
            movie_id: 1,
            user_id: { $arrayElemAt: ["$user_id._id", 0] },
          },
        },
      ])
      .toArray();

    ctx.body = ResponseFormat.success(res);
  }
});

router.post("/comments/post", async (ctx) => {
  const { name, email, movie_id, text, date } = ctx.request.body;
  const db = await pool.connect();
  const res = await db.collection("comments").insertOne({
    name,
    email,
    movie_id: ObjectId.createFromHexString(movie_id),
    text,
    date: new Date(date),
  });

  if (res.acknowledged) {
    ctx.body = ResponseFormat.success("you have posted a comment.");
  } else {
    ctx.body = ResponseFormat.error();
  }
});

export default router;
