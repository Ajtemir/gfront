import type { Locale } from "@/i18n";

const COOKIE_LOCALE_NAME = "NEXT_LOCALE"

function getCookie(name: string): string {
  // https://stackoverflow.com/a/15724300/343045
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length !== 2) {
    return ''
  }
  
  const part = parts.pop()?.split(';').shift();
  return part ?? ''
}

function getCookieLocale() {
  const locale = getCookie(COOKIE_LOCALE_NAME) as Locale;
  return locale;
}

export {
  getCookie,
  getCookieLocale,
}