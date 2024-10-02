import { useProvidersContext } from "../../context/providers"
import modalPosition from "@/app/logica/card-options/modal-position";
import { AddRemoveLabels } from "@/app/logica/card-options/modal-position";
import { useEffect, useState } from "react";

const labelsList = [
   { color: '#FFC636' },
   { color: '#FF6444' },
   { color: '#00ADA9' },
   { color: '#260273' },
   { color: '#04D99D' },
   { color: '#F205CB' },
   { color: '#7C05F2' },
   { color: '#F2E307' },
]

export default function ModalLabels() {

   const { setHiddenLabelsModal, hiddenLabelsModal, position } = useProvidersContext();
   if (hiddenLabelsModal) return <></>;
   const currLabels = AddRemoveLabels.currLabels();

   return (
      <div className="modal-labels absolute  bg-white w-64 p-1 rounded-lg"
         style={{ top: `${position.top}`, left: `${position.left}` }}
      >
         <p className="text-center text-sm font-semibold text-gray-600 mb-4">Etiquetas</p>
         <span
            className="material-icons !text-base text-gray-600 absolute top-1 right-1 cursor-pointer"
            onClick={() => setHiddenLabelsModal(true)}
         >close</span>
         <ul className="flex flex-col gap-[6px]  p-1">
            {labelsList.map(label => (
               <Label label={label} currLabels={currLabels} key={label.color}/>
            ))}
         </ul>
      </div>
   )
}

function Label({ label, currLabels }) {
   const [checked, setChecked] = useState(false);
   useEffect(()=>{
      currLabels.includes(label.color) && setChecked(true);
   },[])
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