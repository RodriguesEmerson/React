import SelecaoOptions from './selecao-options'
export default function SelecaoHeader( props ){
   const data = props.data;
   let galeriasAtivas = 0;
   if(data){
      galeriasAtivas = data.length;
   }

   return(
      <div className="selecao-header">
         <div className="selecao-header-links">
            <span className="g-link galerias-ativas ativa">Galerias {`(${galeriasAtivas})`}</span>
            <span className="g-link galerias-congeladas">Galerias Congeladas {`(0)`}</span>
         </div>
         <SelecaoOptions props={props}/>
      </div>
   )
}