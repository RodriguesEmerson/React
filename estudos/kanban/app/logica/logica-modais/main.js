
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
   removeCapa: function () {
      //Remove imagens e cores da capa do card.
      setEditingCardInfos({
         ...editingCardInfos,
         capa: { color: "", full: false, img: "" }
      })
      editingCardInfos.capa = { color: "", full: false, img: "" };
   }
}


const datas = {
   calendario: function (mes, ano) {
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
         numeroDeDiasMesAtual: numeroDeDiasMesAtual,
         primeirosDiasDProxMes: primeirosDiasDProxMes
      }

      return dadosDoCalendario;
   },
   periodo: function (peri, mesAno) {
      const { inicio, fim } = peri;
      const { mes, ano } = mesAno;
      const { mAnte, mAtual, mProx } = this.diasNoMes(mes, ano);
      const { ultimosDiasDoMesAnterior, primeirosDiasDProxMes } = this.primeiroDiaMes(mes, ano);
      const mesInicio = new Date(inicio).getMonth();
      const mesFim = new Date(fim).getMonth();

      //Checa se o mês anterior, o atual ou o próximo está no mes incial.
      const includPeriodoInicio = (
         //Meses com ciclo
         mesInicio == (mes - 1 + 12) % 12 || //Impede que o mes seja menor que 0 (0 - 1 = -1 + 12 = 11 % 12 = 11);
         mesInicio == mes ||
         mesInicio == (mes + 1) % 12        ////Impede que o mes seja maior que 11 (11 + 1 = 12 % 12 = 0);
      )
      //Checa se o mês anterior, o atual ou o próximo está no mes final.
      const includPeriodoFim = (
         //Meses com ciclo
         mesFim == (mes - 1 + 12) % 12 || //Impede que o mes seja menor que 0 (0 - 1 = -1 + 12 = 11 % 12 = 11);
         mesFim == mes ||
         mesFim == (mes + 1) % 12        ////Impede que o mes seja maior que 11 (11 + 1 = 12 % 12 = 0);
      )
      if (includPeriodoInicio && includPeriodoFim) {
         const diaInicio = new Date(inicio).getDate();
         const diaFim = new Date(fim).getDate();

         let diasInclusosMesAnte = [];
         if (mesInicio == (mes - 1 + 12) % 12) {
            //Dias do mês anterior que estão no periodo.
            for (let i = diaInicio; i <= mAnte; i++) {
               diasInclusosMesAnte.push(i)
            }
            //Filtra apenas os dias do ultimo mes que são mostrados nesse mês e estão no periodo.
            diasInclusosMesAnte = diasInclusosMesAnte.filter(dia => ultimosDiasDoMesAnterior.includes(dia) && dia);
            return ({ diasInclusosMesAnte: diasInclusosMesAnte });
         }

      }
      // if(includPeriodoFim){
      //    const diaFim = new Date(fim).getDate();
      //    console.log(diaFim)
      //  }

   },

   incluiNoMesAnterior: function (periodo, dia, mes) {
      //Verifica se o dia pertence ao periodo determinado.
      if (new Date(periodo.inicio).getDate() <= dia && (new Date(periodo.inicio).getMonth() == mes - 1)) {
         return true;
      }
   },
   incluiNoMesAtual: function (periodo, dia, mes) {
      const dataFim = new Date(periodo.fim).getDate();
      const dataInicio = new Date(periodo.inicio).getDate();
      const mesInicio = new Date(periodo.inicio).getMonth();
      const mesFim = new Date(periodo.fim).getMonth();

      //Checa se o periodo começa no mes anterior e termina no mes atual.
      if ((mesInicio == mes - 1) && (mesFim == mes) && (dia <= dataFim)) {
         return true;
      }

      //Checa se o mês inteiro está incluso no periodo.
      if((mesInicio < mes) && (mesFim > mes)){
         return true;
      }

      //Checa se o mês inicial e o final é o mesmo e se o dia pertence ao periodo.
      if((mesInicio == mes) && (mesFim == mes) && (dataInicio <= dia) && (dataFim >= dia) ){
         return true;
      }

      //Checa se o periodo começa no mes anterior e termina no mes atual.
      if ((mesInicio == mes ) && (mesFim == mes + 1) && (dia >= dataInicio)) {
         return true;
      }
   }

}


export { AddRemoveLabels, editIntegrants, modalInfos, editCapa, datas }