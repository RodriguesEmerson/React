import localFont from "next/font/local";
import Aside from "./components/aside/aside";
import Header from "./components/header/header";
import "./globals.css";

const geistSans = localFont({
   src: "./fonts/GeistVF.woff",
   variable: "--font-geist-sans",
   weight: "100 900",
});
const geistMono = localFont({
   src: "./fonts/GeistMonoVF.woff",
   variable: "--font-geist-mono",
   weight: "100 900",
});

export const metadata = {
   title: "Foto Select",
   description: "Site de seleção de fotos. (Clone Selpics - estudos)", 
};

export default function RootLayout({ children }) {
   return (
      <html lang="pt-br"> 
         <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <Header />
            <Aside />
            {children}
         </body>
      </html>
   );
}
