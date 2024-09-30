"use client";

import { createContext, useContext, useState } from "react";

const providersContext = createContext();

export function Providers({ children }){
   const [position, setPosition] = useState({top: '0px', left: '0px'}); //Posiciona o modal de opções dos Cards.
   const [hiddenOptionsModal, setHiddenOptionsModal] = useState(true);  //Toggle hidden no modal de opções dos Cards.
   const [hiddenLabelsModal, setHiddenLabelsModal] = useState(false);     //Toggle hidden no modal de labels.

   return(
      <providersContext.Provider 
         value={
            {
               position, setPosition, 
               hiddenOptionsModal, setHiddenOptionsModal,
               hiddenLabelsModal, setHiddenLabelsModal
            }
         }>
         {children}
      </providersContext.Provider>
   )
}

export function useProvidersContext(){
   return useContext(providersContext);
}