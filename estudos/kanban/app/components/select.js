import { useState } from "react";

export default function Select({option, setOptions, optionList, chave, width }) {

   const [showOptions, setShowOptions] = useState(false);

   return (
      <div
         className={`flex items-center text-xs gap-[6px] mb-1 relative border border-gray-400 rounded-[3px] pl-2 pr-1 h-9 cursor-pointer justify-between ${showOptions && "!border !border-blue-500 outline outline-1 outline-blue-500"}`} 
         style={{width: width}}
         onClick={() => setShowOptions(!showOptions)}
      >
         <p>{option}</p>
         {showOptions &&
            <ul className="border text-[13px] border-gray-200 py-2 -ml-2 absolute rounded-md bg-white bottom-9 w-full">
               {typeof(optionList[0]) == "object"
               ?  optionList.map(element => (
                     <li key={`slM${element.listId}`} className="option-modal-data relative h-8 leading-7 pl-2 cursor-pointer hover:bg-gray-100 "
                        onClick={() => { setOptions(element) }}
                     >
                        <span className={`w-[3px] h-full ${option == element[chave] ? "block" : "hidden"} bg-blue-500 absolute left-0 top-0 -m-[1px]`}></span>
                        <p>{element[chave]}</p>
                     </li>
                    
                  ))
               :  optionList.map(element => (
                     <li key={`ilM${element}`} className="option-modal-data relative h-8 leading-7 pl-2 cursor-pointer hover:bg-gray-100 "
                        onClick={() => { setOptions(element) }}
                     >
                        <span className={`w-[3px] h-full ${option == element ? "block" : "hidden"} bg-blue-500 absolute left-0 top-0 -m-[1px]`}></span>
                        <p>{element}</p>
                     </li>
                  
                  ))
               }
            </ul>
         }
         <span className={`material-icons !text-base transition-all ${showOptions && "rotate-180"}`}>keyboard_arrow_up</span>
      </div>
   )
}