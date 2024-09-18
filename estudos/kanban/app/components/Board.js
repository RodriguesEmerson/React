'use client';
import List from "./List"

import { useEffect, useState } from "react";

export default function Board(){

   const [data, setData] = useState('');
   const [projetId, setProjectId] = useState('p123456');

   //UseEffect só execulta depois do dom ter sido criado por completo
   useEffect(()=>{
      const getData = async () =>{
         try {
            const res = await fetch(`http://localhost:3000/db/db.json`,
               {  
                  method: 'GET',
                  cache: 'no-store' //impede dados antigos
               }
            )
            if(!res.ok){
               throw new Error('Não foi possível encontrar dos dados.')
            }
            const json = await res.json();
            //Pega o projeto com o id informado em projectId;
            //Creio que se estivesse usando o json-server não seria preciso  fazer isso;
            const project = json.projects.find(proj => proj.id == projetId)
            setData(project);
         } catch (error) {
            console.log('Erro: ' + error)
         }
      }
      getData();
   }, []);

   return(
      <section className="flex flex-row items-start m-auto p-5 gap-3">
         <List lists={data.lists}/>
      </section>
   )
}