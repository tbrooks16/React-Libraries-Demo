import { generateRouteMap } from "@/actions/ServerActions";
import { useTranslation } from "@/app/i18n";
import { fallbackLng, languages } from "@/app/i18n/settings";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FillText } from "@/components/ui/FillText";
import { H1 } from "@/components/ui/Headings";
import { UserInfo } from "@/components/UserInfo";
import { capitalizeFirst } from "@/lib/utils";
import Link from "next/link";

// ? Force non specified routes to return 404
export const dynamicParams = false; // true | false,

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  let { lng } = await params;
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng);
  return {
    title: t("title"),
    content: "A playground to explore popular react libraries.",
  };
}

export default async function Home() {
  // Routes are generated at build time
  const routes = await generateRouteMap();
  return (
    <div className="col-span-2">
      <main className="flex min-h-screen flex-col gap-3 p-24">
        <H1>Home Page</H1>
        <div className="flex flex-wrap justify-center gap-2">
          {routes.map((route) => (
            <Alert className="flex-auto md:flex-[1]" key={route.url}>
              <AlertTitle>
                <Link href={`/${route.url}`}>
                  <FillText
                    text={route.url
                      .split("/")
                      .map((part) => capitalizeFirst(part))
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
    </div>
  );
}
