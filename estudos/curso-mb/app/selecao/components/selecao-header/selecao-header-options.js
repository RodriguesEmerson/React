
'use client';

import { useState } from 'react';
import SelectOrdenar from './select-header-ordenar';
import SelecaoFiltro from './selecao-header-filtro';

export default function SelecaoOptions({ props }){


   const handleSearchChange = (e) =>{
      props.setSearchTerms(e.target.value);
   }

   //Ação para mostrar e esconder o modal de filtros.
   const [showModal, setShowModal] = useState('hidden')

   return(
      <div className="selecao-options">
         <SelecaoFiltro 
            showModal={showModal} 
            setShowModal={setShowModal}
            fStatus={props.fStatus}
            setFStatus={props.setFStatus}
         />            
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
            <div onClick={() => setShowModal('')} className="colum">
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