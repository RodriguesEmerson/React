import './news-dados.css';

export default function NewsDados({ tipo }){

   return(
      <div className="news-box">
         <div className="news-box-header">
            {tipo == "galerias" ? 
               <span className="span news-box-button">Galerias</span>
            :
               <span>Notificações</span>
            }
            
            {/*Opção apenas para galerias*/}
            {tipo == "galerias" ? <span className="span album-button">Álbuns</span> : ""}
            <a href="">Ver mais</a>
         </div>
         <div className="news-box-body">
            <ListaGalerias tipo = { tipo }/>
         </div> 

      </div>
   )
} 

async function ListaGalerias({ tipo }){

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

   if(tipo == "galerias"){
      const galerias = data.galerias;
      return(
         <ul className='news-box-lista'> 
         {galerias.map((galeria) => (
            <li key={galeria.id} className='news-box-link' id={galeria.id}>
                  <div className='news-box-thumb'>
                     <img src={galeria.thumbImage}></img>
                  </div>
                  <div className='news-box-infos'>
                     <a href='' className='news-box-nome'>{galeria.titulo}</a>
                     <span className='news-box-data'>{dataExt(galeria.data)}</span>
                  </div>
            </li>
         ))}
         </ul>
      )
   }
   
   const notificacoes = data.notificacoes;
   return(
      <ul className='news-box-lista'> 
      {notificacoes.map((noti) => (
         <li key={noti.id} className='news-box-link news-box-noti' id={noti.id}>
               <div className='news-box-thumb news-box-leter'>
                  <span >{noti.leter}</span>
               </div>
               <div className='news-box-infos'>
                  <a href='' className='news-box-nome'>{noti.content}</a>
                  <span className='news-box-data'>{dataExt(noti.data)}</span>
               </div>
         </li>
      ))}
      </ul>
   )
    
}