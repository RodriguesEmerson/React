
let currentCard;
const modalPosition = {
   position: function(e, setPosition){
      const card = e.target.closest('.card');
      card.style.zIndex = "10"
      currentCard = card;
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
   add: function(color){
      console.log(color)
      const labels = currentCard.querySelector('.labels');
      const label = currentCard.querySelector(`[data-color="${color}"]`);
      console.log(label)
   }
}



export default modalPosition;
export { AddRemoveLabels }