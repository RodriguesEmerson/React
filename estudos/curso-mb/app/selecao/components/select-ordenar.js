'use client'

import { useState } from "react";

export default function SelectOrdenar(){
   let select;
   let [text, setText] = useState('Ordenar');

   function handleClickToggle(){
      select = document.querySelector('.ordenar-galerias');
      select.classList.toggle('hidden');
   }

   function handleMarkSelected(e){
      e.target.classList.add('oden-selected');
   }

   return(
      <div onClick={handleClickToggle} className="colum">
         <span className="ordernar">{text}</span>
         <div className="ordenar-galerias hidden">
            <span 
               onClick={() => setText(text = "Ordenar")} 
               className="ordenar-galerias-option">
               Ordernar
            </span>
            <span 
               onClick={() => 
                  setText(text = "Títlulo A-Z") -
                  handleMarkSelected
               } 
               className="ordenar-galerias-option">
               Título A-Z
            </span>
            <span 
              onClick={() => setText(text = "Títlulo Z-A")}
               className="ordenar-galerias-option">
               Título Z-A
            </span>
            <span 
               onClick={() => setText(text = "Mais recentes")}
               className="ordenar-galerias-option">
               Mais recentes
            </span>
            <span 
               onClick={() => setText(text = "Mais antigas")} 
               className="ordenar-galerias-option">
               Mais antigas
            </span>
         </div>
         <span className="material-icons">arrow_drop_down</span>
      </div>
   )
}