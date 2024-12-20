import { useEffect, useState, useRef } from "react";
import { useProvidersContext } from "../context/providers";
import { modalInfos } from "../logica/logica-modais/main";
import dragDrop from "../logica/drag-drop";
import useDateHandler from "../hooks/useDateHandler";
const Cards = (({ cards, setCards }) => {
   return (
      cards.map(card => (
         <Card key={card.id}  card={card} cards={cards} setCards={setCards} />
      ))
   );
})

const Card = (({ card, cards, setCards  }) => {
   const { 
      setPosition, projectId, 
      setHiddenOptionsModal, hiddenOptionsModal, 
   } = useProvidersContext();

   const [isEditingCard, setIsEditingCard] = useState();

   const [cardInfos, setCardInfos] = useState({
      labels: card.labels,
      integrants: card.integrants,
      content: card.content,
      coments: card.coments,
      capa: card.capa,
      periodo: card.periodo,
      id: card.id
   });

   const [texto, setTexto] = useState(cardInfos.content);

   function handleEditingText(e){
      const textArea = textAreaRef.current;
      setTexto(e.target.value);
      textArea.style.height = `${textArea.scrollHeight}px`
   }

   function handleSaveEditions(){
      setCardInfos({...cardInfos, content: texto});
      setHiddenOptionsModal(true);
      setIsEditingCard(false);
   }

   const textAreaRef = useRef(null);
   useEffect(()=>{
      if(!isEditingCard) return;
      textAreaRef.current.select();
      textAreaRef.current.focus();
   },[isEditingCard])

   return (
      <div id={cardInfos.id}
         key={cardInfos.key}
         draggable="true"
         className={`card p-1 cursor-grab flex flex-col gap-1 w-full shadow-4xl 
            rounded-md overflow-hidden relative mb-2 hover:outline outline-2 outline-blue-400 ${!hiddenOptionsModal && "!outline-none"} ${!isEditingCard && "card-hovering"}`}
         style={{ backgroundColor: `${cardInfos.capa.full ? cardInfos.capa.color : "white"}`}}
         onDragStart={(e)=> dragDrop.dragStart(e, cardInfos, cards, setCards)}
         onDragEnd={(e) =>  dragDrop.dragEnd(e, cardInfos)}
      >
         <span
            className="edit-button material-icons-outlined bg-white h-8 w-8 rounded-full  absolute right-1 top-1 !text-center !text-lg hover:bg-gray-100 transition-all pt-1px !hidden"
            onClick={(e) => {
               modalInfos.position(e, setPosition, cardInfos, setCardInfos, setIsEditingCard, projectId);
               setHiddenOptionsModal(false), setIsEditingCard(true);
            }}
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
            <div className="labels flex flex-row gap-1 mb-1">
               <Labels labels={cardInfos.labels} />
            </div>
         }

         <div className="min-h-8 flex items-center">
            {!isEditingCard 
               ? <p className="max-w-full break-words">{cardInfos.content}</p>
               :<textarea 
                  id={`editingCardStatus${cardInfos.id}`} 
                  name="texto" 
                  ref={textAreaRef}
                  className="p-1 outline-none resize-none" 
                  placeholder="Insira um texto" 
                  value={texto}
                  autoFocus
                  onChange={(e)=> handleEditingText(e)}
                  onKeyDown={(e)=>{ e.code == "Enter" && handleSaveEditions()}}
                  // onKeyDown={(e)=>console.log(e.code == "Enter") }
               >
               </textarea>
            }
            
         </div>
         {
            (<div className="flex flex-row flex-wrap gap-2 text-xs text-gray-500 items-center">
               {cardInfos.coments.length > 0 &&
                  <div className="h-4 flex flex-row items-center gap-1">
                     <span className="material-icons !text-lg scale-90 -mt-[2px]">chat</span>
                     <p>{cardInfos.coments.length}</p>
                  </div>
               }
               {
                  <PeriodoCard 
                     periodo={cardInfos.periodo} 
                     cardInfos={cardInfos} 
                     setCardInfos={setCardInfos}
                  />
               }
               {cardInfos.integrants &&
                  <div className="flex flex-row gap-1 justify-end flex-1">
                     <Integrants integrantes={cardInfos.integrants} />
                  </div>
               }
            </div>)
         }
      </div>
   );
})

function PeriodoCard({ periodo, cardInfos, setCardInfos }) {
   const { datesHandler } = useDateHandler();
   if(!periodo.inicio && !periodo.fim) return <></>;

   const [hovering, setHovering] = useState(false);
   function handleMouseOut(e){
      // Verifica se o cursor realmente saiu do elemento pai e não apenas foi para um filho.
      if(!e.currentTarget.contains(e.relatedTarget)){
         setHovering(false)
      } 
   }

   const dataInicio = new Date(periodo.inicio).toLocaleDateString('pt-br', { day: '2-digit', month: 'short' });
   const dataFim = new Date(periodo.fim).toLocaleDateString('pt-br', { day: '2-digit', month: 'short' });

   return (
      <div
         className={`card_periodo h-6 flex flex-row items-center gap-1 p-1 rounded-[3px] ${datesHandler.checkDeadline(periodo)}`}
         onMouseEnter={(e)=> setHovering(true)}
         onMouseOut={(e)=> handleMouseOut(e)}
         onClick={(e)=> datesHandler.toggleStatus(periodo, cardInfos, setCardInfos)}
      >
         <span
            className={`material-icons-outlined !text-lg scale-90 -mt-[3px]`}
         >
           {!hovering 
               ? 'schedule' 
               : periodo.status ? 'check_box' : 'check_box_outline_blank'
            } 
         </span>
         <p>
            {periodo.inicio && periodo.fim 
               ? `${dataInicio} - ${dataFim}` 
               : periodo.inicio && !periodo.fim 
                  ? `Começou: ${dataInicio}` 
                  :  !periodo.inicio && periodo.fim && (dataFim)
            }
         </p>
      </div>
   )
}

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

export default Cards;