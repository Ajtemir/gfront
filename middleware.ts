import createMiddleware from 'next-intl/middleware';
import { DefaultLocale, Locales } from "@/i18n";


export default createMiddleware({
  // @ts-ignore A list of all locales that are supported
  locales: Locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: DefaultLocale
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};