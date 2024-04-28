import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../output.css";
import "../css/main.css"
import Logo from "./component/logo";
import Header from "./component/header";
import StoreProvider from "./storeProvider";
import Container from "./component/container";
import Nav from "./component/nav";
import Loading from "./loadingg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "기억 저장소",
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
          <Header /> 
          <Container>
            <Nav />
            <div className={`contentView`}>
              {children}
            </div>
          </Container>
        </StoreProvider>
      </body>
    </html>
  );
}
