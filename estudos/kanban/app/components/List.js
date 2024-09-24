'use client';

import Card from "./Card";
import dragDrop from "./drag-drop";
export default function List({ lists }) {
   //Retorna um elemento enquanto lists não está disponível.
   if(!lists){
      return <div className="text-blue-400 h-5 w-5 animate-pulse">Carregando...</div>
   }
   return (
      lists.map(list => (
      
         <div key={list.id} id={list.id} className="list w-72  bg-gray-100 shadow-4xl p-1 rounded-sm text-sm"
            onDragStart={(e) => {dragDrop.dragStart(e)}}
            onDragEnter={(e) => dragDrop.dragEnter(e)}
            onDragOver={(e) => {dragDrop.dragOver(e)}}
            onDragEnd={(e) => {dragDrop.dragEnd(e)}}
            >
            <h2 className="mb-3 text-xl font-bold">{list.listName}</h2>
            <div className="dragableArea overflow-y-auto scroll-presonalizada  max-h-100vh-105px" >
               <Card cards={list.cards}/>
            </div>
            <div className="flex items-center w-fit p-1 hover:text-blue-900 transition-all cursor-pointer">
               <span className="material-icons">add</span>
               <p>Criar novo Card</p>
            </div>
         </div>
      
      ))
   );
}