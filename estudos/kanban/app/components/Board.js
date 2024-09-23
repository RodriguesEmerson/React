'use client';
import List from "./List";
import { useEffect, useState } from "react";

export default function Board(){
   
   const [data, setData] = useState('');
   const [projetId, setProjectId] = useState('p123456');


   const handleDragOver = (e) =>{
      e.preventDefault();
   }

   //UseEffect só execulta depois do dom ter sido criado por completo
   useEffect(()=>{
      const getData = async () =>{
         try {
            const res = await fetch(`/api/lists`,
               { 
                  method: 'GET',
                  cache: 'no-store' //impede dados antigos
               }
            )
            if(!res.ok){
               throw new Error('Não foi possível encontrar dos dados.')
            }

            const json = await res.json();
            const project = json.data.projects.find(proj => proj.id == projetId)
            setData(project);

         } catch (error) {
            console.log('Erro: ' + error)
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