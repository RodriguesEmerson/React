"use client";

import { createContext, useContext, useState } from "react";

const modalPositionContext = createContext();

export function ModalPosition({ children }){
   const [position, setPosition] = useState({top: '110px', left: '110px'});
   return(
      <modalPositionContext.Provider value={{position, setPosition}}>
         {children}
      </modalPositionContext.Provider>
   )
}

export function useModalPositionContex(){
   return useContext(modalPositionContext);
}