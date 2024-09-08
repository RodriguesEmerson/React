import './subNav.css'

export default function SubNav(){
   return(
      <div className="subNav">
         <ul>
            <li key="selecao">
               <a href="">
                  <span className="material-icons">image</span>
                  <span>Seleção de fotos</span>
               </a>
            </li>
            <li key="album">
               <a href="">
                  <span className="material-icons">auto_stories</span>
                  <span>Prova de álbuns</span>
               </a>
            </li>
            <li key="creditos">
               <a href="">
                  <span className="material-icons">sell</span>
                  <span>Ganhe créditos</span>
               </a>
            </li>
            <li key="help">
               <a href="">
                  <span className="material-icons">help</span>
                  <span>Central de ajuda</span>
               </a>
            </li>
         </ul>
      </div>

   )
}