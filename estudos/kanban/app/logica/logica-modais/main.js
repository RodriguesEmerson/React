
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
      setPosition({top: top, left: left + 5});
   },

   hiddenModal: function(e, setHiddenOptionsModal, setHiddenLabelsModal, setHiddenMembersModal){
      const cardsOptions = e.target.closest('.card-options');
      const modalLabels = e.target.closest('.modal-labels');
      const modalMembers = e.target.closest('.modal-members');
      
      if(!cardsOptions && !modalLabels && !modalMembers){
         setHiddenOptionsModal(true);
         setHiddenLabelsModal(true);
         setHiddenMembersModal(true)

      }else{return} ;
      editingCard.style.zIndex = "auto";
      editingCard = null;
   },

   getEditingCardId: function(){
      return editingCard.target.getAttribute('id');
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
   },
   setIntegrants: function(integrantes){
      setEditingIntegrants(integrantes);
   }
}

export { AddRemoveLabels, editIntegrants, modalInfos }