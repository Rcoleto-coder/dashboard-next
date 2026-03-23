import type { Metadata } from "next";

// Fonts
import { Geist, Geist_Mono } from "next/font/google";

// Styles
import "./globals.css";

//  Providers
import { ThemeProvider } from "./providers/ThemeProvider";
import { AccessibleAnnouncerProvider } from "./providers/AccessibleAnnouncerContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-screen`}
      >
        <AccessibleAnnouncerProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              >
              {children}
          </ThemeProvider>
        </AccessibleAnnouncerProvider>
      </body>
    </html>
  );
}
