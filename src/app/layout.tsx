import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "@/components/theme-provider";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | Computer Repair Shop`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  // metadataBase: new URL(SERVER_URL)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            duration={5000}
            position="bottom-center"
            toastOptions={{
              unstyled: true,

              classNames: {
                error: "text-red-600  border rounded-md p-2",
                success: "border border-2 rounded-md p-2",
                warning: "text-yellow-700 bg-white border rounded-md p-2",
                info: "text-blue-700 bg-white border rounded-md p-2",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
