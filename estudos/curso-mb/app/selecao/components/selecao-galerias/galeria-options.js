'use client';
import { useState } from "react";
export default function GaleriaOptions(){

   let [hidden, setHidden] = useState('hidden');

   function handleMostarOptions(){
      if(hidden == 'hidden'){
         return setHidden(hidden = '')
      } 
      return setHidden(hidden = 'hidden');
   }

   return(
      <div className="galeria-options">
         <div onClick={handleMostarOptions} className="galeria-option-icon">
            <span className="material-icons">more_horiz</span>
         </div>
         <div className={`galeria-options-list select ${hidden}`}>
            <div className="select-option">
                  <span className="material-icons">edit</span>
                  <span>Editar galeria</span>
            </div>
            <div className="select-option">
                  <span className="material-icons">delete</span>
                  <span>Excluir galeria</span>
            </div>
            <div className="select-option">
                  <span className="material-icons">sell</span>
                  <span>Etiquetas</span>
            </div>
         </div>
      </div>
   )
}