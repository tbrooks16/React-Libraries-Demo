import Link from "next/link";
import { FillText } from "./ui/FillText";
import { ModeToggle } from "@/app/next-themes/modetoggle";

export default function Navbar() {
  return (
    <>
      <nav className="sticky flex justify-center items-baseline top-0 z-20 mx-auto w-screen bg-inherit gap-5 py-2">
        <Link href="/">
          <FillText text="Home" />
        </Link>
        <Link href="/signin">
          <FillText text="Sign In" />
        </Link>
        <Link href="/tanstack/query">
          <FillText text="Tanstack Query" />
        </Link>
        <Link href="/tanstack/form">
          <FillText text="Tanstack Form" />
        </Link>
        <Link href="/reacthookform">
          <FillText text="React Hook Form" />
        </Link>
        <ModeToggle />
      </nav>
    </>
  );
}
