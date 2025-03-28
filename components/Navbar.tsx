import Link from "next/link";
import { FillText } from "./ui/FillText";
import { ModeToggle } from "@/components/next-themes/modetoggle";
import { generateRouteMap } from "@/actions/ServerActions";
import { capitalizeFirst, cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"; // Adjust import path as needed
import React from "react";
import { NavigationMenuLink } from "./ui/navigation-menu";

export default async function Navbar() {
  const routes = await generateRouteMap();

  return (
    <NavigationMenu className="relative top-0 z-20 mx-auto w-screen rounded-lg bg-inherit px-2">
      <NavigationMenuList className="space-x-4">
        <NavigationMenuItem>
          <Link href="/">
            <FillText text="Home" className="text-chart-4" />
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <FillText text="Explore" className="text-chart-4" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {routes.map((route) => (
                <ListItem
                  key={route.url}
                  href={`/${route.url}`}
                  title={route.url
                    .split("/")
                    .map((part) => capitalizeFirst(part))
                    .join(" ")}
                >
                  {route.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>

        <NavigationMenuItem>
          <LanguageSwitcher />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href = "", ...props }, ref) => {
  return (
    <li className="grow">
      <NavigationMenuLink asChild>
        <Link
          prefetch={true}
          href={href}
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
