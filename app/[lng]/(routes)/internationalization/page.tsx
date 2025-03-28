"use client";

import { useTranslation } from "@/app/i18n/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { H1 } from "@/components/ui/Headings";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { use } from "react";

export default function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "internationalization");
  return (
    <>
      <div>
        <div className="sticky top-24">
          <Alert>
            <AlertTitle>{t("lookAtCode")}</AlertTitle>
            <AlertDescription>{t("checkComponent")}</AlertDescription>
            <Link
              href="https://react.i18next.com"
              className="text-sky-500 hover:text-sky-600"
            >
              Docs
            </Link>
          </Alert>
          <H1>{t("title")}</H1>
        </div>
        <div className="space-y-4">
          <Separator />
          <p>{t("setup")}</p>
          <p>{t("features")}</p>
          <ul className="m-4">
            <li className="m-2 list-inside list-disc">
              {t("featureList.interpolation")}
            </li>
            <li className="m-2 list-inside list-disc">
              {t("featureList.pluralization")}
            </li>
            <li className="m-2 list-inside list-disc">
              {t("featureList.dynamicFetch")}
            </li>
          </ul>
          <div className="space-y-2">
            <Alert>
              <AlertTitle>{t("caveat.title")}</AlertTitle>
              <AlertDescription>{t("caveat.description")}</AlertDescription>
            </Alert>
            <div className="text-muted-foreground text-sm">
              {t("howItWorks.title")}
            </div>
            <p>{t("howItWorks.description")}</p>
            <p>{t("howItWorks.vanillaNote")}</p>
          </div>
          <p>{t("disclaimer")}</p>
          <p>
            {t("readMore")}
            <Link
              className="text-sky-500 hover:text-sky-600"
              href="https://www.locize.com/blog/react-i18next"
            >
              &nbsp;React
            </Link>
            <span>&nbsp;{t("or")}&nbsp;</span>
            <Link
              className="text-sky-500 hover:text-sky-600"
              href="https://www.locize.com/blog/next-app-dir-i18n"
            >
              Next
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
