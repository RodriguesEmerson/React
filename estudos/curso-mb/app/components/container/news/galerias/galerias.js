import './galerias.css';

export default function Galerias(){
   return(
      <div className="galerias">
         <div className="galeria-header">
            <span className="galeria-button">Galerias</span>
            <span className="album-button">Álbuns</span>
            <a href="">Ver mais</a>
         </div>
         <div className="galeria-body">
            <ListaGalerias />
         </div>

      </div>
   )
} 

async function ListaGalerias(){

   function dataExt(galeriaData){
      const dat = new Date(galeriaData).toLocaleDateString('pt-br', {day: '2-digit', month: 'long', year: 'numeric'});
      return dat;
   }

   const data = await fetch('http://localhost:3000/db/db.json', 
      {
         method: 'GET',
         cache: 'no-store' //Impede de trazer dados em cache --'antigos';
      }
   ).then(response =>{
      if(!response.ok){
         throw new Error('Falha ao carregar o arquivo.')
      }
      return response.json();
   }).catch(error => console.log('Erro: ' + error))
      
   //Valida os dados recebidos   
   if(!data) return <span>Ainda não existe galerias!</span>;  
   const galerias = data.galerias;
   return(
      <ul className='lista-de-galerias'> 
      {galerias.map((galeria) => (
         <li key={galeria.id} className='galeria-link' id={galeria.id}>
            <a href="">
               <div className='galeria-thumb'>
                  <img src={galeria.thumbImage}></img>
               </div>
               <div className='galeria-infos'>
                  <span className='galeria-nome'>{(galeria.titulo).toUpperCase()}</span>
                  <span className='galeria-data'>{dataExt(galeria.data)}</span>
               </div>
            </a>
         </li>
      ))}
      </ul>
   )
    
}