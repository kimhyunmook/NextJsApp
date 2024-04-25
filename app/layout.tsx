import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../output.css";
import "../css/main.css"
import Logo from "./component/logo";
import Header from "./component/header";
// import { Provider } from 'react-redux';
// import store from "../lib/store/store";
import StoreProvider from "./storeProvider";
import Container from "./component/container";

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
      <body className={""}>
        <StoreProvider>
          <Header />
          <Container>
            {children}
          </Container>
          <footer className="bg-gray-200 h-60 mt-20">
            <Logo />
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
