'use client'

export default function SelectOrdenar(){
   let select;
   function handleClickToggle(){
      select = document.querySelector('.ordenar-galerias');
      select.classList.toggle('hidden');
   }

   function handleClickSelect({ text }){
      
   }

   return(
      <div onClick={handleClickToggle} className="colum">
         <span className="ordernar">Ordernar</span>
         <div className="ordenar-galerias hidden">
            <span className="ordenar-galerias-option">Ordernar</span>
            <span className="ordenar-galerias-option">Título A-Z</span>
            <span className="ordenar-galerias-option">Título Z-A</span>
            <span className="ordenar-galerias-option">Mais recentes</span>
            <span className="ordenar-galerias-option">Mais antigas</span>
         </div>
         <span className="material-icons">arrow_drop_down</span>
      </div>
   )
}