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
                  className={`SH-filtro-body-list`}
                  onClick={handleShowList}>
                  <div>
                     <p>Status da galeria</p>
                     <span className="material-icons">keyboard_arrow_down</span>
                  </div>
               </div>
               <ul className={`SH-filtro-body-list-options ${showList}`}>
                  <li className="SH-filtro-body-list-options-item">
                     <label htmlForfor="SH-filtro-checkbox-1">
                        <input type="checkbox" id="SH-filtro-checkbox-1" className="SH-filtro-checkbox hidden"></input>
                        <span className="SH-filtro-checkbox-label"></span>
                        <span className="material-icons g-Finalizada">person</span>
                        <span>Seleção filanizada</span>
                     </label>
                  </li>
                  <li className="SH-filtro-body-list-options-item">
                     <label htmlForfor="SH-filtro-checkbox-2">
                        <input type="checkbox" id="SH-filtro-checkbox-2" className="SH-filtro-checkbox hidden"></input>
                        <span className="SH-filtro-checkbox-label"></span>
                        <span className="material-icons g-Pendente">person</span>
                        <span>Aguardando seleção</span>
                     </label>
                  </li>
                  <li className="SH-filtro-body-list-options-item">
                     <label htmlFor="SH-filtro-checkbox-3">
                        <input type="checkbox" id="SH-filtro-checkbox-3" className="SH-filtro-checkbox hidden"></input>
                        <span className="SH-filtro-checkbox-label"></span>
                        <span className="material-icons g-Expirada">person</span>
                        <span>Prazo expirado</span>
                     </label>
                  </li>
               </ul>
            </div>
            <div className="SH-filtro-footer">
               <div className="SH-filtro-footer-limpar" type="button">
                  <span className="material-icons">close</span>
                  <span>Limpar filtro</span>
               </div>
               <input className="SH-filtro-footer-cancelar" type="button" value={'Cancelar'}></input>
               <input className="SH-filtro-footer-filtrar" type="button" value={'Filtar'}></input>
            </div>
         </div>
      </divc>
   )
}