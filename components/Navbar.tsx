import Link from "next/link";
import { FillText } from "./ui/FillText";
import { ModeToggle } from "@/components/next-themes/modetoggle";
import { generateRouteMap } from "@/actions/ServerActions";

export default async function Navbar() {
  const routes = await generateRouteMap();

  return (
    <>
      <nav className="sticky top-0 z-20 mx-auto flex w-screen items-baseline justify-center gap-5 bg-inherit py-2">
        <Link href="/">
          <FillText text="Home" />
        </Link>
        {routes.map((route) => (
          <Link key={route} href={`/${route}`}>
            <FillText
              text={route
                .split("/")
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(" ")}
            />
          </Link>
        ))}
        <ModeToggle />
      </nav>
    </>
  );
}
