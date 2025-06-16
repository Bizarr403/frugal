import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Navbar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Frugal",
  description: "An app designed to make budgeting easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
