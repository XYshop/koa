import path from "path";
import fs, { type Stats } from "fs";
import Router from "@koa/router";
import ResponseFormat from "../support/response";

const router = new Router();

router.post("/upload", async (ctx, next) => {
  // file is the name of the input field
  const file: any = ctx.request.files?.file;
  const reader = fs.createReadStream(file.filepath);

  const stream = fs.createWriteStream(
    path.join(process.cwd(), "uploads/shotcut.png"),
  );

  reader.pipe(stream);
  console.log("uploading %s -> %s", file.originalFilename, stream.path);

  ctx.body = ResponseFormat.success("File uploaded successfully");
});

router.get("/download/image", async (ctx) => {
  const fname = "2895d3d02f481baf0abcfbc00.16.07.png";
  const fpath = path.join(process.cwd(), "uploads", fname);

  const fstat: Stats = await stat(fpath);

  if (fstat.isFile()) {
    ctx.type = path.extname(fpath);
    ctx.body = fs.createReadStream(fpath);
  }
});

router.get("/download/pdf", async (ctx) => {
  const fname = "peepcode-git.pdf";
  const fpath = path.join(process.cwd(), "uploads", fname);
  const fstat: Stats = await stat(fpath);

  if (fstat.isFile()) {
    ctx.type = path.extname(fpath);
    ctx.body = fs.createReadStream(fpath);
  }
});

function stat(file: string): Promise<Stats> {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stat) => {
      if (err) {
        reject(err);
      } else {
        resolve(stat);
      }
    });
  });
}

export default router;
