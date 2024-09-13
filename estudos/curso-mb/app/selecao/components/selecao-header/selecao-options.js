
'use client';

import { useState } from 'react';
import SelectOrdenar from './select-ordenar';

export default function SelecaoOptions( {props} ){

   const handleSearchChange = (e) =>{
      props.setSearchTerms(e.target.value);
   }

   return(
      <div className="selecao-options">
         <div className="filtros">
            <div className="colum">
               <input 
                  onChange={handleSearchChange}
                  className="filtros-search" 
                  type="text" 
                  placeholder="Buscar (nome da galeria)">
               </input>
               <span className="material-icons">search</span>
            </div>
            <div className="colum">
               <div className="filtrar-complex">Filtrar</div>
               <span className="material-icons">open_in_new</span>
            </div>
            <SelectOrdenar props={props}/>
         </div>

         <div className="btn-criar-galeria">
            <span className="material-icons-outlined">add_circle</span>
            <span>Criar galeria</span>
         </div>
      </div>
   )
}