"use client";

import { createContext, useContext, useState } from "react";

const providersContext = createContext();

export function Providers({ children }){
   const [position, setPosition] = useState({top: '0px', left: '0px'}); //Posiciona o modal de opções dos Cards.
   const [hiddenOptionsModal, setHiddenOptionsModal] = useState(true);  //Toggle hidden no modal.

   return(
      <providersContext.Provider 
         value={
            {
               position, setPosition, 
               hiddenOptionsModal, setHiddenOptionsModal
            }
         }>
         {children}
      </providersContext.Provider>
   )
}

export function useProvidersContext(){
   return useContext(providersContext);
}