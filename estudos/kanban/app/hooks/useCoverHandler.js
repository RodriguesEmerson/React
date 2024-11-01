'use-client'
import { useEffect, useState } from "react";
import { modalInfos } from "../logica/logica-modais/main";
import { useCoverContext } from "../context/useCoverContext";

export default function useCoverHandler(){
   const { cover, setCover } = useCoverContext();

   useEffect(()=>{
      setCover(modalInfos.getCardInfos().capa)
   },[])

   const coverHandler = {
      setCover: function (cover) {
         modalInfos.setCardInfos({
            ...modalInfos.getCardInfos(),
            capa: cover
         })
         modalInfos.getCardInfos().capa = cover;
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
   
   return { coverHandler }
}