import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {IBM_Plex_Serif,Inter} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400","700"],
  variable: "--font-ibm-plex-serif",
});


export const metadata: Metadata = {
  title: "Paytm",
  description: "Paytm is a Modern baking platform for eyeryone",
  icons:{
    icon:"/icons/logo.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning
     lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
