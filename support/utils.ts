import { join, dirname } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import crypto from "crypto";
import type Application from "koa";

const routesDir = join(dirname(fileURLToPath(import.meta.url)), "../routes");

export async function getRoutes(App: Application) {
  const files = readdirSync(routesDir).filter((f) => f.endsWith(".ts"));

  for (const file of files) {
    const routePath = join(routesDir, file);
    const route = await import(routePath);
    App.use(route.default.routes()).use(route.default.allowedMethods());
  }
}

export function loadKeys() {
  try {
    const privateKey = readFileSync("private.key");
    const publicKey = readFileSync("public.key");
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
    writeFileSync("private.key", privateKey);
    writeFileSync("public.key", publicKey);
  } catch (err) {
    throw new Error("Error saving keys", err);
  }
}
