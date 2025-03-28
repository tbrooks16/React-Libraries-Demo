"use client";

import { ReactHookForm } from "@/components/ReactHookForm";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { H1 } from "@/components/ui/Headings";
import { useTranslation } from "@/app/i18n/client";
import { use } from "react";
import { useUserStore } from "@/lib/providers";

export default function Page({ params }: { params: Promise<{ lng: string }> }) {
  // const { lng } = use(params);
  // const { t } = useTranslation(lan, "reacthookform");
  const language = useUserStore((store) => store.language);
  const { t } = useTranslation(language, "reacthookform");

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
            <p>{t("description.validation")}</p>
            <p>{t("description.conditional")}</p>
          </div>
        </div>
      </div>
      <ReactHookForm lng={language} />
    </>
  );
}
