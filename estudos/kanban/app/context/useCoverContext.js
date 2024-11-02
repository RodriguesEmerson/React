'use-client'

import { useState, createContext, useContext } from "react";
const coverContext = createContext(null);

export function CoverProvider({ children }) {
   const [cover, setCover] = useState(null);
   const [coverStyle, setCoverStyle] = useState(null);

   return (
      <coverContext.Provider
         value={{
            cover, setCover,
            coverStyle, setCoverStyle
         }}>
         { children }
      </coverContext.Provider>
   )
}

export function useCoverContext(){
   return useContext(coverContext)
}