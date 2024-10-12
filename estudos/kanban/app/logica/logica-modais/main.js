
let editingCard, 
   editingLabels, setEditingLabels, 
   editingIntegrants, setEditingIntegrants, 
   editingCapa, setEditingCapa;
const modalInfos = {
   position: function(e, setPosition, setHiddenOptionsModal, cardInfos, setCardInfos){
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
      const diasMesAnterior = new Date(ano, mes, 0).getDate();
      const diasMesAtual = new Date(ano, mes + 1, 0).getDate();
      const diasMesProximo = new Date(ano, mes + 2, 0).getDate();

      return({mAnte: diasMesAnterior, mAtual: diasMesAtual, mProx: diasMesProximo});
   },
   primeiroDiaMes: function(mes, ano){
      //Dia da semana que foi o primeiro dia do mês.
      const dia = (new Date(ano, mes, 1).getDay());

      //Cria um array com números do 1º dia da semana até o 1º dia do mês.
      const numerosDiaDaSemana  = []
      for(let d = 1; d <= dia; d++){
         numerosDiaDaSemana.push(d);
      }

      //Cria um array com os ultimos dias do mês anterior que aparecem na mesma semana do primeiro dia do mês atual.
      const ultimosDiasDoMesAnterior = [];
      for(let d = dia - 1; d >= 0; d--){
        ultimosDiasDoMesAnterior.push(this.diasNoMes(mes, ano).mAnte - d);
      }

      //Cria um array com os primerios dias do próximo mês.
      const primeirosDiasDProxMes = [];
      const ultimoDiaDoDaSemanaMesAtual = new Date(ano, mes + 1, 0).getDay();
      let day = 1;
      // const diasMesAtual = new Date(mes + 1, ano, 0).getDate();
      for(let d = ultimoDiaDoDaSemanaMesAtual; d  < 6; d++){
         primeirosDiasDProxMes.push(day);
            day++;
      }

      //Cria um array com todos os dias do mês atual.
      const numeroDeDiasMesAtual = [];
      const diasMesAtual = new Date(ano, mes + 1, 0).getDate();
      for (let dia = 1; dia <= diasMesAtual; dia++) {
         numeroDeDiasMesAtual.push(dia)
      }

      const dadosDoCalendario = {
         diaDaSemana: dia, 
         ultimosDiasDoMesAnterior: ultimosDiasDoMesAnterior, 
         primeirosDiasDProxMes: primeirosDiasDProxMes,
         numeroDeDiasMesAtual: numeroDeDiasMesAtual
       }

      return dadosDoCalendario;
   }

}


export { AddRemoveLabels, editIntegrants, modalInfos, editCapa, datas }