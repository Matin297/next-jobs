import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Next Jobs",
    template: "%s | Next Jobs",
  },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit tempora aspernatur quos, perspiciatis amet neque ut esse repellendus, debitis quis, earum illum! Molestiae temporibus dolorum omnis neque inventore! Cupiditate, quidem!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="mx-auto max-w-screen-lg p-5">{children}</main>
      </body>
    </html>
  );
}
