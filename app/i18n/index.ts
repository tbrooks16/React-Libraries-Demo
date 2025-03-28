import { createInstance, Namespace, FlatNamespace, KeyPrefix } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { FallbackNs } from "react-i18next";
import { getOptions } from "./settings";

/**
 * Initializes a new i18next instance with the specified language and namespace(s).
 * Creates a fresh instance on server-side for each render to handle parallel compilation.
 *
 * @param lng - The language code to initialize i18next with
 * @param ns - A single namespace string or array of namespace strings to load
 * @returns Promise<i18n> A promise that resolves to the configured i18next instance
 *
 * @example
 * ```ts
 * const i18n = await initI18next('en', ['common', 'home']);
 * ```
 */
const initI18next = async (lng: string, ns: string | string[]) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

type $Tuple<T> = readonly [T?, ...T[]];
type $FirstNamespace<Ns extends Namespace> = Ns extends readonly any[]
  ? Ns[0]
  : Ns;

/**
 * A hook that provides translation functionality using i18next
 *
 * @param lng - The language code to use for translations
 * @param ns - The namespace(s) to use for translations. Can be a single namespace or an array of namespaces
 * @param options - Additional options for the translation
 * @param options.keyPrefix - Optional prefix for translation keys
 *
 * @returns An object containing:
 * - t: The translation function
 * - i18n: The i18next instance
 *
 * @typeParam Ns - The type of namespace(s), either a single FlatNamespace or tuple of FlatNamespaces
 * @typeParam KPrefix - The type for the key prefix, derived from the namespace
 */
export async function useTranslation<
  Ns extends FlatNamespace | $Tuple<FlatNamespace>,
  KPrefix extends KeyPrefix<
    FallbackNs<
      Ns extends FlatNamespace ? FlatNamespace : $FirstNamespace<FlatNamespace>
    >
  > = undefined,
>(lng: string, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const i18nextInstance = await initI18next(
    lng,
    Array.isArray(ns) ? (ns as string[]) : (ns as string),
  );
  return {
    t: Array.isArray(ns)
      ? i18nextInstance.getFixedT(lng, ns[0], options.keyPrefix)
      : i18nextInstance.getFixedT(lng, ns as FlatNamespace, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
