"use server";
import fs from "fs";
import path from "path";
import { cache } from "react";

// Define the route descriptions
const routeDescriptions: Record<string, string> = {
  internationalization: "Implement multi-language support with i18Next",
  prisma: "Explore database operations with Prisma ORM",
  reacthookform: "Build forms efficiently with React Hook Form",
  signin: "Implement user authentication flows",
  form: "Create type-safe forms with Tanstack Form",
  query: "Handle async data with automatic caching and updates",
  zustand: "Handle client state management with Zustand",
  default: "Discover more about this feature",
};

interface RouteInfo {
  url: string;
  description: string;
}

export const generateRouteMap = cache(async function generateRouteMap() {
  const routes: RouteInfo[] = [];
  const routesDir = path.join(process.cwd(), "app/[lng]/(routes)");

  function traverse(dir: string, base: string = "") {
    const entries = fs.readdirSync(dir);

    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry);
      const relativePath = base ? `${base}/${entry}` : entry;

      if (fs.statSync(fullPath).isDirectory()) {
        if (fs.existsSync(path.join(fullPath, "page.tsx"))) {
          // Get the last part of the path for matching descriptions
          const routeKey = entry.toLowerCase();
          routes.push({
            url: relativePath,
            description:
              routeDescriptions[routeKey] || routeDescriptions.default,
          });
        }
        traverse(fullPath, relativePath);
      }
    });
  }

  traverse(routesDir);
  return routes;
});
