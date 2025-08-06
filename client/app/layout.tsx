import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/common/header/header";
import { QueryWrapper } from "@/components/tanstack/provider";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kena Kata",
  description:
    "A online clothing shop where you can find your best fit for yourselft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <QueryWrapper>
          <>
            <Header />
          </>

          <main className="max-w-7xl mx-auto px-6 lg:px-10 mt-4">
            {children}
            <Toaster />
          </main>
          <footer></footer>
        </QueryWrapper>
      </body>
    </html>
  );
}
