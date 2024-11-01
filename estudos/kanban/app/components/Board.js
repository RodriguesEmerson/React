'use client';
import { useCallback, useEffect, useState, memo } from "react";
import { Providers, useProvidersContext } from "../context/providers";
import { DateProvider, useDateContext } from "../context/useDateContext";
import { CoverProvider, useCoverContext } from "@/app/context/useCoverContext";
import { modalInfos } from "../logica/logica-modais/main";
import List from "./List";
import ModalEditCard from "./modais/Modal";
import ModalLabels from "./modais/Modal-labels";
import ModalMembros from "./modais/Modal-membros";
import ModalCapa from "./modais/Modal-capa";
import ModalData from "./modais/Modal-data";
import ModalMover from "./modais/Modal-mover";
import ModalCopiar from "./modais/Modal-copiar";
import Skeleton from "./skeleton";
let c = 1;

//Criei isso para impedir renderizações desnesessárias.
//procurei outras formas, mas ainda não encontrei.
let dataLoaded = false;

export default function Board({ id }) {

   const [data, setData] = useState();

   const updateData = useCallback((response) => {
      setData(response);
   }, []);

   useEffect(() => {
      const getData = async () => {
         if (dataLoaded) return;
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

   if (!data) return <Skeleton />;
   return (
      <Providers>
         <DateProvider>
         <CoverProvider>
            <BoardBody data={data} id={id} />
         </CoverProvider>
         </DateProvider>
      </Providers>
   )
}

const BoardBody = memo(({ data, id }) => {
   // console.log('Board: ', c++)

   const {
      hiddenOptionsModal, setHiddenOptionsModal,
      hiddenLabelsModal, setHiddenLabelsModal,
      hiddenMembersModal, setHiddenMembersModal,
      hiddenCapaModal, setHiddenCapaModal,
      hiddenDataModal, setHiddenDataModal,
      projectIntegrants, setProjectIntegrants,
      hiddenMoverModal, setHiddenMoverModal,
      hiddenCopiarModal, setHiddenCopiarModal,
      projectId, setProjectId,
   } = useProvidersContext();

   const [lists, setLists] = useState();

   useEffect(() => {
      setProjectIntegrants(data.integrants);
      setProjectId(id);
      setLists(data.lists);
   }, [data]);

   const handleDragOver = (e) => {
      e.preventDefault();
   }

   return (
      <section className={`board flex flex-row items-start p-2 ml-2 gap-3 pt-[68px]`}
         onDragOver={(e) => { handleDragOver(e) }}
         // style={{
         //    backgroundImage: 'url(/images/bg-img-5.jpg)', 
         //    backgroundRepeat: "no-repeat", 
         //    backgroundSize: "cover",
         //    backgroundPosition: "center"
         // }}
      >
         <List lists={lists} setLists={setLists} />
         {(!hiddenOptionsModal) &&
            <div
               className={`bg-modal absolute bg-black bg-opacity-55 top-0 left-0 w-full  h-full`}
               onClick={(e) => { modalInfos.hiddenModal(e, setHiddenOptionsModal, setHiddenLabelsModal, setHiddenMembersModal, setHiddenCapaModal, setHiddenDataModal, setHiddenMoverModal) }}
               style={{ width: `${document.querySelector('.board').offsetWidth + 12}px` }}
            >
               <ModalEditCard arrLists={lists} setLists={setLists} />
               {!hiddenLabelsModal &&
                  <ModalLabels />
               }
               {!hiddenMembersModal &&
                  <ModalMembros />
               }
               {!hiddenCapaModal &&
                  <ModalCapa />
               }
               {!hiddenDataModal &&
                  <ModalData />
               }
               {!hiddenMoverModal &&
                  <ModalMover arrLists={lists} setLists={setLists} />
               }
               {!hiddenCopiarModal && 
                  <ModalCopiar arrLists={lists} setLists={setLists}/>
               }
            </div>
         }
      </section>
   )
})