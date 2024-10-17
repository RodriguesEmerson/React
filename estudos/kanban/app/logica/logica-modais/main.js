
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

   hiddenModal: function (e, setHiddenOptionsModal, setHiddenLabelsModal, setHiddenMembersModal, setHiddenCapaModal, setHiddenDataModal) {
      const cardsOptions = e.target.closest('.card-options');
      const modal = e.target.closest('.modal');

      if (!cardsOptions && !modal) {
         setHiddenOptionsModal(true);
         setHiddenLabelsModal(true);
         setHiddenMembersModal(true);
         setHiddenCapaModal(true);
         setHiddenDataModal(true);

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
   diasNoMes: function (mes, ano) {
      const diasMesAnterior = new Date(ano, mes, 0).getDate();
      const diasMesAtual = new Date(ano, mes + 1, 0).getDate();
      const diasMesProximo = new Date(ano, mes + 2, 0).getDate();

      return ({ mAnte: diasMesAnterior, mAtual: diasMesAtual, mProx: diasMesProximo });
   },
   calendario: function (mes, ano) {
      //Dia da semana que foi o primeiro dia do mês.
      const dia = (new Date(ano, mes, 1).getDay());

      //Cria um array com números do 1º dia da semana até o 1º dia do mês.
      const numerosDiaDaSemana = []
      for (let d = 1; d <= dia; d++) {
         numerosDiaDaSemana.push(d);
      }

      //Cria um array com os ultimos dias do mês anterior que aparecem na mesma semana do 1º dia do mês atual.
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
   incluiNoPeriodo: function (periodo, dia, mes, ano, mesComparacao) {
      let anoAnalizado = ano
      let mesAnalizado = mes;
      if (mes > 12) {
         anoAnalizado++;
         mesAnalizado = 1;
      }
      if (mes < 1) {
         anoAnalizado--;
         mesAnalizado = 12;
      }

      const dataInicio = new Date(periodo.inicio).getTime();
      const dataFim = new Date(periodo.fim).getTime();
      const diaAnalizado = (new Date(`${anoAnalizado}/${mesAnalizado}/${dia}`).getTime());

      //Verifica se as datas recebidas formam um período, com data de incio e fim.
      if (!periodo.inicio || !periodo.fim) {
         if (periodo.inicio && (diaAnalizado == dataInicio)) return true;
         if (periodo.fim && (diaAnalizado == dataFim)) return true;
      };


      //Checa se o dia está dentro do periodo analizado.
      if (diaAnalizado >= dataInicio && diaAnalizado <= dataFim) return true;
   },
   validaData: function (data) {
      //Regex para validar o formato da data recebido.
      const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/;
      if (!regex.test(data)) return false;

      //Converte a data para o padrão aceito pelo js.
      const dataRevesa = this.converteData(data);

      //Valida a data.
      if (new Date(dataRevesa) == 'Invalid Date') return false;

      //Um ano em milissegundos (365 dias)
      const umAnoEmMilissegundos = 365 * 24 * 60 * 60 * 1000;

      const dataEmMilissegundos = new Date(dataRevesa).getTime();
      const hojeEmMilissegundos = new Date(this.converteData(this.hoje())).getTime();

      //Vilida se o periodo da data tem o período de um ano.
      if(dataEmMilissegundos > hojeEmMilissegundos + umAnoEmMilissegundos 
         || dataEmMilissegundos < hojeEmMilissegundos - umAnoEmMilissegundos
      ) return false;

      // const anoAtual = new Date().getFullYear();
      // const mesAtual = new Date().getMonth();
      // const mesAnalizado = new Date(dataRevesa).getMonth();
      // const anoAnalizado = new Date(dataRevesa).getFullYear();
      // if (anoAnalizado < anoAtual - 1 || anoAnalizado > anoAtual + 1) return false;
      // if (anoAnalizado == anoAtual - 1 && mesAnalizado < mesAtual) return false;
      // if (anoAnalizado == anoAtual + 1 && mesAnalizado > mesAtual) return false;

      return dataRevesa;
   },

   veirificaPeriodo: function (data, dataFim) {
      //Checa se a data enviada é maior que a data final.
      if (new Date(data).getTime() > new Date(dataFim).getTime()) {
         return true;
      }
      return false;
   },

   converteData: function (data, padrao) {
      if (padrao == "br") {
         if (data == '') return '';
         return new Date(data).toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' })
      }
      //Divide a data 
      const [dia, mes, ano] = data.split('/');

      //Converte a data;
      return `${ano}/${mes}/${dia}`
   },

   setPeriodo: function (periodo) {
      setEditingCardInfos({
         ...editingCardInfos,
         periodo: periodo
      })
      editingCardInfos.periodo = periodo;
   },

   hoje: function () {
      return new Date().toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' })
   },

   //**********************HANDLES*************************** */
   handleDataInicio: function (data, dataFim, removeDataInicio, setPeriodo, setDataInicio, setDataFim) {
      let novaData;
      if (!removeDataInicio) {
         novaData = this.validaData(data);
         if (!novaData) return console.log('Data inválida.');
      } else {
         novaData = ""
      }

      //Se a data final for menor que a data inicial adicionada, é removida.
      let fim = dataFim;
      if (this.veirificaPeriodo(novaData, dataFim)) fim = '';

      this.setPeriodo(
         { inicio: novaData, fim: fim }
      );
      setPeriodo({ inicio: novaData, fim: fim });
      setDataInicio(datas.converteData(novaData, 'br'));
      setDataFim(datas.converteData(fim, 'br'))
   },

   handleDataFim: function (data, dataInicio, removeDataFim, setPeriodo, setDataInicio, setDataFim) {
      let novaData;
      if (!removeDataFim) {
         novaData = this.validaData(data);
         if (!novaData) return console.log('Data inválida.');
      } else {
         novaData = ""
         this.setPeriodo(
            { inicio: dataInicio, fim: novaData }
         );
         setPeriodo(
            { inicio: dataInicio, fim: novaData }
         )
         setDataInicio(datas.converteData(dataInicio, 'br'));
         setDataFim(datas.converteData(novaData, 'br'));
         return;
      }

      //Se a data final for menor que a data inicial adicionada, é removida
      //E adiciona a data envida à início.
      //Se a dataInicio não existir, vai pra 'else'.
      if (this.veirificaPeriodo(dataInicio, novaData)) {
         console.log(novaData)
         this.setPeriodo(
            { inicio: novaData, fim: '' }
         );
         setPeriodo(
            { inicio: novaData, fim: '' }
         )
         setDataInicio(datas.converteData(novaData, 'br'));
         setDataFim(datas.converteData('', 'br'))

      } else {
         this.setPeriodo(
            { inicio: dataInicio, fim: novaData }
         );
         setPeriodo(
            { inicio: dataInicio, fim: novaData }
         )
         setDataInicio(datas.converteData(dataInicio, 'br'));
         setDataFim(datas.converteData(novaData, 'br'))
      }


   }
}

export { AddRemoveLabels, editIntegrants, modalInfos, editCapa, datas }