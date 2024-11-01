'use-client'

import { useState, createContext, useContext } from "react";
const coverContext = createContext(null);

export function CoverProvider({ children }) {
   const [cover, setCover] = useState(null);

   return (
      <coverContext.Provider
         value={{
            cover, setCover
         }}>
         { children }
      </coverContext.Provider>
   )
}

export function useCoverContext(){
   return useContext(coverContext)
}