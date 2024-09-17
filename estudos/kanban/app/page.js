import Image from "next/image";
import 'material-icons/iconfont/material-icons.css';
import Board from "./components/Board";

export default function Home() {
   return (
     <>  
      <header className="flex flex-row items-center justify-between px-5 w-full h-16 bg-blue-950 text-white">
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

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
         <Board />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
      </>
   );
}
