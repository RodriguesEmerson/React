import ModalBox from "./Modal-Box";
import { useProvidersContext } from "@/app/context/providers";
import { modalInfos, moverCard } from "@/app/logica/logica-modais/main";
import { SelecionarDestino } from "./Modal-mover";
import { useEffect, useRef, useState } from "react";

export default function ModalCopiar({ arrLists, setLists}){

   const { setHiddenCopiarModal, setHiddenOptionsModal  } = useProvidersContext();
   const cardInfos = modalInfos.getCardInfos();
   const [texto, setTexto] = useState(cardInfos.content);
   const listasDisponiveis = moverCard.getLists(arrLists);

   function handleEditingText(e){
      const textArea = textAreaRef.current;
      setTexto(e.target.value);
      textArea.style.height = `${textArea.scrollHeight}px`
   }
   
   function handleClickCopiar(idListDestino, indexDestino, acao = 'copiar'){
      moverCard.mover(idListDestino, arrLists, setLists, indexDestino, acao, texto);
      setHiddenCopiarModal(true); setHiddenOptionsModal(true);
      moverCard.hiddenModal()
   }
   
   const textAreaRef = useRef(null);
   useEffect(()=>{
      textAreaRef.current.select();
      textAreaRef.current.focus();
   },[])

   return (
      <ModalBox modalName={'Copiar Cartão'} setHiddenModal={setHiddenCopiarModal}>
         <div>
            <p className="text-xs font-semibold pb-1 text-gray-600">Texto do cartão</p>
            <textarea 
               id={"editing-card-text"} 
               ref={textAreaRef}
               className="outline-none min-h-14 overflow-hidden p-2 resize-none text-sm border  border-gray-500 rounded-md w-full max-w-full focus-within:border-blue-500 focus-within:border-2 focus-within:p-[7px]" 
               autoFocus 
               name="texto" 
               placeholder="Insira um texto"
               value={texto}
               onChange={(e)=> handleEditingText(e)}
            >
            </textarea>
         </div>
         <SelecionarDestino  
            listasDisponiveis={listasDisponiveis}
            handleClickMover={handleClickCopiar}
            fieldName={'Copiar para...'}
            buttonValue={'Copiar'}
         />
      </ModalBox>
   )
}