
let currentCard;
const modalPosition = {
   position: function(e, setPosition){
      const card = e.target.closest('.card');
      currentCard = card;
      const left = card.offsetLeft + card.offsetWidth;
      const top = card.offsetTop;
      console.log({top: top, left: left})
   
      setPosition({top: `${top}px`, left: `${left + 5}px`});
   },

   hiddenModal: function(e, setHiddenOptionsModal){
      currentCard = null;
      const cardsOptions = e.target.closest('.card-options');
      !cardsOptions && setHiddenOptionsModal(true);
   }
}

export default modalPosition;