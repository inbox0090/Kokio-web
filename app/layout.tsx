import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Anybody, Lexend } from "next/font/google";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { NavBar } from "@/components/global/nav-bar";
import { Footer } from "@/components/global/footer";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const Web3ModalProvider = dynamic(() => import("@/context"), { ssr: false });

const anybody = Anybody({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anybody",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Kokio",
  description: "Blockchain powered eSIM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieHeader = cookies().toString();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(anybody.variable, lexend.variable)}
    >
      <body
        className={cn(
          "flex min-h-screen flex-col bg-beach-sky font-sans antialiased",
        )}
      >
        <Web3ModalProvider cookie={cookieHeader}>
          <NavBar />
          <div className="m-0 flex-1 p-0">{children}</div>
          <Footer />
          <Toaster />
        </Web3ModalProvider>
        <Script
          id="matomo-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="https://psedev.matomo.cloud/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '17']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src='https://cdn.matomo.cloud/psedev.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
