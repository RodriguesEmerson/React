'use client';
import { useCallback, useEffect, useState, memo } from "react";
import { Providers, useProvidersContext } from "../context/providers";
import { modalInfos } from "../logica/logica-modais/main";
import List from "./List";
import ModalEditCard from "./modais/Modal";
import ModalLabels from "./modais/Modal-labels";
import ModalMembros from "./modais/Modal-membros";
import ModalCapa from "./modais/Modal-capa";
import ModalData from "./modais/Modal-data";
import { resolve } from "styled-jsx/css";
let c = 1;

export default function Board({ id }){
   console.log('Board: ', c++)
   const [data, setData] = useState();

   // const updateData = useCallback((response)=>{
   //    setData(response);
   // },[]);
   
   useEffect(()=>{
      const getData = async () =>{
         try {
            const res = await fetch(`/api/projects/${id}`);
            const project = await res.json();
            await new Promise((resolve) => setTimeout(resolve))
            setData(project);
            
         } catch (error) {
            console.log('Erro: ' + error);
         }
         console.log(data)
      }
      getData();
   }, []);

   if(!data) return <></>;
   return(
      <Providers>
         <BoardBody data={data} id={id} />
      </Providers>
   )
}
const BoardBody = memo(({ data, id }) => {
   const { 
      hiddenOptionsModal, setHiddenOptionsModal,
      hiddenLabelsModal, setHiddenLabelsModal,
      projectIntegrants, setProjectIntegrants,
      setHiddenMembersModal, setHiddenCapaModal,
      projectId, setProjectId,
   } = useProvidersContext();
   
   useEffect(() => {
      setProjectIntegrants(data.integrants);
      setProjectId(id)
   }, []);
   
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
                  <ModalCapa />
               </div>
            }
            {/* <ModalData />  */}
         </section>
   )
})