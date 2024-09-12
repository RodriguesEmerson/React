import SelecaoOptions from './selecao-options'
export default function SelecaoHeader({ data }){

   let galeriasAtivas = 0;
   if(data){
      galeriasAtivas = data.galerias.length;
   }

   return(
      <div className="selecao-header">
         <div className="selecao-header-links">
            <span className="g-link galerias-ativas ativa">Galerias {`(${galeriasAtivas})`}</span>
            <span className="g-link galerias-congeladas">Galerias Congeladas {`(0)`}</span>
         </div>
         <SelecaoOptions />
      </div>
   )
}