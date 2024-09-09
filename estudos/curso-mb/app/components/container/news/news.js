import Galerias from "./galerias/galerias";
import Notificacoes from "./notificacoes/notificacoes";
import './news.css';

export default function News(){
   return(
      <section className="news">
         <Galerias />
         <Notificacoes />
      </section>
   )
}