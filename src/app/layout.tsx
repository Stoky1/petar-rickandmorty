'use client';

import { Layout } from '@/core/layouts/components/layout';
import { BaseQueryClientProvider } from '@/core/query-client/components/base-query-client-provider';
import '@/core/styles/globals.css';
import { Inter } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <html
      lang={i18n.language}
      className={twJoin(
        'dark [color-scheme:dark]',
        'text-[clamp(0.75rem,0.636rem+0.57vw,1rem)]',
      )}
    >
      <body
        className={twJoin(
          inter.variable,
          'font-sans antialiased',
          'has-[dialog[open]]:overflow-hidden',
        )}
      >
        <BaseQueryClientProvider>
          <Layout>{children}</Layout>
        </BaseQueryClientProvider>

        <footer className="sticky bottom-0 flex items-center justify-between min-h-14 border-t bg-background/60 px-6 backdrop-blur">
          <div className="text-sm text-muted-foreground">© 2024 Your App</div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-muted focus:ring-2 focus:ring-primary"
            >
              Languages
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-32 bg-card rounded-lg shadow-lg">
                <li
                  onClick={() => changeLanguage('en')}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-muted"
                >
                  English
                </li>
                <li
                  onClick={() => changeLanguage('de')}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-muted"
                >
                  Deutsch
                </li>
              </ul>
            )}
          </div>
        </footer>
      </body>
    </html>
  );
}
