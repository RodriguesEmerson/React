import dragDrop from "./drag-drop";

export default function Card({ cards }) {

   return (
      cards.map(card => (
         <div key={card.id} id={card.id} draggable="true" className="card cursor-grab flex flex-col gap-1 w-full shadow-4xl rounded bg-white p-2 relative mb-2" 
            onDragStart={(e) => {dragDrop.dragStart(e)}}
            onDragOver={(e) => {dragDrop.dragOver(e)}}
            onDragEnd={dragDrop.dragEnd}
            onDragEnter={(e)=> e.stopPropagation()}
            >
            {card.img ? 
               <div className="h-36 overflow-hidden rounded-t-sm ">
                  <img className="max-w-full object-cover" draggable="false" src={card.img}></img>
               </div>
               : ''
            }
            {card.labels ?
               <div className="flex flex-row gap-1 h-4">
                  <Labels  labels={card.labels}/>
               </div> : ''
            }
            
            <div>
               <p>{card.content}</p>
            </div>
            <div className="flex flex-row flex-wrap gap-2 text-sm text-gray-500">
               <div className="flex flex-row items-center gap-1">
                  <span className="material-icons">chat</span>
                  <p>{card.coments.length}</p>
               </div>
               <div className="flex flex-row items-center gap-1">
                  <span className="material-icons">schedule</span>
                  <p>{new Date(card.data).toLocaleDateString('pt-br', {day: '2-digit', month: 'long', year: 'numeric'})}</p>
               </div>
               <div className="flex flex-row gap-1 justify-end flex-1">
                  <Profile integrantes={card.integrants}/>
               </div>
            </div>
         </div>
      ))
   );
}

function Labels({ labels }) {
   return (
      labels.map(label =>(
         <span key={label} className={`w-12 h-2 ${label} rounded-lg`}></span>
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