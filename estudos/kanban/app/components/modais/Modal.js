"use client";

import { useProvidersContext } from "../../context/providers";

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

export default function ModalEditCard(){
   const { position, hiddenOptionsModal, 
      setHiddenLabelsModal, setHiddenMembersModal,
      setHiddenCapaModal
   } = useProvidersContext();

   function handleClick(text){
      text == 'sell' && setHiddenLabelsModal(false), setHiddenMembersModal(true);
      text == 'person' && setHiddenMembersModal(false);
      text == 'web_asset' && setHiddenCapaModal(false);
   }

   return(
      <>
      {!hiddenOptionsModal &&
      <div className="card-options absolute" style={{top: `${position.top}px`, left: `${position.left}px`}}>
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