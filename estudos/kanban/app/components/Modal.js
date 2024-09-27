
import { useContext } from "react";
import { PosicaoModalContext } from "./Board";


export default function ModalEditCard(){

   const { posicaoModal, setPosicaoModal } = useContext(PosicaoModalContext);
   return(
      <div className="absolute">
         <ul className="flex gap-1 flex-col bg-gray-200">
            <li className="flex flex-row gap-2 justify-start items-center w-fit h-8 px-2 hover:bg-gray-200 transition-all cursor-pointer text-xs font-bold bg-white rounded-sm">
               <span className="material-icons-outlined !text-sm">credit_card</span>
               <p>Abrir Cartão</p>
            </li>
            <li className="flex flex-row gap-2 justify-start items-center w-fit h-8 px-2 hover:bg-gray-200 transition-all cursor-pointer text-xs font-bold bg-white rounded-sm">
               <span className="material-icons-outlined !text-sm">sell</span>
               <p>Editar Etiquetas</p>
            </li>
            <li className="flex flex-row gap-2 justify-start items-center w-fit h-8 px-2 hover:bg-gray-200 transition-all cursor-pointer text-xs font-bold bg-white rounded-sm">
               <span className="material-icons-outlined !text-sm">person</span>
               <p>Alterar Membros</p>
            </li>
            <li className="flex flex-row gap-2 justify-start items-center w-fit h-8 px-2 hover:bg-gray-200 transition-all cursor-pointer text-xs font-bold bg-white rounded-sm">
               <span className="material-icons-outlined !text-sm">web_asset</span>
               <p>Alterar Capa</p>
            </li>
            <li className="flex flex-row gap-2 justify-start items-center w-fit h-8 px-2 hover:bg-gray-200 transition-all cursor-pointer text-xs font-bold bg-white rounded-sm">
               <span className="material-icons-outlined !text-sm">calendar_month</span>
               <p>Editar Datas</p>
            </li>
            <li className="flex flex-row gap-2 justify-start items-center w-fit h-8 px-2 hover:bg-gray-200 transition-all cursor-pointer text-xs font-bold bg-white rounded-sm">
               <span className="material-icons-outlined !text-sm">arrow_right_alt</span>
               <p>Mover</p>
            </li>
            <li className="flex flex-row gap-2 justify-start items-center w-fit h-8 px-2 hover:bg-gray-200 transition-all cursor-pointer text-xs font-bold bg-white rounded-sm">
               <span className="material-icons-outlined !text-sm">content_copy</span>
               <p>Copiar</p>
            </li>
            <li className="flex flex-row gap-2 justify-start items-center w-fit h-8 px-2 hover:bg-gray-200 transition-all cursor-pointer text-xs font-bold bg-white rounded-sm">
               <span className="material-icons-outlined !text-sm">inventory_2</span>
               <p>Arquivar</p>
            </li>
         </ul>
      </div>
   )
}