'use-client'
import { useEffect, useState } from "react";
import { modalInfos } from "../logica/logica-modais/main";
import { useCoverContext } from "../context/useCoverContext";

export default function useCoverHandler() {
   const { cover, setCover, setCoverStyle  } = useCoverContext();

   useEffect(() => {
      setCover(modalInfos.getCardInfos().capa);
      setCoverStyle(modalInfos.getCardInfos().capa.full);
   }, [])

   const coverHandler = {
      setCover: function (newCover) {
         modalInfos.setCardInfos({
            ...modalInfos.getCardInfos(),
            capa: newCover
         })
         setCover(newCover)
         //Atualiza a variável com os novos dados.
         modalInfos.getCardInfos().capa = newCover;
      },
      removeCover: function () {
         //Remove imagens e cores da capa do card.
         modalInfos.setCardInfos({
            ...modalInfos.getCardInfos(),
            capa: { color: "", full: false, img: "" }
         })
         modalInfos.getCardInfos().capa = { color: "", full: false, img: "" };
      },

      //*************************************************HANDLES***************************************************/
      /************************************************************************************************************/
      handleChangeCoverStyle: function (style) {
         if (cover.color == "") return;
         
         setCoverStyle(style)
         this.setCover({ color: `${cover.color}`, full: style, img: "" })
      }
   }

   //***********************************************************************************************************/
   /************************************************************************************************************/
   const arrayColors = [
      { color: '#FFC636' },
      { color: '#FF6444' },
      { color: '#00ADA9' },
      { color: '#260273' },
      { color: '#04D99D' },
      { color: '#F205CB' },
      { color: '#7C05F2' },
      { color: '#FEA362' },
      { color: '#94C748' },
      { color: '#8590A2' },
   ]
   const images = [
      "/images/bg-img-1.jpg", "/images/bg-img-2.jpg", "/images/bg-img-3.jpg",
      "/images/bg-img-4.jpg", "/images/bg-img-5.jpg", "/images/bg-img-6.jpg",
      "/images/bg-img-7.jpg", "/images/bg-img-8.jpg", "/images/bg-img-9.jpg",
   ]


   return { coverHandler, arrayColors, images }
}