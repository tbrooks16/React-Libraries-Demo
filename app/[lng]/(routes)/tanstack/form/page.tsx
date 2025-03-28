"use client";

import { TanStackForm } from "@/components/TanStackForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { H1 } from "@/components/ui/Headings";
import { use } from "react";
import { useTranslation } from "@/app/i18n/client";

export default function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "tanstackform");

  return (
    <>
      <div>
        <div className="sticky top-24">
          <Alert>
            <AlertTitle>{t("lookAtCode")}</AlertTitle>
            <AlertDescription>{t("checkComponent")}</AlertDescription>
          </Alert>
          <H1>{t("title")}</H1>
          <p className="text-muted-foreground my-2">{t("intro")}</p>
          <div className="space-y-4">
            <p>{t("description.newLibrary")}</p>
            <p>{t("description.similarity")}</p>
            <p>{t("description.architecture")}</p>
            <Alert>
              <AlertTitle>{t("caveat.title")}</AlertTitle>
              <AlertDescription>{t("caveat.description")}</AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
      <TanStackForm lng={lng} />
    </>
  );
}
