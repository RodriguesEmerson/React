'use client';

import { useEffect, useState } from "react";
import Card from "./Card";
import dragDrop from "../logica/drag-drop";
import criarNovo from "../logica/novo-card";
import { Tulpen_One } from "next/font/google";

export default function List({ lists }) {
   //Retorna um elemento enquanto lists não estiver disponível.
   if (!lists) {
      return <div className="text-blue-400 h-5 w-5 animate-pulse">Carregando...</div>
   }
   return (
      lists.map(list => (
        <EachList key={list.id} list={list} />
      ))
   );
}

function EachList({ list }) {
   const [novoCard, setNovoCard] = useState(false);

   
   return (
      <div id={list.id} className="list w-72  bg-gray-100 shadow-4xl p-1 rounded-sm text-sm"
         onDragStart={(e) => {dragDrop.dragStart(e)}}
         onDragEnter={(e) => dragDrop.dragEnter(e)}
         onDragOver={(e) => {dragDrop.dragOver(e)}}
         onDragEnd={(e) => {dragDrop.dragEnd(e)}}
      >
         <h2 className="mb-3 text-base font-bold">{list.listName}</h2>
         <div className="dragableArea overflow-y-auto scroll-presonalizada  max-h-100vh-105px" >
            <Card cards={list.cards} />
            {novoCard &&
               <form id={`f${list.id}`} className="novo-card p-1 cursor-grab flex flex-col gap-1 w-full min-h-14 shadow-4xl rounded-md overflow-hidden bg-white relative mb-2">
                  <textarea id={`nctxt${list.id}`} name="texto" className="p-1 outline-none resize-none" placeholder="Insira um texto"></textarea>
               </form>
            }
         </div>
         {!novoCard ?
            <div
               onClick={() => setNovoCard(true)}
               className="flex items-center justify-center w-9/12 p-1 hover:bg-gray-300 transition-all cursor-pointer rounded-md h-9">
               <span className="material-icons">add</span>
               <p className="font-semibold text-gray-500 text-13px">Adicionar novo cartão</p>
            </div>
            :
            <div className="flex items-center gap-1 w-9/12 p-1 h-9">
               <button 
                  onClick={(e)=> criarNovo.card(e)}
                  type="sumit" 
                  form={`f${list.id}`}
                  data-parent={list.id} 
                  className="font-semibold text-white text-13px bg-blue-600 h-8 leading-8 px-2 rounded-sm cursor-pointer hover:bg-blue-700 transition-all">
                  Adicionar cartão
               </button>
               <span
                  onClick={() => setNovoCard(false)}
                  className="material-icons text-center !text-xl !leading-8 w-8 h-8 rounded-sm hover:bg-gray-300 transition-all cursor-pointer">close</span>
            </div>
         }
      </div>
   )
}