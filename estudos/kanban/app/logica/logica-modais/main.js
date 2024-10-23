
let editingCard, editingCardID, editingCapa, editingCardInfos, setEditingCardInfos, periodoEmEdicao, listaOriginalId;
const modalInfos = {
   position: function (e, setPosition, cardInfos, setCardInfos) {
      const card = e.target.closest('.card');
      editingCardID = card.getAttribute('id');
      card.style.zIndex = "8";
      editingCard = card;
      editingCardInfos = cardInfos;
      setEditingCardInfos = setCardInfos;
      periodoEmEdicao = cardInfos.periodo;
      listaOriginalId = e.target.closest('.list').getAttribute('id');

      let scrollCompensation = e.target.closest('.dragableArea').scrollTop;
      const left = card.offsetLeft + card.offsetWidth + 5;
      let top = card.offsetTop - scrollCompensation;

      top > 405 && (top = 405);
      setPosition({ top: top, left: left });
   },

   hiddenModal: function (e, setHiddenOptionsModal, setHiddenLabelsModal, setHiddenMembersModal, setHiddenCapaModal, setHiddenDataModal, setHiddenMoverModal) {
      const cardsOptions = e.target.closest('.card-options');
      const modal = e.target.closest('.modal');

      //Checa se foi clicado em algum modal.
      if (cardsOptions || modal) {
         return;
      }
      editingCard.style.zIndex = "auto";
      editingCard = null;

      setHiddenOptionsModal(true);
      setHiddenLabelsModal(true);
      setHiddenMembersModal(true);
      setHiddenCapaModal(true);
      setHiddenDataModal(true);
      setHiddenMoverModal(true);
   },

   getEditingCardId: function () {
      return editingCard.target.getAttribute('id');
   },

   getCardInfos: function () {
      return editingCardInfos;
   },
   getPeriodo: function () {
      return periodoEmEdicao;
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
   checkPrazo: function (periodo) {
      const hoje = new Date(this.converteData(this.hoje())).getTime();
      const prazo = new Date(periodo.fim).getTime();
      if (periodo.status) return "bg-green-700 text-white";
      if (prazo == hoje) return "bg-yellow-400 text-gray-700 pt-[5px] pr-[6px]";
      if (prazo < hoje) return "bg-red-700 text-white pt-[5px] pr-[6px]";
   },

   marcarStatus: function (periodo, cardInfos, setCardInfos) {
      const statusAtual = periodo.status;
      setCardInfos(
         { ...cardInfos, periodo: { ...periodo, status: !statusAtual } }
      )
   },

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

   incluiNoPeriodo: function (periodo, dia, mes, ano) {
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
         //Se tiver apenas a data de inicio
         if (periodo.inicio && (diaAnalizado == dataInicio)) return true;
         //Se tiver a penas a data final.
         if (periodo.fim && (diaAnalizado == dataFim)) return true;
      };

      //Checa se a data está dentro do periodo analizado.
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

      const umAnoEmMilissegundos = 365 * 24 * 60 * 60 * 1000; //Um ano em milissegundos (365 dias);
      const dataEmMilissegundos = new Date(dataRevesa).getTime(); //data recebida em milissegundos;
      const hojeEmMilissegundos = new Date(this.converteData(this.hoje())).getTime(); //hoje em milissegundos;

      //Vilida se o periodo da data tem o período de um ano.
      if (dataEmMilissegundos > hojeEmMilissegundos + umAnoEmMilissegundos
         || dataEmMilissegundos < hojeEmMilissegundos - umAnoEmMilissegundos
      ) return false;

      return dataRevesa;
   },

   checaMaiorData: function (data, dataFim) {
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
      let [dia, mes, ano] = data.split('/');

      if (mes > 12) { mes = 1; ano++ } //Se o mes recebido for maior que 12, então é o 1º mês do seguinte.
      if (mes < 1) { mes = 12; ano-- } //Se o mes recebido for menor que 1, então é o 12ª mês do ano anterior.
      //Retorna a data no padrão aaaa/mm/dd;
      return `${ano}/${mes}/${dia}`
   },

   setPeriodo: function () {
      setEditingCardInfos({
         ...editingCardInfos,
         periodo: periodoEmEdicao
      })
   },

   hoje: function () {
      return new Date().toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' })
   },

   //*************************************************HANDLES***************************************************/
   /************************************************************************************************************/
   handleDataInicio: function (data, dataFim, removeDataInicio, setPeriodo, clickFrom) {
      let novaData;
      removeDataInicio ? novaData = '' : novaData = this.validaData(data);
      let fim = dataFim;

      if (!removeDataInicio) {
         if (!novaData) return console.log('Data inválida.');
         //Se a data final for menor que a data adicionada, é removida.
         if (this.checaMaiorData(novaData, dataFim)) fim = '';
      }

      periodoEmEdicao = { ...periodoEmEdicao, inicio: novaData, fim: fim };
      setPeriodo(periodoEmEdicao);
   },

   handleDataFim: function (data, dataInicio, removeDataFim, setPeriodo, clickFrom) {
      let novaData;
      removeDataFim ? novaData = "" : novaData = this.validaData(data);
      if (!removeDataFim) {
         if (!novaData) return console.log('Data inválida.');
         //Checa se a data inicial e maior que a final, se sim a data menor vai pra inicial.
         if (this.checaMaiorData(dataInicio, novaData)) {
            periodoEmEdicao = { ...periodoEmEdicao, inicio: '', fim: novaData };
            setPeriodo(periodoEmEdicao);
            return;
         }
      }
      //Atualiza o valor de periodoEmEdicao
      periodoEmEdicao = { ...periodoEmEdicao, inicio: dataInicio, fim: novaData };
      setPeriodo(periodoEmEdicao); //Seta o novo periodo no estado periodo em Modal-data.js 28;
   }
}

const moverCard = {
   getLists: function (lists) {
      const listsNames = [];
      lists.forEach(list => {
         const indexCardsLength = [];
         for(let i = 1; i < list.cards.length + 2; i++){
            indexCardsLength.push(i);
         }
         listsNames.push({ listName: list.listName, listId: list.id, index: indexCardsLength })
      });
      return listsNames;
   },
   getNomeListaAtual: function (lists) {
      let nomeLitaAtual;
      lists.forEach(list => {
         if (list.id == listaOriginalId) nomeLitaAtual = list.listName;
      });
      return nomeLitaAtual;
   },

   mover: function (listaDestino, lists, setLists, index) {
      //Cria uma cópia de das lista sem alterar a origianl
      const editingLists = [...lists];

       //Percorre todas as listas
      editingLists.forEach(list => {
         if (list.id == listaOriginalId) {
            //Filtra os cards, removendo o card clicado.
            list.cards = list.cards.filter(card => card.id != editingCardID);
         };

         if(!index){
            if (list.id == listaDestino) {
               // Adiciona o card à lista de destino
               list.cards = [editingCardInfos, ...list.cards];
            }
         }

         if(list.id == listaDestino && index){
            // Adiciona o card à lista de destino
            list.cards = [
               ...list.cards.slice(0, index - 1),  // itens antes do índice
               editingCardInfos,                   // o novo item a ser inserido
               ...list.cards.slice(index - 1)      // itens após o índice
            ];
         }

      });
      setLists(editingLists);
   },

   hiddenModal: function(setHiddenMoverModal, setHiddenOptionsModal){
      editingCard.style.zIndex = "auto";
      editingCard = null;

      setHiddenOptionsModal(true);
      setHiddenMoverModal(true);
   }
}

export { AddRemoveLabels, editIntegrants, modalInfos, editCapa, datas, moverCard }