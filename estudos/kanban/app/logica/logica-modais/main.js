
let editingCard,
   editingLabels, setEditingLabels,
   editingIntegrants, setEditingIntegrants,
   editingCapa, setEditingCapa, editingCardInfos, setEditingCardInfos;
const modalInfos = {
   position: function (e, setPosition, cardInfos, setCardInfos) {
      const card = e.target.closest('.card');
      card.style.zIndex = "8";
      editingCard = card;
      editingCardInfos = cardInfos;
      setEditingCardInfos = setCardInfos;

      const left = card.offsetLeft + card.offsetWidth;
      const top = card.offsetTop;
      setPosition({ top: top, left: left + 5 });
   },

   hiddenModal: function (e, setHiddenOptionsModal, setHiddenLabelsModal, setHiddenMembersModal, setHiddenCapaModal) {
      const cardsOptions = e.target.closest('.card-options');
      const modal = e.target.closest('.modal');

      if (!cardsOptions && !modal) {
         setHiddenOptionsModal(true);
         setHiddenLabelsModal(true);
         setHiddenMembersModal(true);
         setHiddenCapaModal(true);

      } else { return };
      editingCard.style.zIndex = "auto";
      editingCard = null;
   },

   getEditingCardId: function () {
      return editingCard.target.getAttribute('id');
   },

   getCardInfos: function () {
      return editingCardInfos;
   },
   setCardInfos: function (dados) {
      setEditingCardInfos(dados);
   }

}

const AddRemoveLabels = {
   setLabels: function (color) {
      let labels = editingCardInfos.labels;
      const cardInfos = editingCardInfos;
      //Se a cor clicada já estiver no card, é removida.
      if (labels.includes(color)) {
         //cria um array sem a cor clicada.
         labels = labels.filter((currColor) => currColor != color);
         setEditingCardInfos({
            //Mentem todas as outras propriedaes e atualiza apenas as labels.
            ...cardInfos,
            labels: labels
         });
         //Atualiza o valor das labels em editingCard.
         cardInfos.labels = labels;
         return;
      };

      setEditingCardInfos({
         ...cardInfos,
         labels: [...labels, color]
      });
      cardInfos.labels = [...labels, color];
   },
}

const editIntegrants = {
   setIntegrants: function (integrantes) {
      const cardInfos = editingCardInfos;
      setEditingCardInfos({
         ...cardInfos,
         integrants: integrantes
      });
      cardInfos.integrants = integrantes;
   }
}

const editCapa = {
   capa: function () {
      return editingCapa;
   },
   setCapa: function (capa) {
      setEditingCardInfos({
         ...editingCardInfos,
         capa: capa
      })
      editingCardInfos.capa = capa;
   },
   removeCapa: function(){
      //Remove imagens e cores da capa do card.
      setEditingCardInfos({
         ...editingCardInfos,
         capa: {color: "", full: false, img: ""}
      })
      editingCardInfos.capa = {color: "", full: false, img: ""};
   }
}


const datas = {
   calendario: function (mes, ano) {
      this.primeiroDiaMes(mes, ano)
      return this.diasNoMes(mes, ano);

   },
   anoBissexto: function (ano) {
      if (ano / 400 === 0) return true;
      return false;
   },
   diasNoMes: function (mes, ano) {
      const diasMesAnterior = new Date(ano, mes, 0).getDate();
      const diasMesAtual = new Date(ano, mes + 1, 0).getDate();
      const diasMesProximo = new Date(ano, mes + 2, 0).getDate();

      return ({ mAnte: diasMesAnterior, mAtual: diasMesAtual, mProx: diasMesProximo });
   },
   primeiroDiaMes: function (mes, ano) {
      //Dia da semana que foi o primeiro dia do mês.
      const dia = (new Date(ano, mes, 1).getDay());

      //Cria um array com números do 1º dia da semana até o 1º dia do mês.
      const numerosDiaDaSemana = []
      for (let d = 1; d <= dia; d++) {
         numerosDiaDaSemana.push(d);
      }

      //Cria um array com os ultimos dias do mês anterior que aparecem na mesma semana do primeiro dia do mês atual.
      const ultimosDiasDoMesAnterior = [];
      for (let d = dia - 1; d >= 0; d--) {
         ultimosDiasDoMesAnterior.push(this.diasNoMes(mes, ano).mAnte - d);
      }

      //Cria um array com os primerios dias do próximo mês.
      const primeirosDiasDProxMes = [];
      const ultimoDiaDoDaSemanaMesAtual = new Date(ano, mes + 1, 0).getDay();
      let day = 1;
      // const diasMesAtual = new Date(mes + 1, ano, 0).getDate();
      for (let d = ultimoDiaDoDaSemanaMesAtual; d < 6; d++) {
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