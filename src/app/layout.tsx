import type { Metadata } from "next";
import "@/styles/main.css";

export const metadata: Metadata = {
  title: "Simple Todos",
  description: "A simple todo app built with Next.js, Drizzle ORM, and Turso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
