import './selecao.css';
import MarcarPaginaSelecionada from '../components/marcarLink';
import SelecaoContent from './components/selecao-content'
export default async function Selecao() { 

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

   return (
      <>
         <main className="container">
            <MarcarPaginaSelecionada item="image"/>
            <span className="page-title">Galerias Ativas</span>
            <SelecaoContent data={data.galerias} />
         </main>
         <footer className="footer">

         </footer>
      </>
   );
}




