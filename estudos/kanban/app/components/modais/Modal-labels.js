import { useProvidersContext } from "../../context/providers"
import { modalInfos, AddRemoveLabels } from "@/app/logica/logica-modais/main";
import { useEffect, useState } from "react";

const labelsList = [
   { color: '#FFC636' },
   { color: '#FF6444' },
   { color: '#00ADA9' },
   { color: '#260273' },
   { color: '#04D99D' },
   { color: '#F205CB' },
   { color: '#7C05F2' },
]

export default function ModalLabels() {
   const { 
      position,
      setHiddenLabelsModal, 
      hiddenLabelsModal, 
   } = useProvidersContext();
   const cardInfos = modalInfos.getCardInfos();
   return (
      <>
      {!hiddenLabelsModal &&
         <div className="modal absolute  bg-white w-64 p-1 pt-2 rounded-lg"
            style={{ top: `${position.top > 365 ? 365 : position.top}px`, left: `${position.left}px` }}
         >
            <h2 className="text-center text-sm font-semibold text-gray-600 mb-4">Etiquetas</h2>
            <span
               className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer"
               onClick={() => {setHiddenLabelsModal(true)}}
            >close</span>
            <ul className="flex flex-col gap-[6px]  p-1">
               {labelsList.map(label => (
                  <Label label={label} editingLabels={cardInfos.labels} cardInfos={cardInfos} key={label.color}/>
               ))}
            </ul>
         </div>
      }
      </>
   )
}

function Label({ label, editingLabels, cardInfos }) {
   const [checked, setChecked] = useState(false);
   useEffect(()=>{
      editingLabels.includes(label.color) && setChecked(true);
   },[]);

   return (
      <li className="flex gap-2 w-full" key={label.color}>
         <input className="w-[18px]" type="checkbox" id={`check${label.color}`}
            checked={checked} //Verifica se há alguma cor selecionada, se sim, seta checcked;
            onChange={() => { AddRemoveLabels.setLabels(label.color); setChecked(!checked) }}
         />
         <label
            className={"w-full block"}
            htmlFor={`check${label.color}`}
         >
            <div className="w-full h-8 rounded cursor-pointer" style={{ backgroundColor: `${label.color}` }}></div>
         </label>
      </li>
   )
}