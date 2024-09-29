'use client';
import { useEffect, useState } from "react";
import { Providers, useProvidersContext } from "../context/providers";
import modalPosition from "../logica/card-options/modal-position";
import List from "./List";
import ModalEditCard from "./Modal";



export default function Board({ id }){
   const [data, setData] = useState('');
   

   useEffect(()=>{
      const getData = async () =>{
         try {
            const res = await fetch(`/api/projects/${id}`);
            if(!res.ok){
               throw new Error('Não foi possível encontrar dos dados.');
            }
            const project = await res.json();
            setData(project);

         } catch (error) {
            console.log('Erro: ' + error);
         }
      }
      getData();
   }, []);

   return(
      <Providers>
         <BoardBody data={data} />
      </Providers>
   )
}
function BoardBody({ data }){
   const { hiddenOptionsModal, setHiddenOptionsModal } = useProvidersContext();

   const handleDragOver = (e) =>{
      e.preventDefault();
   }
   return(
      <section className={`board flex flex-row items-start m-auto p-2 gap-3`}
         onDragOver={(e)=> {handleDragOver(e)}}
         >
            <List  lists={data.lists}/>
            {!hiddenOptionsModal &&
               <div 
                  className="absolute bg-black bg-opacity-35 top-0 left-0 w-full h-svh"
                  onClick={(e)=> {modalPosition.hiddenModal(e, setHiddenOptionsModal)}}
                  >
                  <ModalEditCard />
               </div>
            }
         </section>
   )
}