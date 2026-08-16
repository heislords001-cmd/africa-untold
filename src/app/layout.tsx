import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AFRICA: UNTOLD — Every choice writes your story",
  description: "An AI-powered interactive story game set in Lagos, Nigeria. Experience dynamic narrative, characters, choices, and consequences.",
  keywords: ["AI Game", "Interactive Story", "Lagos", "CANEX Create-Thon 2026", "African Narrative"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-zinc-100 antialiased selection:bg-amber-500 selection:text-black font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
