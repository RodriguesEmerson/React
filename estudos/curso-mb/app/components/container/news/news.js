import NewsDados from "./news-dados/news-dados";
import './news.css';

export default function News(){
   return(
      <section className="news">
         <NewsDados tipo="galerias"/>
         <NewsDados tipo="notificacoes"/>
      </section>
   )
}