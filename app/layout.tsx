import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "BookTaught - Learn Books Like a PhD Mentor",
  description: "A web app that teaches people the books they buy like a PhD mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
