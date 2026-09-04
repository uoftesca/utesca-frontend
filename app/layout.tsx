import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Fraunces, Poppins } from "next/font/google";
import { Toaster } from "sonner";
// @ts-ignore
import "./globals.css";

// Header font
const heading = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Body font
const body = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UTESCA",
  description:
    "University of Toronto Engineering Student Consulting Association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${heading.variable} ${body.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
