import { moverCard } from "@/app/logica/logica-modais/mover-card";
import { useEffect, useState } from "react";
import { useProvidersContext } from "../../context/providers";
import { ButtonSaveDefault } from "../buttons";
import Select from "../select";
import ModalBox from "./Modal-Box";

export default function ModalMover({ arrLists, setLists }) {
   if (!arrLists) return;
   const {
      setHiddenMoverModal,
      setHiddenOptionsModal
   } = useProvidersContext();

   const nomeListaAtual = moverCard.getNomeListaAtual(arrLists);
   const listasDisponiveis = moverCard.getLists(arrLists);
   let maxListasSugeridas = 3;

   function handleClickMoverCard(idListDestino, indexDestino,) {
      moverCard.mover(idListDestino, arrLists, setLists, indexDestino);
      setHiddenMoverModal(true), setHiddenOptionsModal(true);
   }

   return (
      <ModalBox modalName={'Mover Cartão'} setHiddenModal={setHiddenMoverModal}>
         <div className="flex flex-col gap-1  text-gray-60 mb-4">
            <div className="flex items-center gap-1">
               <span className="material-icons-outlined rotate-180 !text-base">wb_incandescent</span>
               <span className="text-xs font-semibold pt-[2px]">Sugeridas</span>
            </div>
            {listasDisponiveis.map(lista => (
               (lista.listName != nomeListaAtual && maxListasSugeridas-- > 0) &&
               (<button
                  className="flex items-center gap-1 text-[13px] font-semibold h-9 pl-3 bg-gray-100 rounded-sm hover:bg-gray-200 transition-all"
                  key={`btnList${lista.listId}`}
                  type="button"
                  data-listref-id={lista.listId}
                  onClick={(e) => { handleClickMoverCard(lista.listId) }}
               >
                  <span className="material-icons !text-lg">arrow_forward</span>
                  {lista.listName}
               </button>)
            ))}
         </div>
         <SelecionarDestino
            listasDisponiveis={listasDisponiveis}
            handleClickMoverCard={handleClickMoverCard}
            fieldName={'Selecionar destino'}
            buttonValue={'Mover'}
         />
      </ModalBox>
   )
}

function SelecionarDestino({ listasDisponiveis, handleClickMoverCard, fieldName, buttonValue }) {
   const [options, setOptions] = useState(listasDisponiveis[0]);
   const [index, setIndex] = useState(1);
   const [destino, setDestino] = useState({ listName: options.listName, listId: options.listId, index: index });

   useEffect(() => {
      options.listId != destino.listId && (setIndex(1));
      setDestino({ listName: options.listName, listId: options.listId, index: index });
   }, [options, index])

   function handleClickMoverCardFull() {
      handleClickMoverCard(destino.listId, destino.index);
   }

   return (
      <div className="flex flex-col gap-1  text-gray-60">
         <div className="flex items-center gap-1">
            <span className="text-xs font-semibold pt-[2px]">{fieldName}</span>
         </div>
         <div className="flex flex-rows justify-between pr-6">
            <span className="text-xs font-bold pt-[2px]">Lista</span>
            <span className="text-xs font-bold pt-[2px]">Posição</span>
         </div>

         <div className="flex flex-row gap-1">
            <Select option={destino.listName} setOptions={setOptions} optionList={listasDisponiveis} chave={"listName"} width={'70%'} />
            <Select option={destino.index} setOptions={setIndex} optionList={options.index} chave={"index"} width={'29%'} />
         </div>

         <ButtonSaveDefault
            type={'submit'}
            value={buttonValue}
            width={'50%'}
            handleClick={handleClickMoverCardFull}
         />
      </div>
   )
}


export { SelecionarDestino };
