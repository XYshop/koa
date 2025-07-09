import fs from "fs";
import path from "path";
import crypto from "crypto";
import type Koa from "koa";

const routesDir = path.join(__dirname, "../routes");

export function getRoutes(App: Koa) {
  fs.readdirSync(routesDir).forEach(async (file) => {
    const name = file.replace(".ts", "");
    const route = await import(path.join(routesDir, name));

    App.use(route.default.routes()).use(route.default.allowedMethods());
  });
}

export function loadKeys() {
  try {
    const privateKey = fs.readFileSync("private.key");
    const publicKey = fs.readFileSync("public.key");
    return { privateKey, publicKey };
  } catch (err) {
    const { privateKey, publicKey } = generateKeyPair();
    saveKeys(privateKey, publicKey);
    return { privateKey, publicKey };
  }
}

function generateKeyPair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
  return { privateKey, publicKey };
}

function saveKeys(privateKey: string, publicKey: string) {
  try {
    fs.writeFileSync("private.key", privateKey);
    fs.writeFileSync("public.key", publicKey);
  } catch (err) {
    console.error(err, "Error saving keys");
  }
}
