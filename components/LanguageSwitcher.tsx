"use client";

import { cookieName, languages } from "@/app/i18n/settings";
import { CustomCombobox } from "./Combobox";
import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";
import { Trans } from "react-i18next/TransWithoutContext";
import { useUserStore } from "@/lib/providers";
import { getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";

// There is a sync issue with the cookie because it is defaulting to the url.
export const LanguageSwitcher = () => {
  const { lng } = useParams<{ lng: string }>();
  const language = useUserStore((store) => store.language);
  const { i18n } = useTranslation(language || lng, "navbar");
  const t = i18n.getFixedT(lng, "navbar");
  const updateLanguage = useUserStore((store) => store.updateLanguage);

  // Sync cookie with current language on mount and language changes
  useEffect(() => {
    const currentCookie = getCookie(cookieName);
    if (currentCookie !== language) {
      setCookie(cookieName, language || lng, { path: "/" });
    }
  }, [language, lng]);

  const changeLanguage = async (language: string) => {
    i18n.changeLanguage(language);
    setCookie(cookieName, language, { path: "/" });
    updateLanguage(language);
  };

  return (
    <>
      <span>Language: </span>
      {/* <Trans i18nKey="languageSwitcher" t={t}>
        @ts-expect-error Trans interpolation
        Switch from <strong>{{ lng }}</strong> to:{" "}
      </Trans> */}
      <CustomCombobox
        value={language}
        options={languages}
        controlled={false}
        onSelect={(val) => changeLanguage(val)}
      />
    </>
  );
};
