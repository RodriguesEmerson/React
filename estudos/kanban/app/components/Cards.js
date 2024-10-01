import { useState } from "react";
import { useProvidersContext } from "../context/providers";
import modalPosition from "../logica/card-options/modal-position";

export default function Cards({ cards }) {

   return (
      cards.map(card => (
         <Card key={card.id} card={card} />
      ))
   );
}

function Card({ card }) {
   const [hidden, setHidden] = useState(true);
   const { setPosition, setHiddenOptionsModal } = useProvidersContext();

   return (
      <div  id={card.id}
         onMouseEnter={() => setHidden(false)}
         onMouseLeave={() => setHidden(true)}
         draggable="true"
         className="card p-1 cursor-grab flex flex-col gap-1 w-full shadow-4xl rounded-md overflow-hidden bg-white relative mb-2"
      >
         {!hidden &&
            <span
              className="material-icons-outlined bg-white h-8 w-8 rounded-full  absolute right-1 top-1 !text-center !text-lg hover:bg-gray-100 transition-all pt-1px"
               onClick={(e)=> {modalPosition.position(e, setPosition); setHiddenOptionsModal(false)}}
            >edit</span>
         }
         {card.img &&
            <div className="h-36 overflow-hidden rounded-t-sm -m-1">
               <img className="max-w-full object-cover" draggable="false" src={card.img}></img>
            </div>
         }
         {
            <div className="labels flex flex-row gap-1">
               <Labels labels={card.labels} />
            </div>
         }

         <div className="min-h-8 flex items-center">
            <p className="max-w-full break-words">{card.content}</p>
         </div>
         {(card.coments.length > 0 || card.prazo || card.integrants.length > 0) &&
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
               }{card.integrants &&
                  <div className="flex flex-row gap-1 justify-end flex-1">
                     <Profile integrantes={card.integrants} />
                  </div>
               }
            </div>)
         }
      </div>
   );
}

function Labels({ labels }) {
   return (
      labels.map(label => (
         <span key={label} className={`w-12 h-2 rounded-lg mt-2 mb-[-5px]`} data-color={`${label}`} style={{ backgroundColor: `${label}` }}></span>
      ))
   )
}
function Profile({ integrantes }) {
   return (
      integrantes.map(avatar => (
         <div key={avatar.nome} className="h-7 w-7 rounded-full bg-gray-600 overflow-hidden">
            <img src={avatar.avatar} className="max-w-full object-cover"></img>
         </div>
      ))
   )
}