import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'سایت پیشرو | Pishro',
  description: 'سایت پیشرو - سامانه سرمایه‌گذاری معتبر | Pishro Investment Platform',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#001a4d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-gradient-to-br from-pishroBlue-900 via-pishroBlue-800 to-pishroSlate-900 text-white min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pishroBlue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pishroGold rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
