import { useProvidersContext } from "@/app/context/providers";
import { editIntegrants, modalInfos } from "@/app/logica/logica-modais/main";
import { useEffect, useState } from "react";

export default function ModalMembros() {
   const {
      position,
      projectIntegrants,
      hiddenMembersModal, setHiddenMembersModal,
   } = useProvidersContext();

   const [outIntegrants, setOutIntegrants] = useState();
   const cardInfos = modalInfos.getCardInfos();
   const integrants = cardInfos.integrants;

   function handleChangeMembers(integrant, action){
      if(action ==  'remove'){
         //Remove o membro clicado e envia o array já filtrado para a função.
         editIntegrants.setIntegrants([...integrants].filter(int => int.nome != integrant.nome));
         //Para o modal não dar uma 'piscada' ao alterar os membros.
         setOutIntegrants([...outIntegrants, integrant]);
         return;
      }

      editIntegrants.setIntegrants([...integrants, integrant]);
      setOutIntegrants([...outIntegrants].filter(int => int.nome != integrant.nome));
   }

   useEffect(() => {
      if (integrants) {
         //retorna se não haver nenhum integrante no card.
         if (integrants.length === 0) return setOutIntegrants(projectIntegrants);

         //Cria um objeto contendo todos os nomes dos integrantes do projeto.
         const editNames = new Set(integrants.map(integrant => integrant.nome));

         //Filtra os integrantes do projeto que não estão no card.
         const filteredOutIntegrants = projectIntegrants.filter(integrant => !editNames.has(integrant.nome));
         setOutIntegrants(filteredOutIntegrants);
      }
   }, [integrants]);

   return (
      <>
      {!hiddenMembersModal &&
         <div className="modal relative bg-white w-64 rounded-lg text-[13px] p-2 pt-4 text-gray-600"
            style={{ top: `${position.top > 370 ? 465 : position.top + 108}px`, left: `${position.left}px` }}
         >
            <h2 className="text-center font-semibold mb-4">Alterar Membros</h2>
            <span
               className="material-icons !text-base absolute top-1 right-2 cursor-pointer"
               onClick={() => { setHiddenMembersModal(true) }}
            >close</span>
            {(!integrants || integrants.length === 0) ? <></> :
               <div>
                  <p className="text-xs font-semibold pb-1">Membros do Cartão</p>
                  <ul className="flex flex-col gap-1">
                     {integrants.map(integrant => (
                        <li key={`ei${integrant.nome}`}
                           className="relative flex items-center gap-2 w-full p-1 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all rounded-sm"
                           title={`Remover ${integrant.nome}`}
                           onClick={() => { handleChangeMembers(integrant, 'remove') }}
                        >
                           <div key={integrant.nome} className="h-7 w-7 rounded-full bg-gray-600 overflow-hidden">
                              <img src={integrant.avatar} className="max-w-full object-cover"></img>
                           </div>
                           <p>{integrant.nome}</p>
                           <span className="material-icons !text-sm absolute right-2">remove</span>
                        </li>
                     ))}
                  </ul>
               </div>
            }
            {(!outIntegrants || outIntegrants.length === 0) ? <></> :
               <div>
                  <p className="text-xs font-semibold pb-1 mt-4">Membros do Projeto</p>
                  <ul className="flex flex-col gap-1">
                     {outIntegrants.map(integrant => (
                        <li key={`filteredOutIntegrants${integrant.nome}`}
                           className="relative flex items-center gap-2 w-full p-1 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all rounded-sm"
                           title={`Adicionar ${integrant.nome}`}
                           onClick={() => { handleChangeMembers(integrant, 'add') }}
                        >
                           <div key={integrant.nome} className="h-7 w-7 rounded-full bg-gray-600 overflow-hidden">
                              <img src={integrant.avatar} className="max-w-full object-cover"></img>
                           </div>
                           <p>{integrant.nome}</p>
                           <span className="material-icons !text-sm absolute right-2">add</span>
                        </li>
                     ))}
                  </ul>
               </div>
            }
         </div>
      }
      </>
   )
}