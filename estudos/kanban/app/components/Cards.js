import { useEffect, useState } from "react";
import { useProvidersContext } from "../context/providers";
import { modalInfos } from "../logica/logica-modais/main";

export default function Cards({ cards }) {

   return (
      cards.map(card => (
         <Card key={card.id} card={card} />
      ))
   );
}

function Card({ card }) {
   const { setPosition, setHiddenOptionsModal } = useProvidersContext();
   const [hidden, setHidden] = useState(true);
   const [labels, setLabels] = useState();
   const [integrants, setIntegrants] = useState();
   const [capa, setCapa] = useState();

   useEffect(()=>{
      setLabels(card.labels);
      setIntegrants(card.integrants);
      setCapa(card.capa);
   },[card.labels, card.integrants, card.card]);

   return (
      <div  id={card.id}
         onMouseEnter={() => setHidden(false)}
         onMouseLeave={() => setHidden(true)}
         draggable="true"
         className={`card p-1 cursor-grab flex flex-col gap-1 w-full shadow-4xl 
            rounded-md overflow-hidden relative mb-2 `}
         style={{backgroundColor:`${capa?.full ? capa.color : "white"}`}}
      >
         {!hidden &&
            <span
              className="material-icons-outlined bg-white h-8 w-8 rounded-full  absolute right-1 top-1 !text-center !text-lg hover:bg-gray-100 transition-all pt-1px"
               onClick={(e)=> {
                  modalInfos.position(
                     e, setPosition, 
                     labels, setLabels, 
                     integrants, setIntegrants,
                     capa, setCapa
                  );
                  setHiddenOptionsModal(false)}
               }
            >edit</span>
         }
         {(capa?.img) &&
            <div className="h-36 overflow-hidden rounded-t-sm -m-1">
               <img className="w-full h-full object-cover" draggable="false" src={capa.img}></img>
            </div>
         }
         {(capa?.color && !capa.full) &&
            <div className="h-12 overflow-hidden rounded-t-sm -m-1">
               <div className="h-full w-full" style={{backgroundColor: capa.color}}></div>
            </div>
         }
         {
            <div className="labels flex flex-row gap-1">
               <Labels labels={labels} />
            </div>
         }

         <div className="min-h-8 flex items-center">
            <p className="max-w-full break-words">{card.content}</p>
         </div>
         {
            (<div className="flex flex-row flex-wrap gap-2 text-sm text-gray-500">
               {card.coments.length > 0 &&
                  <div className="flex flex-row items-center gap-1">
                     <span className="material-icons !text-lg">chat</span>
                     <p>{card.coments.length}</p>
                  </div>
               }
               {card.prazo &&
                  <div className="flex flex-row items-center gap-1">
                     <span className="material-icons !text-lg">schedule</span>
                     <p>{new Date(card.data).toLocaleDateString('pt-br', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  </div>
               }{integrants &&
                  <div className="flex flex-row gap-1 justify-end flex-1">
                     <Integrants integrantes={integrants} />
                  </div>
               }
            </div>)
         }
      </div>
   );
}

function Labels({ labels }) {
   if(!labels) return(
      <>
      <span key={"skl1"} className={`w-12 h-2 bg-gray-300 rounded-lg mt-2 mb-[-5px]`}></span>
      <span key={"skl2"} className={`w-12 h-2 bg-gray-300 rounded-lg mt-2 mb-[-5px]`}></span>
      </>
   )
   return (
      labels.map(label => (
         <span key={label} className={`w-12 h-2 rounded-lg mt-2 mb-[-5px]`} data-color={`${label}`} style={{ backgroundColor: `${label}` }}></span>
      ))
   )
}
function Integrants({ integrantes }) {
   if(!integrantes)return(
      <div key={'integr1'} className="h-7 w-7 rounded-full bg-gray-600 overflow-hidden"></div>
   )
   return (
      integrantes.map(avatar => (
         <div key={avatar.nome} className="h-7 w-7 rounded-full bg-gray-600 overflow-hidden">
            <img src={avatar.avatar} className="max-w-full object-cover"></img>
         </div>
      ))
   )
}