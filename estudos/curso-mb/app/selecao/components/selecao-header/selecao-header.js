import SelecaoOptions from './selecao-options'
export default function SelecaoHeader(){
   return(
      <div className="selecao-header">
         <div className="selecao-header-links">
            <span className="g-link galerias-ativas ativa">Galerias Ativas 0</span>
            <span className="g-link galerias-congeladas">Galerias Congeladas 0</span>
         </div>
         <SelecaoOptions />
      </div>
   )
}