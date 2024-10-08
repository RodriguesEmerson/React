'use client';
import { useEffect, useState } from "react";
import { Providers, useProvidersContext } from "../context/providers";
import { modalInfos } from "../logica/logica-modais/main";
import List from "./List";
import ModalEditCard from "./modais/Modal";
import ModalLabels from "./modais/Modal-labels";
import ModalMembros from "./modais/Modal-membros";
import ModalCapa from "./modais/Modal-capa";



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
         <BoardBody data={data} id={id} />
      </Providers>
   )
}
function BoardBody({ data, id }){
   const { 
      hiddenOptionsModal, setHiddenOptionsModal,
      hiddenLabelsModal, setHiddenLabelsModal,
      projectIntegrants, setProjectIntegrants,
      setHiddenMembersModal, setHiddenCapaModal,
      projectId, setProjectId,
   } = useProvidersContext();
   
   //Garante que os membro sejam carregados antes de setá-los.
   setTimeout(() => {
      setProjectIntegrants(data.integrants);
      setProjectId(id)
   }, 50);
   

   const handleDragOver = (e) =>{
      e.preventDefault();
   }
   return(
      <section className={`board flex flex-row items-start p-2 ml-2 gap-3`}
         onDragOver={(e)=> {handleDragOver(e)}}
         >
            <List  arrLists={data.lists}/>
            {(!hiddenOptionsModal) &&
               <div 
                  className="absolute bg-black bg-opacity-35 top-0 left-0 w-full h-svh"
                  onClick={(e)=> {modalInfos.hiddenModal(e, setHiddenOptionsModal, setHiddenLabelsModal, setHiddenMembersModal,setHiddenCapaModal)}}
                  >
                  <ModalEditCard />
                  <ModalLabels />
                  <ModalMembros />
               </div>
            }
            <ModalCapa />
         </section>
   )
}