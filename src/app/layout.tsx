import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import { Footer, Sidebar } from "@/components";

export const metadata: Metadata = {
  title: "Discover All the Research Papers You Need to Study",
  description:
    "Access an extensive library of academic papers, journals, and articles to support your research, learning, and studies. Our platform makes it easy to find, explore, and download the scholarly resources you need in a variety of fields. Whether you're writing a thesis, working on a project, or preparing for exams, we provide the tools and resources to streamline your academic journey. Start your research with us and gain access to comprehensive academic materials all in one place!",
  icons: {
    icon: "/findpaper_logo_header.svg",
  },
  authors: [{ name: "FindPaper", url: "https://www.findpapers.click/" }],
  keywords: ["papers", "library", "research", "study", "academic", "papers"],
  metadataBase: new URL("https://www.findpapers.click/"),
  openGraph: {
    title: "Discover All the Research Papers You Need to Study",
    description:
      "Access an extensive library of academic papers, journals, and articles to support your research, learning, and studies. Our platform makes it easy to find, explore, and download the scholarly resources you need in a variety of fields. Whether you're writing a thesis, working on a project, or preparing for exams, we provide the tools and resources to streamline your academic journey. Start your research with us and gain access to comprehensive academic materials all in one place!",
  },
  twitter: {
    title: "Discover All the Research Papers You Need to Study",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.findpapers.click/",
  },
  verification: {
    google: "https://www.findpapers.click/",
    yandex: "https://www.findpapers.click/",
  },
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    address: false,
  },
  creator: "FindPaper",
  publisher: "FindPaper",
  appleWebApp: {
    title: "Discover All the Research Papers You Need to Study",
    capable: true,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "white",
  colorScheme: "light",
};
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <ConvexClientProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <div className="relative flex flex-col min-h-screen bg-gradient-to-t from-indigo-200 via-purple-100 to-gray-100">
            <Header />

            <main className="flex-1 flex relative">
              <Sidebar />

              <div className="sm:w-9/12 mx-auto">{children}</div>
            </main>
            <Footer />
          </div>
          <Toaster />
          <Analytics />
        </body>
      </ConvexClientProvider>
    </html>
  );
}
