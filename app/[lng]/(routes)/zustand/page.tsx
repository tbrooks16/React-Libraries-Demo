"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { H1 } from "@/components/ui/Headings";
import { Separator } from "@/components/ui/separator";
import { UserInfo } from "@/components/UserInfo";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "zustand");

  return (
    <>
      <div>
        <div className="sticky top-24">
          <Alert>
            <AlertTitle>{t("lookAtCode")}</AlertTitle>
            <AlertDescription>{t("checkComponent")}</AlertDescription>
          </Alert>
          <p className="text-muted-foreground my-4">
            {t("getUserData")}{" "}
            <Link
              className="text-sky-500 hover:text-sky-600"
              href="/reacthookform"
            >
              ReactHookForm{" "}
            </Link>
            {t("or")}{" "}
            <Link
              className="text-sky-500 hover:text-sky-600"
              href="/tanstack/form"
            >
              Tanstack Form
            </Link>{" "}
          </p>
          <H1>{t("title")}</H1>
          <div className="space-y-4">
            <Separator />
            <p>{t("simpleState")}</p>
            <p>
              {t("singleStore")}
              <Link
                className="text-sky-500 hover:text-sky-600"
                href="https://zustand.docs.pmnd.rs/guides/nextjs"
              >
                {" "}
                {t("readCaveats")}
              </Link>
            </p>
            <p>{t("persistStore")}</p>
          </div>
        </div>
      </div>
      <div>
        <UserInfo />
      </div>
    </>
  );
}
