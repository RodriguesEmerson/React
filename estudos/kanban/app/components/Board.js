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
import ModalMover from "./modais/Modal-mover";
import Skeleton from "./skeleton";
let c = 1;

//Criei isso para impedir renderizações desnesessárias.
//procurei outras formas, mas ainda não encontrei.
let dataLoaded = false;

export default function Board({ id }){

   const [data, setData] = useState();

   const updateData = useCallback((response)=>{
      setData(response);
   },[]);
   
   useEffect(()=>{ 
      const getData = async () =>{
         if(dataLoaded) return;
         dataLoaded = true;
         try {
            const res = await fetch(`/api/projects/${id}`);
            const project = await res.json();
            updateData(project);
            
         } catch (error) { 
            console.log('Erro: ' + error);
         }
      }
      getData();
   }, []);
   
   if(!data) return <Skeleton />;
   return(
      <Providers>
         <BoardBody data={data} id={id} />
      </Providers>
   )
}

const BoardBody = memo(({ data, id }) => {
   // console.log('Board: ', c++)

   const { 
      hiddenOptionsModal, setHiddenOptionsModal,
      setHiddenLabelsModal, setProjectIntegrants,
      setHiddenMembersModal, setHiddenCapaModal,
      setHiddenDataModal, setHiddenMoverModal,
      projectId, setProjectId,
   } = useProvidersContext();

   const [lists, setLists] = useState();

   useEffect(() => {
      setProjectIntegrants(data.integrants);
      setProjectId(id);
      setLists(data.lists);
   }, [data]);
   
   const handleDragOver = (e) =>{
      e.preventDefault();
   }

   return(
      <section className={`board flex flex-row items-start p-2 ml-2 gap-3 mt-16`}
         onDragOver={(e)=> {handleDragOver(e)}}
         >
            <List  lists={lists} setLists={setLists}/>
            {(!hiddenOptionsModal) &&
               <div 
                  className={`absolute bg-black bg-opacity-35 top-0 left-0  h-full`}
                  onClick={(e)=> {modalInfos.hiddenModal(e, setHiddenOptionsModal, setHiddenLabelsModal, setHiddenMembersModal,setHiddenCapaModal, setHiddenDataModal, setHiddenMoverModal)}}
                  style={{width: `${document.querySelector('.board').offsetWidth + 10}px`}}
                  >
                  <ModalEditCard />
                  <ModalLabels />
                  <ModalMembros />
                  <ModalCapa />
                  <ModalData /> 
                  <ModalMover arrLists={lists} setLists={setLists}/>
               </div>
            }
         </section>
   )
})