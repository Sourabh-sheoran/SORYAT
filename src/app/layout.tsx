import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import WaveBackground from "@/components/WaveBackground";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SORYAT — Demo-First Digital Agency",
  description:
    "Full-stack digital agency. Web Development, AI Agents, Research Papers, SEO, and Content Writing across India, Canada & Global Markets. Start with a low advance.",
  keywords: [
    "Digital Agency India",
    "Web Development Canada",
    "AI Agent Development",
    "Academic Research Paper Writing",
    "SEO Marketing Agency",
    "Demo First Development",
    "SORYAT",
  ],
  openGraph: {
    title: "SORYAT — Demo-First Digital Agency",
    description:
      "Start any project with low advance. Free revisions. 1–2 week rapid delivery.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-symbol-black.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo-symbol-black.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col selection:bg-white/20 selection:text-black dark:text-white relative"
      >
        <WaveBackground />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
