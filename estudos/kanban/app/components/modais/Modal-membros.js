import { useProvidersContext } from "@/app/context/providers";
import { editIntegrants } from "@/app/logica/logica-modais/main";
import { useState } from "react";

export default function ModalMembros(){
   const { position, projectIntegrants } = useProvidersContext();
   const editingIntegrants = editIntegrants.integrants();
   const [integrants, setIntegrants] = useState();

   return(
      <div className="relative bg-white w-64 rounded-lg text-[13px] p-2 pt-4 text-gray-600">
         <h2 className="text-center font-semibold mb-4">Alterar Membros</h2>
         <span
            className="material-icons !text-base absolute top-1 right-2 cursor-pointer"
            onClick={() => {}}
         >close</span>
         <div>
            <p className="text-xs font-semibold pb-1">Membros do Cartão</p>
            <ul className="flex flex-col gap-1">
               {editingIntegrants.map(integrant => (
                  <li key={`ei${integrant.nome}`}
                     className="relative flex items-center gap-2 w-full p-1 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all rounded-sm">
                     <div key={integrant.nome} className="h-7 w-7 rounded-full bg-gray-600 overflow-hidden">
                        <img src={integrant.avatar} className="max-w-full object-cover"></img>
                     </div>
                     <p>{integrant.nome}</p>
                     <span className="material-icons !text-sm absolute right-2">remove</span>
                  </li>
               ))}
            </ul>
         </div>
         {projectIntegrants.length > 0 &&
         <div>
            <p className="text-xs font-semibold pb-1">Membros do Quadro</p>
            <ul className="flex flex-col gap-1">
               {projectIntegrants.map(integrant => (
                  <li key={`pi${integrant.nome}`}
                     className="relative flex items-center gap-2 w-full p-1 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all rounded-sm">
                     <div key={integrant.nome} className="h-7 w-7 rounded-full bg-gray-600 overflow-hidden">
                        <img src={integrant.avatar} className="max-w-full object-cover"></img>
                     </div>
                     <p>{integrant.nome}</p>
                     <span className="material-icons !text-sm absolute right-2">add</span>
                  </li>
                  ) 
               )}
            </ul>
         </div>
         }
      </div>
   )
}