import { useProvidersContext } from "../../context/providers"
import modalPosition from "@/app/logica/card-options/modal-position";


const labelsList = [
   {color: '#FFC636'},
   {color: '#FF6444'},
   {color: '#00ADA9'},
   {color: '#260273'},
   {color: '#04D99D'},
   {color: '#F205CB'},
   {color: '#7C05F2'},
   {color: '#F2E307'},
]

export default function ModalLabels(){

   const { setHiddenLabelsModal, position } = useProvidersContext();

   return(
      <div className="modal-labels absolute  bg-white w-64 p-1 rounded-lg" 
         style={{top: `${position.top}px`, left: `${position.left}px`}}
      >
         <p className="text-center text-sm font-semibold text-gray-600 mb-4">Etiquetas</p>
         <span 
            className="material-icons !text-base text-gray-600 absolute top-1 right-1 cursor-pointer"
            onClick={()=> setHiddenLabelsModal(true)}
         >close</span>
         <ul className="flex flex-col gap-[6px]  p-1">
            {labelsList.map(label => (
               <li className="flex gap-2 w-full" key={label.color}>
                  <input className="w-[18px]" type="checkbox" id={`check${label.color}`} />
                  <label 
                     className="w-full block" 
                     htmlFor={`check${label.color}`}
                  >
                     <div className="w-full h-8 rounded cursor-pointer" style={{backgroundColor: `${label.color}`}}></div>
                  </label>
               </li>
            ))}
         </ul>
      </div>
   )
}