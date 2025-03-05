"use server";
import fs from "fs";
import path from "path";
import { cache } from "react";

export const generateRouteMap = cache(async function generateRouteMap() {
  const routes: string[] = [];
  const routesDir = path.join(process.cwd(), "app/(routes)");

  function traverse(dir: string, base: string = "") {
    const entries = fs.readdirSync(dir);

    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry);
      const relativePath = base ? `${base}/${entry}` : entry;

      if (fs.statSync(fullPath).isDirectory()) {
        if (fs.existsSync(path.join(fullPath, "page.tsx"))) {
          routes.push(relativePath);
        }
        traverse(fullPath, relativePath);
      }
    });
  }

  traverse(routesDir);
  return routes;
});
