import { Children } from "react"

export default function ModalBox({modalName, maxTop, position, setHiddenModal, children}){
   return (
      <div className="modal absolute  bg-white w-[276px] p-[10px] pt-2 rounded-lg"
         style={{ top: `${position.top > maxTop ? maxTop : position.top}px`, left: `${position.left}px` }}
      >
         <h2 className="text-center text-sm font-semibold text-gray-600 mb-3">{modalName}</h2>
         <span
            className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer"
            onClick={() => { setHiddenModal(true) }}
         >close</span>
         {children}
      </div>
   )
}