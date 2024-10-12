import { useEffect, useState, memo } from "react";
import { useProvidersContext } from "../context/providers";
import { modalInfos } from "../logica/logica-modais/main";

let c = 1;
const Cards = memo(({ cards }) => {
   return (
      cards.map(card => (
         <Card key={card.id} card={card} />
      ))
   );
})

export default Cards;

const Card = memo(({ card }) => {
   const { setPosition, setHiddenOptionsModal } = useProvidersContext();
   const [cardInfos, setCardInfos] = useState({
      labels: card.labels,
      integrants: card.integrants,
      text: card.content,
      coments: card.coments,
      capa: card.capa,
      dates: { inicio: card.data, prazo: card.prazo }
   });


   if (!cardInfos) return <></>;
   return (
      <div id={card.id}
         draggable="true"
         className={`card p-1 cursor-grab flex flex-col gap-1 w-full shadow-4xl 
            rounded-md overflow-hidden relative mb-2 `}
         style={{ backgroundColor: `${cardInfos.capa.full ? cardInfos.capa.color : "white"}` }}
      >
         
         <span
            className="edit-button material-icons-outlined bg-white h-8 w-8 rounded-full  absolute right-1 top-1 !text-center !text-lg hover:bg-gray-100 transition-all pt-1px !hidden"
            onClick={(e) => {
               modalInfos.position(
                  e, setPosition, setHiddenOptionsModal, cardInfos, setCardInfos
               );
               setHiddenOptionsModal(false);
            }
            }
         >edit</span>
         
         {(cardInfos.capa.img) &&
            <div className="h-36 overflow-hidden rounded-t-sm -m-1">
               <img className="w-full h-full object-cover" draggable="false" src={cardInfos.capa.img}></img>
            </div>
         }
         {(cardInfos.capa.color && !cardInfos.capa.full) &&
            <div className="h-12 overflow-hidden rounded-t-sm -m-1">
               <div className="h-full w-full" style={{ backgroundColor: cardInfos.capa.color }}></div>
            </div>
         }
         {
            <div className="labels flex flex-row gap-1">
               <Labels labels={cardInfos.labels} />
            </div>
         }

         <div className="min-h-8 flex items-center">
            <p className="max-w-full break-words">{cardInfos.text}</p>
         </div>
         {
            (<div className="flex flex-row flex-wrap gap-2 text-sm text-gray-500">
               {cardInfos.coments.length > 0 &&
                  <div className="flex flex-row items-center gap-1">
                     <span className="material-icons !text-lg">chat</span>
                     <p>{cardInfos.coments.length}</p>
                  </div>
               }
               {cardInfos.prazo &&
                  <div className="flex flex-row items-center gap-1">
                     <span className="material-icons !text-lg">schedule</span>
                     <p>{new Date(cardInfos.prazo).toLocaleDateString('pt-br', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  </div>
               }{cardInfos.integrants &&
                  <div className="flex flex-row gap-1 justify-end flex-1">
                     <Integrants integrantes={cardInfos.integrants} />
                  </div>
               }
            </div>)
         }
      </div>
   );
})

function Labels({ labels }) {

   return (
      labels.map(label => (
         <span key={label} className={`w-12 h-2 rounded-lg mt-2 mb-[-5px]`} data-color={`${label}`} style={{ backgroundColor: `${label}` }}></span>
      ))
   )
}
function Integrants({ integrantes }) {
   return (
      integrantes.map(avatar => (
         <div key={avatar.nome} className="h-7 w-7 rounded-full bg-gray-600 overflow-hidden">
            <img src={avatar.avatar} className="max-w-full object-cover"></img>
         </div>
      ))
   )
}