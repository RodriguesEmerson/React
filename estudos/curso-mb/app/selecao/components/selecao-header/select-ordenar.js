'use client'

import { useState } from "react";

let select, selectedOption;
export default function SelectOrdenar(){
   let [text, setText] = useState('Ordenar');

   function handleClickToggle(){
      select = document.querySelector('.ordenar-galerias');
      select.classList.toggle('hidden');
   }

   function handleMarkSelected(e){
      if(selectedOption){
         selectedOption.target.classList.remove('orden-selected');
      } 
      e.target.classList.add('orden-selected');
      selectedOption = e;
   }

   return(
      <div onClick={handleClickToggle} className="colum">
         <span className="ordernar">{text}</span>
         <div className="ordenar-galerias hidden">
            <span 
               onClick={(e) => 
                  {handleMarkSelected(e);
                   setText(text = "Ordenar")
                  }
               } 
               className="ordenar-galerias-option">
               Ordernar
            </span>
            <span 
               onClick={(e) => 
                  {handleMarkSelected(e);
                   setText(text = "Títlulo A-Z")
                  }
               } 
               className="ordenar-galerias-option">
               Título A-Z
            </span>
            <span 
               onClick={(e) => 
                  {handleMarkSelected(e);
                  setText(text = "Títlulo Z-A")
                  }
               } 
               className="ordenar-galerias-option">
               Título Z-A
            </span>
            <span 
               onClick={(e) => 
                  {handleMarkSelected(e);
                   setText(text = "Mais recentes")
                  }
               } 
               className="ordenar-galerias-option">
               Mais recentes
            </span>
            <span 
               onClick={(e) => 
                  {handleMarkSelected(e);
                   setText(text = "Mais Antigas")
                  }
               } 
               className="ordenar-galerias-option">
               Mais antigas
            </span>
         </div>
         <span className="material-icons">arrow_drop_down</span>
      </div>
   )
}