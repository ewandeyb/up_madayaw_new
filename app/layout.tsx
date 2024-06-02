import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://upmadayaw.app/"),

  title: {
    template: "%s | UP Madayaw",
    default: "UP Madayaw",
  },
  authors: {
    name: "Aaron Siapuatco",
  },
  description:
    "Build dashboard with role management using next.js and supabase.",
  openGraph: {
    title: "UP Madayaw",
    description: "Build dashboard with next.js and supabase",
    url: "https://upmadayaw.app/",
    siteName: "UP Madayaw",
    images: "/og.png",
    type: "website",
  },
  keywords: ["up", "upmindanao", "dashboard"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-verdana antialiased dark:bg-[#09090B]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          {/* <Footer /> */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
