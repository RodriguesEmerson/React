'use client';
import List from "./List";
import { useEffect, useState } from "react";

export default function Board({ id }){
   
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
      <section className={`board flex flex-row items-start m-auto p-4 gap-3`}
      onDragOver={(e)=> {handleDragOver(e)}}
      >
         <List lists={data.lists}/>
      </section>
   )
}