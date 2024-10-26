import { useEffect, useRef, useState } from "react"
import { useProvidersContext } from "@/app/context/providers";


export default function ModalBox({modalName, setHiddenModal, children}){
   const { position } = useProvidersContext();
   const bgModalHeight = document.querySelector('.bg-modal').offsetHeight;
   let top = position.top;
   
   const componentRef = useRef(null);
   const [topPosition, setTopPosition] = useState(position.top);
   
   useEffect(()=>{
      //Calcula o top do modal, para que não passe para fora da tela.
      if(componentRef.current){
         const modalHeight = componentRef.current.offsetHeight;
         if(modalHeight + top > bgModalHeight - 10) { top = top - (modalHeight + top  - bgModalHeight + 11) };
         setTopPosition(top);
      }
    },[])

   return (
      <div ref={componentRef} className="modal absolute  bg-white w-[276px] p-[10px] pt-2 rounded-lg"
         style={{ top: `${topPosition}px`, left: `${position.left}px` }}
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