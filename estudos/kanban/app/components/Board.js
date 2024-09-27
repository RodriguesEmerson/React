'use client';
import List from "./List";
import { useEffect, useState } from "react";
import ModalEditCard from "./Modal";

export default function Board({ id }){
   const [hidden, setHidden] = useState(false)
   const [data, setData] = useState('');
   const handleDragOver = (e) =>{
      e.preventDefault();
   }

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
      <section className={`board flex flex-row items-start m-auto p-2 gap-3`}
      onDragOver={(e)=> {handleDragOver(e)}}
      >
         <List lists={data.lists}/>
         {!hidden &&
            <div className="absolute bg-black bg-opacity-35 top-0 left-0 w-full h-svh">
               <ModalEditCard />
            </div>
            
         }
      </section>
   )
}