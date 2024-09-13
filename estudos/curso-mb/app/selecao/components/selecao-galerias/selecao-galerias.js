import './selecao-galerias.css'
import GaleriaOptions from "./galeria-options"

export default function SelecaoGalerias({ data } ){
   return(
      <section className="selecao-galerias">
         <Galeria data={data}/>
      </section>
   )
}

function Galeria({ data }){
   //Valida os dados recebidos. *Ainda não sei se isso é realmente necessário*.
   if(!data) return (<span>Nenhuma galeria encontrada!</span>)

   const galerias = data;
   return(
         galerias.map(galeria =>(
         <div key={galeria.titulo} className="galeria">
            <div className="galeria-image">
               <img src={galeria.thumbImage}></img>
            </div>
            <div className="galeria-infos">
               <div className="galeria-infos-body">
                  <a href="a" target="_blank">{galeria.titulo}</a>
                  <span>{galeria.data}</span>
               </div>
               <div className="galeria-infos-footer">
                  <span className={`material-icons ${galeria.expirado ? 'G-expirado' : 'G-ativo'}`}>person</span>
                  <span className="galeria-status">{galeria.expirado ? 'Experiada' : 'Ativa'}</span>
               </div>
            </div>
            <GaleriaOptions />
         </div>
      ))
   )
   
}