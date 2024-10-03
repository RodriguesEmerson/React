
let editingCard, editingLabels, setEditingLabels, editingIntegrants, setEditingIntegrants;
const modalInfos = {
   position: function(e, setPosition, labels, setLabels, integrants, setIntegrants){
      const card = e.target.closest('.card');
      card.style.zIndex = "8";
      editingCard = card;
      editingLabels = labels;
      setEditingLabels = setLabels;
      editingIntegrants = integrants;
      setEditingIntegrants = setIntegrants;
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
      editingCard.style.zIndex = "auto";
      editingCard = null;
   }
}

const AddRemoveLabels = {
   edtLabels: function(){
      return editingLabels;
   },
   setLabels: function( color ){
      if(editingLabels.includes(color)){
         editingLabels = editingLabels.filter((currColor) => currColor != color);
         return setEditingLabels(editingLabels);
      };
      editingLabels = [...editingLabels, color];
      setEditingLabels(editingLabels);
   },
}

const editIntegrants = {
   integrants: function(){
      return editingIntegrants;
   }
}

export default modalInfos;
export { AddRemoveLabels, editIntegrants }