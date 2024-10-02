
let currentCard, currentLabels, currentSetLabels;
const modalPosition = {
   position: function(e, setPosition, labels, setLabels){
      const card = e.target.closest('.card');
      card.style.zIndex = "10"
      currentCard = card;
      currentLabels = labels;
      currentSetLabels = setLabels;
      const left = card.offsetLeft + card.offsetWidth;
      const top = card.offsetTop;
      console.log({top: top, left: left})
   
      setPosition({top: `${top}px`, left: `${left + 5}px`});
   },

   hiddenModal: function(e, setHiddenOptionsModal, setHiddenLabelsModal){
      const cardsOptions = e.target.closest('.card-options');
      const modalLabels = e.target.closest('.modal-labels');
      if(!cardsOptions && !modalLabels){
         setHiddenOptionsModal(true);
         setHiddenLabelsModal(true);
      }else{return} ;
      currentCard.style.zIndex = "auto";
      currentCard = null;
   }
}

const AddRemoveLabels = {
   currLabels: function(){
      return currentLabels;
   },
   setLabels: function( color ){
      if(currentLabels.includes(color)){
         currentLabels = currentLabels.filter((currColor) => currColor != color);
         return currentSetLabels(currentLabels);
      };
      currentLabels = [...currentLabels, color];
      currentSetLabels(currentLabels);
   },
}

export default modalPosition;
export { AddRemoveLabels }