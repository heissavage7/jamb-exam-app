import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAMB CBT Practice | Past Questions & Answers",
  description: "Practice JAMB UTME past questions in Government, Mathematics, English, and Economics. 400+ CBT questions with answers and explanations.",
  keywords: "JAMB, UTME, CBT, past questions, Government, Mathematics, English, Economics, Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
