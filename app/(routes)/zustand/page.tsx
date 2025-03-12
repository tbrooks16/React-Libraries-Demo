import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { H1 } from "@/components/ui/Headings";
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "@/components/UserInfo";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>
        <div className="sticky top-24">
          <Alert>
            <AlertTitle>Look at the code</AlertTitle>
            <AlertDescription>
              Check out the code for this component in zustand/page.tsx
            </AlertDescription>
          </Alert>
          <p className="text-muted-foreground my-4">
            To get user data, fill out the form in{" "}
            <Link
              className="text-sky-500 hover:text-sky-600"
              href="/reacthookform"
            >
              ReactHookForm{" "}
            </Link>
            or{" "}
            <Link
              className="text-sky-500 hover:text-sky-600"
              href="/tanstack/form"
            >
              ReactHookForm
            </Link>{" "}
            or Tanstack Form
          </p>
          <H1>Zustand</H1>
          <div className="space-y-4">
            <Separator />
            <p>
              Zustand is a simple state store. You update state, call the
              mutation function and then anywhere in your app you can access the
              new information.
            </p>
            <p>
              Zustand recommends having a single store that is exported
              throughout your whole application. However, in NextJS it is
              recommended to not use a single globally exported store. This is
              because NextJS with the introduction of RSC&apos;s does a lot of
              work on the server, pre-render.
            </p>
            <Link
              className="text-sky-500 hover:text-sky-600"
              href="https://zustand.docs.pmnd.rs/guides/nextjs"
            >
              Read about the caveats
            </Link>
          </div>
        </div>
      </div>
      <div>
        <UserInfo />
      </div>
    </>
  );
}
