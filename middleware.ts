import { NextResponse, NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|.*\\.png).*)",
  ],
};

/**
 * Middleware function for handling internationalization (i18n) routing in Next.js
 *
 * This middleware performs the following operations:
 * 1. Skips processing for icon and chrome-related paths
 * 2. Determines the user's language preference from:
 *    - Existing language cookie
 *    - Accept-Language header
 *    - Fallback language
 * 3. Redirects to localized routes if the current path doesn't include a supported language prefix
 * 4. Manages language persistence through cookies based on the referer header
 *
 * @param req - The incoming Next.js request object
 * @returns {NextResponse} - Either redirects to a localized route or continues the request
 *
 * @example
 * // Example URL transformation
 * // Input: /about
 * // Output: /en/about (assuming 'en' is the detected language)
 */
export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.indexOf("icon") > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1
  )
    return NextResponse.next();
  let lng: string | undefined | null;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") || "");
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
