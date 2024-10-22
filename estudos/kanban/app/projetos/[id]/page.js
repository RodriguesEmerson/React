import 'material-icons/iconfont/material-icons.css';
import Board from "../../components/Board";

export default function Projetos({ params }) {
   return (
     <>  
      <main className="bg-blue-200 w-full">
         <Board id={params.id}/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
      </>
   );
}