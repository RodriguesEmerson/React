import './selecao-galerias.css'
import GaleriaOptions from "./galeria-options"

export default function SelecaoGalerias({ termos }){
   console.log(termos)
   return(
      <section className="selecao-galerias">
         <Galeria />
      </section>
   )
}

async function Galeria(){

   const data = await fetch('http://localhost:3000/db/db.json',
      {
         method: 'GET', 
         cache: 'no-store' //Impede que o fetch busque dados em cache --'antigos';
      }
   ).then(response =>{
      //Se o status da resposta for diferente de ok, lança um Erro.
      if(!response.ok) {
         throw new Error('Falha ao carregar as galerias.');
      }
      //Senão, retorna o arquivo buscado.
      return response.json();
   }).catch(error => console.log('Erro:' + error));

   //Valida os dados recebidos. *Ainda não sei se isso é realmente necessário*.
   if(!data) return (<span>Ainda não existe nehuma Galeria!</span>)

   const galerias = data.galerias;
   return(
         galerias.map(galeria =>(
         <div className="galeria">
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