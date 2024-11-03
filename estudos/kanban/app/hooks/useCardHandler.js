'use-client';
import { useCardContext } from "../context/useCardContext";
import { useProvidersContext } from "../context/providers";
import { useEffect, useState } from "react";
export default function useCardHandler(){
   const { 
      projectId, hiddenOptionsModal, 
      setHiddenOptionsModal, setHiddenLabelsModal, 
      setHiddenMembersModal, setHiddenCapaModal, 
      setHiddenDataModal, setHiddenMoverModal 
   } = useProvidersContext();
   const {
      editingCard, setCardPosition, 
      setEditingCardId, setEditingCardListId, 
      funcSaveCardChanges, setEditingCard
   } = useCardContext();
   const [isEditingCard, setIsEditingCard] = useState();
   
   useEffect(()=>{
      (isEditingCard && hiddenOptionsModal) && (cardHandler.turnOffEditingCardMode());
      (isEditingCard && funcSaveCardChanges) && funcSaveCardChanges(editingCard);
   },[hiddenOptionsModal, editingCard])
   
   const cardHandler = {
      setCardInformations: function (e, cardInfos) {
         const card = e.target.closest('.card');
         setEditingCard(cardInfos)
         setEditingCardId(card.getAttribute('id'));
         setEditingCardListId(e.target.closest('.list').getAttribute('id'));
         this.cardPosition(e);
         this.turnOnEditingCardgMode(card);
      },

      cardPosition: function(e){
         const card = e.target.closest('.card');
         let scrollCompensation = e.target.closest('.dragableArea').scrollTop;
         const left = card.offsetLeft + card.offsetWidth + 5;
         let top = card.offsetTop - scrollCompensation;

         setCardPosition({ top: top, left: left });
      },

      turnOnEditingCardgMode: function(){
         setIsEditingCard(true);
      },
      turnOffEditingCardMode: function(){
         setIsEditingCard(false);
      },
   
      hiddenModal: function (e) {
         try {
            const cardsOptions = e.target.closest('.card-options');
            const modal = e.target.closest('.modal');
            
            //Checa se foi clicado em algum modal.
            if (cardsOptions || modal) {
               return;
            }
            setHiddenOptionsModal(true);
            setHiddenLabelsModal(true);
            setHiddenMembersModal(true);
            setHiddenCapaModal(true);
            setHiddenDataModal(true);
            setHiddenMoverModal(true);
         } catch (error) {}
      },
   }
   return { cardHandler, isEditingCard }
}