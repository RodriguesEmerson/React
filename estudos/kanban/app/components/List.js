'use client';

import { useEffect, useState } from "react";
import Card from "./Card";
import dragDrop from "./drag-drop";
export default function List({ lists }) {

   //Retorna um elemento enquanto lists não está disponível.
   if(!lists){
      return <div>Carregando...</div>
   }
   return (
      lists.map(list => (
      <div key={list.id} id={list.id} className="list w-72 max-h-100vh-105px overflow-y-scroll bg-gray-100 shadow-4xl p-2 rounded-sm text-sm"
         onDragEnter={(e)=> dragDrop.dragEnter(e)}
         >
         <h2 className="mb-3 text-xl font-bold">{list.listName}</h2>
         <Card cards={list.cards}/>
         <div className="flex items-center w-fit p-1 hover:text-blue-900 transition-all cursor-pointer">
            <span className="material-icons">add</span>
            <p>Criar novo Card</p>
         </div>
      </div>

      ))
   );
}