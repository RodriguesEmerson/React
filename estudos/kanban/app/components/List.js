'use client';

import { useState, useEffect, memo } from "react";
import { useProvidersContext } from "../context/providers";
import Cards from "./Cards";
import dragDrop from "../logica/drag-drop";
import criarNovo from "../logica/novo-card";
import Skeleton from "./skeleton";
import { criarNova } from "../logica/nova-lista";
let c = 1

const List = memo(({ lists, setLists }) => {
   
   //Retorna o skeleton enquanto lists não estiver disponível.
   if (!lists) {
      return <Skeleton />
   }
   return (
      <>
         {lists.map(list => (
            <EachList key={list.id} list={list} lists={lists} setLists={setLists} />
         ))}
         <AddNewList lists={lists} setLists={setLists}/>
      </>
   );
})

export default List;

const EachList = (({ list, lists, setLists }) => {
   const [novoCard, setNovoCard] = useState(false);
   const [cards, setCards] = useState(list.cards);
   const { projectId } = useProvidersContext();

   //Atualiza as listas dos cards quando algum card é arrastado para outro lugar.
   useEffect(()=> {
      const listsCopy = [...lists];
      const listCopy = {...list};

      listsCopy.forEach(element => {
         if(element.id == listCopy.id){
            element.cards = cards;
         }
      });

     setLists(listsCopy);

   },[cards])

   useEffect(()=>{
      setCards(list.cards);
   }, [list.cards]);


   function eventCloseNovoCard(){
      document.querySelector('body').removeEventListener('click', closeNovoCard);
      document.querySelector('body').addEventListener('click', closeNovoCard);
   }
   
   //Adiciona um evento ao body para fechar a criação de um card caso seja clicado fora do form.
   function closeNovoCard(e){
      if(!e.target.closest('.novo-card') || !e.target.closest('button')){
         setNovoCard(false);
         document.querySelector('body').removeEventListener('click', closeNovoCard);
      }
   }

   function handleCriarCard(e){
      criarNovo.card(e, cards, setCards, projectId);
      setNovoCard(false);
   }

   return (
      <div id={list.id} className="list w-[270px] min-w-[270px]  bg-gray-100 shadow-4xl p-1 rounded-xl text-sm transition-all"
         // onDragStart={(e) => { dragDrop.dragStart(e) }}
         onDragEnter={(e) => dragDrop.dragEnter(e, cards, setCards, lists, setLists, projectId) }
         onDragOver={(e) => { dragDrop.dragOver(e) }}
        
      >
         <h2 className="mb-2 ml-3 mt-2 text-sm font-bold text-gray-700">{list.listName}</h2>
         <div className="dragableArea overflow-y-auto scroll-presonalizada p-1  max-h-100vh-105px" >

            <Cards cards={cards} setCards={setCards} />
            
            {novoCard &&
               <form id={`f${list.id}`} className="novo-card p-1 cursor-grab flex flex-col gap-1 w-full min-h-14 shadow-4xl rounded-md overflow-hidden bg-white relative mb-2">
                  <textarea 
                     id={`nctxt${list.id}`} 
                     name="texto" 
                     data-parent={list.id}
                     className="p-1 outline-none resize-none" 
                     placeholder="Insira um texto" 
                     autoFocus
                     onKeyDown={(e)=> e.code == "Enter" && handleCriarCard(e) }
                  >
                  </textarea>
               </form>
            }
         </div>
         {!novoCard ?
            <div
               onClick={() => {setNovoCard(true); eventCloseNovoCard()}}
               className="flex gap-1 items-center justify-center w-9/12 p-1 hover:bg-gray-300 transition-all cursor-pointer rounded-md h-9"
            >
               <span className="material-icons text-gray-500 !text-lg">add</span>
               <p className="font-semibold text-gray-500 text-13px">Adicionar novo cartão</p>
            </div>
            :
            <div className="flex items-center gap-1 w-9/12 p-1 h-9">
               <button
                  onClick={(e) => handleCriarCard(e) }
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
})

function AddNewList({ lists, setLists }) {
   const [hidden, setHidden] = useState(true);
   const { projectId } = useProvidersContext();


   function handleCriarLista(){
      criarNova.lista(lists, setLists, setHidden, projectId);
   }

   return (
      <div className="flex flex-col">
         {hidden ?
            <div
               className="flex gap-1 items-center justify-center bg-white bg-opacity-30 w-[270px] hover:bg-opacity-20 
            transition-all cursor-pointer rounded-xl h-9"
               onClick={() => {setHidden(false)}}
            >
               <span className="material-icons text-white !text-lg">add</span>
               <p className=" text-white text-13px">Adicionar nova lista</p>
            </div>
            :
            <div className="flex flex-col gap-1 p-1 h-9 w-72">
               <form className="new-list p-1 cursor-grab flex flex-col gap-2 w-full min-h-20 shadow-4xl rounded-md overflow-hidden bg-white relative mb-2" > 
                  <textarea 
                     name="new-list-name"  
                     id="new-list-name"
                     className="p-1 h-7 text-sm outline-none resize-none overflow-hidden rounded-sm outline-blue-600"
                     placeholder="Digite o nome da lista..."
                     onKeyDown={(e)=> {e.key == "Enter" && handleCriarLista()}}
                     autoFocus
                  ></textarea>
                  <div className="flex items-center gap-1">
                     <button
                        onClick={(e) => {e.preventDefault(); handleCriarLista()}}
                        type="sumit"
                        className="font-semibold text-white text-[13px] bg-blue-600 h-8 leading-8 px-2 rounded-sm cursor-pointer hover:bg-blue-700 transition-all"
                     >Adicionar Lista</button>
                     <span
                        onClick={() => setHidden(true)}
                        className="material-icons text-center !text-xl !leading-8 w-8 h-8 rounded-sm hover:bg-gray-300 transition-all cursor-pointer"
                     >close</span>
                  </div>
               </form>
            </div>
         }
      </div>
   )
}