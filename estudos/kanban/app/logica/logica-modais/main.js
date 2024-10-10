
let editingCard, 
   editingLabels, setEditingLabels, 
   editingIntegrants, setEditingIntegrants, 
   editingCapa, setEditingCapa;
const modalInfos = {
   position: function(e, setPosition, labels, setLabels, integrants, setIntegrants, capa, setCapa){
      const card = e.target.closest('.card');
      card.style.zIndex = "8";
      editingCard = card;
      editingLabels = labels; setEditingLabels = setLabels;
      editingIntegrants = integrants; setEditingIntegrants = setIntegrants;
      editingCapa = capa; setEditingCapa = setCapa;

      const left = card.offsetLeft + card.offsetWidth;
      const top = card.offsetTop;
      setPosition({top: top, left: left + 5});
   },

   hiddenModal: function(e, setHiddenOptionsModal, setHiddenLabelsModal, setHiddenMembersModal, setHiddenCapaModal){
      const cardsOptions = e.target.closest('.card-options');
      const modal = e.target.closest('.modal');
      
      if(!cardsOptions && !modal){
         setHiddenOptionsModal(true);
         setHiddenLabelsModal(true);
         setHiddenMembersModal(true);
         setHiddenCapaModal(true);

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

const editCapa = {
   capa: function(){
      return editingCapa;
   },
   setCapa: function(capa){
      setEditingCapa(capa)
   }
}


const datas = {
   calendario: function(mes, ano){
      this.primeiroDiaMes(mes, ano)
      return this.diasNoMes(mes, ano);
   
   },
   anoBissexto: function(ano){
      if(ano / 400 === 0) return true;
      return false; 
   },
   diasNoMes: function(mes, ano){
      const diasMesAnterior = new Date(ano, mes -1, 0).getDate();
      const diasMesAtual = new Date(ano, mes + 1, 0).getDate();
      const diasMesProximo = new Date(ano, mes + 1, 0).getDate();
      console.log(new Date(ano, mes + 1, 0))

      return({mAnte: diasMesAnterior, mAtual: diasMesAtual, mProx: diasMesProximo});
   },
   primeiroDiaMes: function(mes, ano){
      const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb']
      const dia = (new Date(ano, mes, 1).getDay());
      const numerosDiaDaSemana  = []
      for(let d = 1; d <= dia; d++){
         numerosDiaDaSemana.push(d);
      }
      return numerosDiaDaSemana;
   }

}


export { AddRemoveLabels, editIntegrants, modalInfos, editCapa, datas }