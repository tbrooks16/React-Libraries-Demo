import { generateRouteMap } from "@/actions/ServerActions";
import { FillText } from "@/components/ui/FillText";
import Link from "next/link";

// This ensures the route generation only happens at build time
export const revalidate = 3600; // Revalidate every hour if needed

export default async function Home() {
  // Routes are generated at build time
  const routes = await generateRouteMap();
  console.log(routes);

  return (
    <main className="flex min-h-screen flex-col p-24 gap-3">
      <h1 className="text-3xl">Home Page</h1>
      <div className="flex flex-col gap-2 mt-4 items-start">
        {routes.map((route) => (
          <Link key={route} href={`/${route}`}>
            <FillText
              text={route
                .split("/")
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(" / ")}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
