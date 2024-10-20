"use client";

import { createContext, useContext, useState } from "react";

const providersContext = createContext();

export function Providers({ children }){
   const [position, setPosition] = useState({top: '0px', left: '0px'}); //Posiciona o modal de opções dos Cards.
   const [hiddenOptionsModal, setHiddenOptionsModal] = useState(true);  //Toggle hidden no modal de opções dos Cards.
   const [hiddenLabelsModal, setHiddenLabelsModal] = useState(true);    //Toggle hidden no modal de labels.
   const [hiddenMembersModal, setHiddenMembersModal] = useState(true);  //Toggle hidden no modal de membros.
   const [hiddenCapaModal, setHiddenCapaModal] = useState(true);        //Toggle hidden no modal Capas.
   const [hiddenDataModal, setHiddenDataModal] = useState(true);        //Toggle hidden no modal Datas.
   const [hiddenMoverModal, setHiddenMoverModal] = useState(true);        //Toggle hidden no modal Datas.
   const [projectIntegrants, setProjectIntegrants] = useState([]);      //Integrantes do projeto aberto.
   const [projectId, setProjectId] = useState();

   return(
      <providersContext.Provider 
         value={
            {
               position, setPosition, 
               hiddenOptionsModal, setHiddenOptionsModal,
               hiddenLabelsModal, setHiddenLabelsModal,
               hiddenMembersModal, setHiddenMembersModal,
               hiddenCapaModal, setHiddenCapaModal,
               hiddenDataModal, setHiddenDataModal,
               projectIntegrants, setProjectIntegrants,
               hiddenMoverModal, setHiddenMoverModal,
               projectId, setProjectId,
            }
         }>
         {children}
      </providersContext.Provider>
   )
}

export function useProvidersContext(){
   return useContext(providersContext);
}