import { generateRouteMap } from "@/actions/ServerActions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FillText } from "@/components/ui/FillText";
import { UserInfo } from "@/components/UserInfo";
import Link from "next/link";

// This ensures the route generation only happens at build time
export const revalidate = 3600; // Revalidate every hour if needed

export default async function Home() {
  // Routes are generated at build time
  const routes = await generateRouteMap();

  return (
    <main className="flex min-h-screen flex-col gap-3 p-24">
      <h1 className="text-3xl">Home Page</h1>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {routes.map((route) => (
          <Alert className="flex-auto md:flex-[1]" key={route}>
            <AlertTitle>
              <Link href={`/${route}`}>
                <FillText
                  text={route
                    .split("/")
                    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                    .join(" / ")}
                />
              </Link>
            </AlertTitle>
            <AlertDescription>Click to learn about me!</AlertDescription>
          </Alert>
        ))}
      </div>
      <UserInfo />
    </main>
  );
}
