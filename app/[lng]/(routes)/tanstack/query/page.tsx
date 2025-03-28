"use client";

import Chatbot from "@/components/Chatbot";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { H1 } from "@/components/ui/Headings";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/app/i18n/client";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "tanstackquery");

  return (
    <>
      <div>
        <div className="sticky top-24">
          <Alert>
            <AlertTitle>{t("lookAtCode")}</AlertTitle>
            <AlertDescription>{t("checkComponent")}</AlertDescription>
          </Alert>
          <H1>{t("title")}</H1>
          <p className="text-muted-foreground my-4">{t("intro")}</p>
          <div className="space-y-4">
            <Separator />
            <div>
              <div className="text-muted-foreground text-sm">
                {t("freshStart.title")}
              </div>
              <p>{t("freshStart.description")}</p>
              <p>{t("freshStart.empty")}</p>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">
                {t("storedData.title")}
              </div>
              <p>{t("storedData.description")}</p>
            </div>
            <Separator />
            <p>{t("caching.description")}</p>
            <p>{t("opportunities.intro")}</p>
            <ul className="m-4">
              <li className="m-2 list-inside list-disc">
                {t("opportunities.features.caching")}
              </li>
              <li className="m-2 list-inside list-disc">
                {t("opportunities.features.retries")}
              </li>
              <li className="m-2 list-inside list-disc">
                {t("opportunities.features.fetching")}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Chatbot />
    </>
  );
}
