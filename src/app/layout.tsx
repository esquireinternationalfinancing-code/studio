import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Loan App Dashboard",
  description: "A dashboard for managing loan applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-body antialiased ${inter.variable}`}>
        <div className="flex min-h-screen w-full flex-col bg-background">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
