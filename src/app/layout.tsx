import localFont from 'next/font/local';

import './globals.css';

import { AuthProvider } from '@/core/services/state/auth';

const vazirFontMd = localFont({
  src: [
    {
      path: './fonts/Vazir-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Vazir-Medium.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Vazir-Medium.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-vazir-md',
});

const vazirFontBold = localFont({
  src: [
    {
      path: './fonts/Vazir-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Vazir-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Vazir-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-vazir-bold',
});

function layout({ children }) {
  return (
    <AuthProvider initialToken="" userData={null}>
      <html
        lang="fr"
        dir="rtl"
        className={`${vazirFontMd?.className} ${vazirFontMd?.variable} ${vazirFontBold?.variable}`}
      >
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}

export default layout;
