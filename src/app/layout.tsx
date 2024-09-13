import type { Metadata } from "next";
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
