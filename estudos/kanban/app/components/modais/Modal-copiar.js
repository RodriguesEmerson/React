import ModalBox from "./Modal-Box";
import { useProvidersContext } from "@/app/context/providers";
import Select from "../select";

export default function ModalCopiar({ arrLists, setLists}){

   const { setHiddenCopiarModal } = useProvidersContext();

   function handleAjustHeight(e){
      const textArea = e.target;
      textArea.style.height = `${textArea.scrollHeight}px`
   }

   return (
      <ModalBox modalName={'Copiar Cartão'} setHiddenModal={setHiddenCopiarModal}>
         <div>
            <p className="text-xs font-semibold pb-1 text-gray-600">Texto do cartão</p>
            <textarea 
               id={"editing-card-text"} 
               className="outline-none min-h-14 overflow-hidden p-2 resize-none text-sm outline outline-1 outline-gray-500 rounded-md w-full focus-within:outline-blue-500 focus-within:outline-2" 
               name="texto" 
               placeholder="Insira um texto"
               onChange={(e)=> handleAjustHeight(e)}
            >

            </textarea>
         </div>
      </ModalBox>
   )
}