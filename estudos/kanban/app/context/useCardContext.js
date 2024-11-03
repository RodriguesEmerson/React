'use-client';
import { useState, createContext, useContext } from "react";

const cardContext = createContext();

export function CardProvider({ children }){
   const [editingCard, setEditingCard] = useState(null);
   const [cardPosition, setCardPosition] = useState(null);
   const [editingCardId, setEditingCardId] = useState(null);
   const [editingCardListId, setEditingCardListId] = useState(null);
   const [funcSaveCardChanges, setFuncSaveCardChanges] = useState(null);
   const [editingLabels, setEditingLabels] = useState();
   const [editingPeriod, setEditingPeriod] = useState();

   return(
      <cardContext.Provider
         value={{
            editingCard, setEditingCard,
            cardPosition, setCardPosition,
            editingCardId, setEditingCardId,
            editingCardListId, setEditingCardListId,
            funcSaveCardChanges, setFuncSaveCardChanges,
            editingPeriod, setEditingPeriod
         }}
      >
         { children }
      </cardContext.Provider>
   )
}
export function useCardContext(){
   return useContext(cardContext);
}