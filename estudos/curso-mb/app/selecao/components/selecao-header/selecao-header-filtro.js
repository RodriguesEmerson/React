'use client';

import { useState } from "react";
let filtrosPreSelecionados = [null, null, null];

export default function SelecaoFiltro({ showModal, setShowModal, fStatus, setFStatus }){
   //SH = selecao-header;

   const [showList, setShowList] = useState('');
   const [checkedOne, setcheckedOne] = useState(false);
   const [checkedTwo, setcheckedTwo] = useState(false);
   const [checkedTeee, setcheckedTeee] = useState(false); 

   function handleLimparCheckboxs(){
      setcheckedOne(false);
      setcheckedTwo(false);
      setcheckedTeee(false);
      filtrosPreSelecionados = ['Finalizada', 'Pendente',  'Expirada']
   }

   function handleShowList(){
      if(showList == '') return setShowList('SH-filtro-body-list-show');
      return setShowList('');
   }

   function handlePreSelecionaFiltros(checkbox, setChecked, index, status){
         if(!checkbox){
            setChecked(true);
            filtrosPreSelecionados[index] = status;
            console.log(filtrosPreSelecionados)
            return;
         }
         setChecked(false);
         filtrosPreSelecionados[index] = null;
         console.log(filtrosPreSelecionados)  
   }

   function handleSetFiltros(){
      console.log(filtrosPreSelecionados)
      setFStatus(filtrosPreSelecionados)
   }

   return(
      <div className={`SH-filtro-container ${showModal}`}>
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
                     onClick={()=> handlePreSelecionaFiltros(checkedTeee, setcheckedTeee, 2, 'Expirada')}
                     className="SH-filtro-body-list-options-item">
                     <input onChange={handlePreSelecionaFiltros} checked={checkedTeee} type="checkbox" id="SH-filtro-checkbox-3" className="SH-filtro-checkbox hidden"></input>
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
                  onClick={() => setShowModal('hidden')}
                  className="SH-filtro-footer-cancelar" type="button" value={'Cancelar'}>
               </input>
               <input 
                  onClick={()=> {handleSetFiltros(); setShowModal('hidden')}}
                  className="SH-filtro-footer-filtrar" type="button" value={'Filtar'}>
               </input>
            </div>
         </div>
      </div>
   )
}