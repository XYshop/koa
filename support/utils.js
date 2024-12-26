import fs from "fs";
import path from "path";

const routesDir = path.join(__dirname, "../routes");

export function getRoutes(App) {
  fs.readdirSync(routesDir).forEach(async (file) => {
    const name = file.replace(".ts", "");
    const route = await import(path.join(routesDir, name));

    App.use(route.default.routes()).use(route.default.allowedMethods());
  });
}
