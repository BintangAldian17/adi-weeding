import type { Metadata } from "next";
import { Alex_Brush, EB_Garamond, Alegreya } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://adi-wedding.vercel.app";

const siteTitle = "The Wedding of Devi & Adi";

const siteDescription =
  "Join us in celebrating the wedding of Devi & Adi on 31 Mei 2026. View the invitation, event details, and send your wishes.";

const shareImage = "/og-image.png";
const shareImageUrl = new URL(shareImage, siteUrl).toString();

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  weight: "400",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const alegreya = Alegreya({
  variable: "--font-alegreya",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },

  description: siteDescription,

  applicationName: siteTitle,

  keywords: [
    "wedding invitation",
    "digital invitation",
    "Devi and Adi wedding",
    "undangan pernikahan",
    "undangan digital",
    "pernikahan Devi dan Adi",
  ],

  authors: [{ name: "Devi & Adi" }],
  creator: "Devi & Adi",
  publisher: "Devi & Adi",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    images: [
      {
        url: shareImageUrl,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [shareImageUrl],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png" }],
    shortcut: ["/favicon.ico"],
  },

  manifest: "/manifest.json",

  themeColor: "#390414",

  category: "event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${alexBrush.variable} ${ebGaramond.variable} ${alegreya.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
