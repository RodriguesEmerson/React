import './selecao.css';
import MarcarPaginaSelecionada from '../components/marcarLink';
import SelecaoHeader from './components/selecao-header';

export default function Selecao() { 

   return (
      <>
         <main className="container">
            <MarcarPaginaSelecionada item="image"/>
            <span className="page-title">Galerias Ativas</span>
            <selction className="selecao-content">
            <SelecaoHeader />

            </selction>

         </main>
         <footer className="footer">

         </footer>
      </>
   );
}




