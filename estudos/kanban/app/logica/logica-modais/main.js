
let editingCard, editingCardID, projectId, editingCardInfos, setEditingCardInfos, periodoEmEdicao, listaOriginalId, setIsEditingCard;
const modalInfos = {
   position: function (e, setPosition, cardInfos, setCardInfos, setEditingCardStatus, id) {
      const card = e.target.closest('.card');
      editingCardID = card.getAttribute('id');
      card.style.zIndex = "8";
      editingCard = card;
      editingCardInfos = cardInfos;
      setEditingCardInfos = setCardInfos;
      periodoEmEdicao = cardInfos.periodo;
      listaOriginalId = e.target.closest('.list').getAttribute('id');
      setIsEditingCard = setEditingCardStatus;
      projectId = id

      let scrollCompensation = e.target.closest('.dragableArea').scrollTop;
      const left = card.offsetLeft + card.offsetWidth + 5;
      let top = card.offsetTop - scrollCompensation;

      setPosition({ top: top, left: left });
   },

   hiddenModal: function (e, setHiddenOptionsModal, setHiddenLabelsModal, setHiddenMembersModal, setHiddenCapaModal, setHiddenDataModal, setHiddenMoverModal) {
      try {
         const cardsOptions = e.target.closest('.card-options');
         const modal = e.target.closest('.modal');
         
         //Checa se foi clicado em algum modal.
         if (cardsOptions || modal) {
            return;
         }
         this.resetEditingStyle();
         setHiddenOptionsModal(true);
         setHiddenLabelsModal(true);
         setHiddenMembersModal(true);
         setHiddenCapaModal(true);
         setHiddenDataModal(true);
         setHiddenMoverModal(true);
      } catch (error) { }

   },
   resetEditingStyle(){
      try {
         editingCard.style.zIndex = "auto";
         editingCard = null;
         setIsEditingCard(false);
         
      } catch(error) {}
   },

   getEditingCardId: function () {
      return editingCardID;
   },
   getListOrigemId: function () {
      return listaOriginalId;
   },
   getCardInfos: function () {
      return editingCardInfos;
   },
   getProjectId: function(){
      return projectId;
   },
   getPeriodo: function () {
      return periodoEmEdicao;
   },
   setCardInfos: function (dados) {
      setEditingCardInfos(dados);
   }

}

export { modalInfos }