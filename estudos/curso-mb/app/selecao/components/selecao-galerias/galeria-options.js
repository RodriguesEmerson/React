'use client';

import { useState, useEffect } from "react";

let idCaixaDeOpcoesAberta;
export default function GaleriaOptions({ IdGaleria }) {

   let [hidden, setHidden] = useState('hidden');
   const [position, setPosition] = useState('0px');

   function handleMostarOptions(e) {
      setHidden(prev => prev == '' ? 'hidden' : '');
      const icone = e.target.closest('.galeria-options');
      //Pega a posição do icone e relação ao tamaho da tela.
      const posicaoBtn = icone.getBoundingClientRect().top;
      //Seta a nova posição ca caixa de opções.
      if (posicaoBtn >= (window.innerHeight - 190)) {
         setPosition(`-${110}px`);
      }else{
         setPosition(`-${0}px`)
      };

      idCaixaDeOpcoesAberta = icone.getAttribute('id');
   }

   function handleClickOutside(e) {
      try {
         if (e.target.closest('.galeria-options').getAttribute('id') != idCaixaDeOpcoesAberta) {
            setHidden('hidden');
         }
         
      } catch (error) {
         setHidden('hidden')
      }
   }
   // Adiciona e remove o manipulador de cliques fora do menu
   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   return (
      <div className="galeria-options " id={IdGaleria}>
         <div onClick={(e) => { handleMostarOptions(e) }} className="galeria-option-icon ">
            <span className="material-icons">more_horiz</span>
         </div>
         <div className={`galeria-options-list select ${hidden} `} style={{ top: position }}>
            <div className="select-option ">
               <span className="material-icons ">edit</span>
               <span>Editar galeria</span>
            </div>
            <div className="select-option ">
               <span className="material-icons ">delete</span>
               <span>Excluir galeria</span>
            </div>
            <div className="select-option ">
               <span className="material-icons ">sell</span>
               <span>Etiquetas</span>
            </div>
         </div>
      </div>
   )
}