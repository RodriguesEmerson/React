import './selecao-galerias.css'
import GaleriaOptions from "./galeria-options"

export default function SelecaoGalerias(){

   return(
      <section className="selecao-galerias">
         <Galeria />
      </section>
   )
}

function Galeria(){
   return(
      <div className="galeria">
         <div className="galeria-image">
            <img src="a"></img>
         </div>
         <div className="galeria-infos">
            <div className="galeria-infos-body">
               <a href="a" target="_blank">Nome do arquivo</a>
               <span>data</span>
            </div>
            <div className="galeria-infos-footer">
               <span className="material-icons"></span>
               <span className="galeria-status">status</span>
            </div>
         </div>
         <GaleriaOptions />
      </div>
   )
}