"use client";
import "@sendshorts/ui/globals.css";
import { LocalVideoSync } from "../components/LocalVideoSync";
import { Toaster as Sonner } from "@sendshorts/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LocalVideoSync />
        <Sonner />
        {children}
      </body>
    </html>
  );
}
