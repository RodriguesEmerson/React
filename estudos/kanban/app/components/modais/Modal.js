"use client";

import { useEffect, useRef } from "react";
import { useProvidersContext } from "../../context/providers";
import { moverCard } from "@/app/logica/logica-modais/main";
const cardsOptions = [
   {icon: 'credit_card', text: 'Abrir Cartão'},
   {icon: 'sell', text: 'Editar Etiquetas'},
   {icon: 'person', text: 'Alterar Membros'},
   {icon: 'web_asset', text: 'Alterar Capa'},
   {icon: 'calendar_month', text: 'Editar Datas'},
   {icon: 'arrow_right_alt', text: 'Mover'},
   {icon: 'content_copy', text: 'Copiar'},
   {icon: 'inventory_2', text: 'Arquivar'}
]
export default function ModalEditCard({ arrLists, setLists}){
   const { position, setPosition, hiddenOptionsModal, 
      setHiddenLabelsModal, setHiddenMembersModal,
      setHiddenCapaModal, setHiddenDataModal,
      setHiddenMoverModal, setHiddenCopiarModal,
      setHiddenOptionsModal
   } = useProvidersContext();
   const modalRef = useRef(null);
   let top = position.top;

   function handleClick(text){
      text == 'sell' && setHiddenLabelsModal(false), setHiddenMembersModal(true);
      text == 'person' && setHiddenMembersModal(false);
      text == 'web_asset' && setHiddenCapaModal(false);
      text == 'calendar_month' && setHiddenDataModal(false);
      text == 'arrow_right_alt' && setHiddenMoverModal(false);
      text == 'content_copy' && setHiddenCopiarModal(false); 
      text == 'inventory_2' && handleArquivarCard();
   }

   useEffect(()=>{
      //Ajusta o posição top do modal;
      if(modalRef.current){
         const modalHeight = modalRef.current.offsetHeight;
         const windowHeight = window.innerHeight - 10;
         if (modalHeight + top > windowHeight) { top = top - (modalHeight + top - windowHeight + 2) };
         setPosition({...position, top: top});
      }
   },[])

   function handleArquivarCard(){
      moverCard.mover(null, arrLists, setLists, null, 'arquivar');
      setHiddenOptionsModal(true);
   }

   return(
      <>
      {!hiddenOptionsModal &&
      <div 
         className="card-options absolute" 
         style={{top: `${position.top}px`, left: `${position.left}px`}}
         ref={modalRef}
      >
         <ul className="flex gap-1 flex-col">
            {cardsOptions.map(option => (
               <li 
                  key={option.icon} 
                  className="flex flex-row gap-2 justify-start items-center w-fit h-8 px-2 hover:bg-gray-200 transition-all cursor-pointer text-xs font-bold bg-white rounded-sm"
                  onClick={()=> handleClick(`${option.icon}`)}
               >
                  <span className="material-icons-outlined !text-sm">{option.icon}</span>
                  <p>{option.text}</p>
               </li>
            ))}
         </ul>
      </div>
      }
      </>
   )
}