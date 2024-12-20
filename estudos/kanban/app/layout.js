import localFont from "next/font/local";
import { Poppins } from "next/font/google"
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300']
})

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
  title: "Kanban",
  description: "Inspirado no Trello",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className="html-scroll">
      <body
        className={`${poppins.className} ${geistMono.variable} bg-indigo-800 overflow-y-hidden overflow-x-auto h-[100vh]`}
      >
        <header className="flex flex-row items-center justify-between px-5 w-full h-16 bg-gradient-to-r from-cyan-700 to-indigo-900 text-white fixed border-b border-b-gray-400">
         <div className="text-2xl">Kanban</div>
         <nav>
            <ul className="flex flex-row gap-5">
               <li className="flex flex-row items-center text-sm cursor-pointer hover:text-gray-300 transition-all">
                  <p>Área de Trabalho</p><span className="material-icons">keyboard_arrow_down</span>
               </li>
               <li className="flex flex-row text-sm items-center cursor-pointer hover:text-gray-300 transition-all">
                  <p>Recentes</p><span className="material-icons">keyboard_arrow_down</span>
               </li>
               <li className="flex flex-row text-sm items-center cursor-pointer hover:text-gray-300 transition-all">
                  <p>Favoritos</p><span className="material-icons">keyboard_arrow_down</span>
               </li>
            </ul>
         </nav>
      </header>

        {children}
      </body>
    </html>
  );
}
