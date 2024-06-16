import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../output.css";
import "../css/main.css"
import StoreProvider from "./storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MongoAdmin",
  description: "기억하고 싶은거 저장하기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={"text-white"}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
