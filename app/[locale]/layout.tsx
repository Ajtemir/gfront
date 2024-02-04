import React from "react";
import { Inter } from 'next/font/google'
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { SettingsProvider } from "@/contexts/settings-context";
import ThemeProviderAdapter from "@/components/adapters/theme-provider-adapter";
import { RtlAdapter } from "@/components/adapters/rtl-adapter";
import { ToasterAdapter } from "@/components/adapters/toaster-adapter";
import { Locale } from "@/i18n";
import { NextIntlClientCustom } from "@/components/adapters/next-intl-client-custom";
import { LocalizationProviderAdapter } from "@/components/adapters/localization-provider-adapter";
import { AuthProvider } from "@/contexts/auth-context";
import { QueryClientProviderAdapter } from "@/components/adapters/query-client-provider-adapter";
import ReduxProvider from "@/store/ReduxProvider";

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'Gosnagrada',
  creator: '@adiletelf',
  description: 'Issue government rewards',
  icons: {
    icon: '/favicon.ico'
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: Locale
  }
}) {
  const actualLocale = useLocale()
  if (params.locale !== actualLocale) {
    notFound();
  }

  const messages = (await import(`@/messages/${actualLocale}.json`)).default

  return (
    <html lang={actualLocale}>
    <body className={inter.className}>
    <ReduxProvider>
    <SettingsProvider>
      <AuthProvider>
        <ThemeProviderAdapter>
          <RtlAdapter>
            <NextIntlClientCustom locale={actualLocale} messages={messages}>
              <QueryClientProviderAdapter>
                <LocalizationProviderAdapter>
                  <ToasterAdapter/>
                  {children}
                </LocalizationProviderAdapter>
              </QueryClientProviderAdapter>
            </NextIntlClientCustom>
          </RtlAdapter>
        </ThemeProviderAdapter>
      </AuthProvider>
    </SettingsProvider>
    </ReduxProvider>

    </body>
    </html>
  )
}
