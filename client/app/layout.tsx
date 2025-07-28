import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth/auth-provider";
import HeaderWrapper from "@/components/common/header/header-wrapper";

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
        <AuthProvider>
          <header>
            <HeaderWrapper/>
          </header>
          <main>{children}</main>
          <footer></footer>
        </AuthProvider>
      </body>
    </html>
  );
}
