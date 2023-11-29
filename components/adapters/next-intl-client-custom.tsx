import React from "react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { Locale } from "@/i18n";

interface NextIntlClientCustomProps {
  locale: Locale
  messages?: AbstractIntlMessages;
  children?: React.ReactNode;
}

export const NextIntlClientCustom = ({locale, messages, children} : NextIntlClientCustomProps) => {
  const now = new Date()
  
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      now={now}
      timeZone='Asia/Bishkek'
      formats={{
        dateTime: {
          medium: {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          },
          long: {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }
        },
        number: {
          precise: {
            maximumFractionDigits: 5
          }
        }
      }}
    >
      {children}
    </NextIntlClientProvider>
  )
}