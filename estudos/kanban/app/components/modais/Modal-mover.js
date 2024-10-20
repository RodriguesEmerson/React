import { useState } from "react";
import { useProvidersContext } from "../../context/providers";
import { moverCard } from "@/app/logica/logica-modais/main";


export default function ModalMover({ arrLists, setLists }) {
   if(!arrLists) return;
   const nomeListaAtual = moverCard.getNomeListaAtual(arrLists);
   const listasDisponiveis = moverCard.getLists(arrLists);

   const {
      position,
      hiddenMoverModal, setHiddenMoverModal,
      setHiddenOptionsModal
   } = useProvidersContext();
   return (
      !hiddenMoverModal &&
      <div className="modal absolute  bg-white w-[276px] p-[10px] pt-2 rounded-lg"
         style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
         <h2 className="text-center !text-sm font-semibold text-gray-600 mb-3">Mover Cartão</h2>
         <span
            className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer"
            onClick={() => { setHiddenMoverModal(true)}}
         >close</span>
         <div className="flex flex-col gap-1  text-gray-60 mb-4">
            <div className="flex items-center gap-1">
               <span className="material-icons-outlined rotate-180 !text-base">wb_incandescent</span>
               <span className="text-xs font-semibold pt-[2px]">Sugeridas</span>
            </div>
            {listasDisponiveis.map(lista => (
               lista.listName != nomeListaAtual &&
               <button
                  className="flex items-center gap-1 text-[13px] font-semibold h-9 pl-3 bg-gray-100 rounded-sm hover:bg-gray-200 transition-all"
                  key={`btnList${lista.listId}`}
                  type="button"
                  data-listref-id={lista.listId}
                  onClick={()=> {
                     moverCard.mover(lista.listId, arrLists, setLists); 
                     setHiddenOptionsModal(true);
                     setHiddenMoverModal(true)
                  }}
               >
                  <span className="material-icons !text-lg">arrow_forward</span>
                  {lista.listName}
               </button>
            ))}
         </div>
         <div className="flex flex-col gap-1  text-gray-60">
            <div className="flex items-center gap-1">
               <span className="text-xs font-semibold pt-[2px]">Selecionar destino</span>
            </div>

         </div>
      </div>
   )
}