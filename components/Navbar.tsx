import Link from "next/link";
import { FillText } from "./ui/FillText";
import { ModeToggle } from "@/app/next-themes/modetoggle";
import { generateRouteMap } from "@/actions/ServerActions";

export default async function Navbar() {
  const routes = await generateRouteMap();

  return (
    <>
      <nav className="sticky flex justify-center items-baseline top-0 z-20 mx-auto w-screen bg-inherit gap-5 py-2">
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
