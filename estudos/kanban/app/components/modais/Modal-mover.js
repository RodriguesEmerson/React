import { useState } from "react";
import { useProvidersContext } from "../../context/providers";
import { moverCard } from "@/app/logica/logica-modais/main";


export default function ModalMover({ arrLists, setLists }) {
   if (!arrLists) return;

   const {
      position,
      hiddenMoverModal, setHiddenMoverModal,
      setHiddenOptionsModal
   } = useProvidersContext();

   const nomeListaAtual = moverCard.getNomeListaAtual(arrLists);
   const listasDisponiveis = moverCard.getLists(arrLists);

   return (
      !hiddenMoverModal &&
      <div className="modal absolute  bg-white w-[276px] p-[10px] pt-2 rounded-lg"
         style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
         <h2 className="text-center !text-sm font-semibold text-gray-600 mb-3">Mover Cartão</h2>
         <span
            className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer"
            onClick={() => { setHiddenMoverModal(true) }}
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
                  onClick={() => {
                     moverCard.mover(lista.listId, arrLists, setLists);
                     setHiddenOptionsModal(true);
                     setHiddenMoverModal(true);
                  }}
               >
                  <span className="material-icons !text-lg">arrow_forward</span>
                  {lista.listName}
               </button>
            ))}
         </div>
         <SelecionarDestino listasDisponiveis={listasDisponiveis}/>
      </div>
   )
}

function SelecionarDestino({ listasDisponiveis }) {
   const [quadro, seteQuadro] = useState('To do');
   const [index, setIndex] = useState(1)
   const [showSelect, setShowSelect] = useState(false);

   //Cria uma função para pegar quantos cards tem na lista slecionadas e jogar num arry para criar
   //as options da seleção do index.
   
   return (
      <div className="flex flex-col gap-1  text-gray-60">
         <div className="flex items-center gap-1">
            <span className="text-xs font-semibold pt-[2px]">Selecionar destino</span>
         </div>
            <span className="text-xs font-bold pt-[2px]">Lista</span>
         <div className="flex flex-row gap-1">
            <div 
               className="flex items-center text-xs gap-[6px] mb-1 relative border border-gray-400 rounded-[3px] pl-2 pr-1 w-[70%] h-8 cursor-pointer justify-between"
               onClick={()=> setShowSelect(!showSelect)}
            >
               <p>{quadro}</p>
               {showSelect &&
                  <ul className="border text-[13px] border-gray-200 py-2 -ml-2 absolute rounded-md bg-white bottom-8 w-full">
                  {listasDisponiveis.map(list =>(
                     <li key={`dlM${list.id}`} className="option-modal-data  relative h-7 leading-7 pl-2 cursor-pointer hover:bg-gray-100 "
                     onClick={() => { seteQuadro(list.listName)}}
                  >
                     <span className={`w-[3px] h-full ${list.listName == quadro ? "block" : "hidden"} bg-blue-500 absolute left-0 top-0 -m-[1px]`}></span>
                     <p>{list.listName}</p>
                  </li>
                  ))}
               </ul>
               }
               <span className={`material-icons !text-base transition-all ${showSelect && "rotate-180"}`}>keyboard_arrow_up</span>
            </div>

            <div 
               className="flex items-center text-xs gap-[6px] mb-1 relative border border-gray-400 rounded-[3px] pl-2 pr-1 w-[29%] h-8 cursor-pointer justify-between"
               onClick={()=> setShowSelect(!showSelect)}
            >
               <p>{quadro}</p>
               {showSelect &&
                  <ul className="border text-[13px] border-gray-200 py-2 -ml-2 absolute rounded-md bg-white bottom-8 w-full">
                  {listasDisponiveis.map(list =>(
                     <li key={`dlM${list.id}`} className="option-modal-data  relative h-7 leading-7 pl-2 cursor-pointer hover:bg-gray-100 "
                     onClick={() => { seteQuadro(list.listName)}}
                  >
                     <span className={`w-[3px] h-full ${list.listName == quadro ? "block" : "hidden"} bg-blue-500 absolute left-0 top-0 -m-[1px]`}></span>
                     <p>{list.listName}</p>
                  </li>
                  ))}
               </ul>
               }
               <span className={`material-icons !text-base transition-all ${showSelect && "rotate-180"}`}>keyboard_arrow_up</span>
            </div>
         </div>
      </div>
   )
}