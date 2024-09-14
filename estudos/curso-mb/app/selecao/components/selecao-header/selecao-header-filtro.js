'use client';

import { useState } from "react";

export default function SelecaoFiltro({ showModal, setShowModal }){
   //SH = selecao-header;

   const [showList, setShowList] = useState('');

   function handleShowList(){
      if(showList == "") return setShowList('SH-filtro-body-list-show');
      return setShowList('');
   }

   return(
      <divc className={`SH-filtro-container ${showModal}`}>
         <div className={`SH-filtro`}>
            <div className="SH-filtro-header">
               <p>Filtrar por</p>
               <span 
                  className="material-icons"
                  onClick={() => setShowModal('hidden')}>
                  close
               </span>
            </div>
            <div className="SH-filtro-body">
               <div 
                  className={`SH-filtro-body-list ${showList}`}
                  onClick={handleShowList}>
                  <div>
                     <p>Status da galeria</p>
                     <span className="material-icons">keyboard_arrow_down</span>
                  </div>
                  <ul className="SH-filtro-body-list-options">
                     <li className="SH-filtro-body-list-options-item">
                        <input type="checkbox" id="SH-filtro-checkbox-1" className="hidden"></input>
                        <labal htmlFor="SH-filtro-checkbox-1" className="SH-filtro-checkbox-label"></labal>
                        <span className="material-icons g-Finalizada">person</span>
                        <span>Seleção filanizada</span>
                     </li>
                     <li className="SH-filtro-body-list-options-item">
                        <input type="checkbox" id="SH-filtro-checkbox-2" className="hidden"></input>
                        <labal htmlFor="SH-filtro-checkbox-2" className="SH-filtro-checkbox-label"></labal>
                        <span className="material-icons g-Pendente">person</span>
                        <span>Aguardando seleção</span>
                     </li>
                     <li className="SH-filtro-body-list-options-item">
                        <input type="checkbox" id="SH-filtro-checkbox-3" className="hidden"></input>
                        <labal htmlFor="SH-filtro-checkbox-3" className="SH-filtro-checkbox-label"></labal>
                        <span className="material-icons g-Expirada">person</span>
                        <span>Prazo expirado</span>
                     </li>
                  </ul>
               </div>
            </div>
            <div className="SH-filtro-body">
            </div>
         </div>
      </divc>
   )
}