'use client';

import { useState } from "react";


export default function SelecaoFiltro({ showModal, setShowModal, fStatus, setFStatus }){
   //SH = selecao-header;
   const [showList, setShowList] = useState('');
   const [checkedOne, setcheckedOne] = useState(true);
   const [checkedTwo, setcheckedTwo] = useState(true);
   const [checkedTree, setcheckedTree] = useState(true); 

   // Estado para armazenar os filtros pre-selecionados
   const [filtrosPreSelecionados, setFiltrosPreSelecionados] = useState(['Finalizada', 'Pendente', 'Expirada']);

   function handleLimparCheckboxs(){
      setcheckedOne(true);
      setcheckedTwo(true);
      setcheckedTree(true);
      setFiltrosPreSelecionados (['Finalizada', 'Pendente',  'Expirada']);
   }

   //Abre e fecha a lista com os filtros.
   function handleShowList(){
      setShowList(prev => (prev === '' ? 'SH-filtro-body-list-show' : ''));
   }

   function handlePreSelecionaFiltros(checkbox, setChecked, index, status){
      const newFiltros = [...filtrosPreSelecionados];
      //prev é o valor atual de checked
      setChecked(prev => !prev)
      newFiltros[index] = checkbox ?  'null' : status;

      setFiltrosPreSelecionados(newFiltros)

      console.log(newFiltros)
   }

   function handleSetFiltros(){
      setFStatus(filtrosPreSelecionados);
   }

   function handleFechaModal(){
      setcheckedOne(fStatus[0]  == 'null' ? false : true);
      setcheckedTwo(fStatus[1]  == 'null' ? false : true);
      setcheckedTree(fStatus[2] == 'null' ? false : true);
      setFiltrosPreSelecionados(fStatus);
      setShowModal('hidden');
      console.log(fStatus)
   }

   return(
      <div className={`SH-filtro-container ${showModal}`}>
         <div className={`SH-filtro`}>
            <div className="SH-filtro-header">
               <p>Filtrar por</p>
               <span 
                  className="material-icons"
                  onClick={handleFechaModal}>
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
                  <li 
                     onClick={() => handlePreSelecionaFiltros(checkedOne, setcheckedOne, 0, 'Finalizada')}
                     className="SH-filtro-body-list-options-item">
                     <input onChange={handlePreSelecionaFiltros} checked={checkedOne} type="checkbox" id="SH-filtro-checkbox-1" className="SH-filtro-checkbox hidden"></input>
                     <span className="SH-filtro-checkbox-label"></span>
                     <span className="material-icons g-Finalizada">person</span>
                     <span>Seleção filanizada</span>
               </li>
                  <li 
                     onClick={()=> handlePreSelecionaFiltros(checkedTwo, setcheckedTwo, 1, 'Pendente')}
                     className="SH-filtro-body-list-options-item">
                     <input checked={checkedTwo}  onChange={handlePreSelecionaFiltros} type="checkbox" id="SH-filtro-checkbox-2" className="SH-filtro-checkbox hidden"></input>
                     <span className="SH-filtro-checkbox-label"></span>
                     <span className="material-icons g-Pendente">person</span>
                     <span>Aguardando seleção</span>
                  </li>
                  <li 
                     onClick={()=> handlePreSelecionaFiltros(checkedTree, setcheckedTree, 2, 'Expirada')}
                     className="SH-filtro-body-list-options-item">
                     <input onChange={handlePreSelecionaFiltros} checked={checkedTree} type="checkbox" id="SH-filtro-checkbox-3" className="SH-filtro-checkbox hidden"></input>
                     <span className="SH-filtro-checkbox-label"></span>
                     <span className="material-icons g-Expirada">person</span>
                     <span>Prazo expirado</span>
                  </li>
               </ul>
            </div>
            <div className="SH-filtro-footer">
               <div onClick={handleLimparCheckboxs} className="SH-filtro-footer-limpar" type="button">
                  <span className="material-icons">close</span>
                  <span>Limpar filtro</span>
               </div>
               <input
                  onClick={handleFechaModal}
                  className="SH-filtro-footer-cancelar" type="button" value={'Cancelar'}>
               </input>
               <input 
                  onClick={()=> {handleSetFiltros(); setShowModal('hidden')}}
                  className="SH-filtro-footer-filtrar" type="button" value={'Aplicar'}>
               </input>
            </div>
         </div>
      </div>
   )
}