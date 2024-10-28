import { modalInfos } from "./main";

const labelsHandler = {
   setLabels: function (color) {
      const cardInfos = modalInfos.getCardInfos();
      let labels = cardInfos.labels;
      //Se a cor clicada já estiver no card, é removida.
      if (labels.includes(color)) {
         //cria um array sem a cor clicada.
         labels = labels.filter((currColor) => currColor != color);
         modalInfos.setCardInfos({
            //Mentem todas as outras propriedaes e atualiza apenas as labels.
            ...cardInfos,
            labels: labels
         });
         //Atualiza o valor das labels em editingCard.
         cardInfos.labels = labels;
         return;
      };

      modalInfos.setCardInfos({
         ...cardInfos,
         labels: [...labels, color]
      });
      cardInfos.labels = [...labels, color];
   },
}

export { labelsHandler }