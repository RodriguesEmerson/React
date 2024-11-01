import { modalInfos } from "./main";

const coverHandlerTwo = {
   cover: function () {
      return editingCapa;
   },
   setCover: function (capa) {
      modalInfos.setCardInfos({
         ...modalInfos.getCardInfos(),
         capa: capa
      })
      modalInfos.getCardInfos().capa = capa;
   },
   removeCover: function () {
      //Remove imagens e cores da capa do card.
      modalInfos.setCardInfos({
         ...modalInfos.getCardInfos(),
         capa: { color: "", full: false, img: "" }
      })
      modalInfos.getCardInfos().capa = { color: "", full: false, img: "" };
   }
}

export { coverHandlerTwo }