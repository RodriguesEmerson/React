import 'material-icons/iconfont/material-icons.css';
import Board from "../../components/Board";

export default function Projetos({ params }) {
   
   return (
     <>  
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
         <Board id={params.id}/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
      </>
   );
}