import { useProvidersContext } from "@/app/context/providers";
import { modalInfos } from "@/app/logica/logica-modais/main";
import { membersHandler } from "@/app/logica/logica-modais/members-handler";
import { useState } from "react";
import ModalBox from "./Modal-Box";

export default function ModalMembros() {
   const {
      projectIntegrants, setHiddenMembersModal,
   } = useProvidersContext();

   const [outMembers, setOutMembers] = useState(membersHandler.updateOutMembers(projectIntegrants));
   const cardMembers = modalInfos.getCardInfos().integrants;

   return (
      <ModalBox modalName={'Alterar Membros'} setHiddenModal={setHiddenMembersModal} >
         {(!cardMembers || cardMembers.length === 0) ? <></> :
            <div>
               <p className="text-xs font-semibold pb-1">Membros do Cartão</p>
               <ul className="flex flex-col gap-1">
                  {cardMembers.map(member => (
                     <li key={`ei${member.nome}`}
                        className="relative flex items-center gap-2 w-full p-1 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all rounded-sm"
                        title={`Remover ${member.nome}`}
                        onClick={() => { membersHandler.handleRemoveMember(member, outMembers, setOutMembers) }}
                     >
                        <div key={member.nome} className="h-7 w-7 rounded-full bg-gray-600 overflow-hidden">
                           <img src={member.avatar} className="max-w-full object-cover"></img>
                        </div>
                        <p className="text-sm">{member.nome}</p>
                        <span className="material-icons !text-sm absolute right-2">remove</span>
                     </li>
                  ))}
               </ul>
            </div>
         }
         {(!outMembers || outMembers.length === 0) ? <></> :
            <div>
               <p className="text-xs font-semibold pb-1 mt-4">Membros do Projeto</p>
               <ul className="flex flex-col gap-1">
                  {outMembers.map(member => (
                     <li key={`filteredOutMembers${member.nome}`}
                        className="relative flex items-center gap-2 w-full p-1 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all rounded-sm"
                        title={`Adicionar ${member.nome}`}
                        onClick={() => { membersHandler.handleAddMember(member, outMembers, setOutMembers) }}
                     >
                        <div key={member.nome} className="h-7 w-7 rounded-full bg-gray-600 overflow-hidden">
                           <img src={member.avatar} className="max-w-full object-cover"></img>
                        </div>
                        <p className="text-sm">{member.nome}</p>
                        <span className="material-icons !text-sm absolute right-2">add</span>
                     </li>
                  ))}
               </ul>
            </div>
         }
      </ModalBox>
   )
}