import { useEffect, useRef, useState } from "react"
import { useProvidersContext } from "@/app/context/providers";


export default function ModalBox({ modalName, setHiddenModal, children }) {
   const { position } = useProvidersContext();
   let top = position.top;
   const componentRef = useRef(null);
   const [topPosition, setTopPosition] = useState(position.top);

   useEffect(() => {
      //Calcula o top do modal, para que não passe para fora da tela.
      if (componentRef.current) {
         const modalHeight = componentRef.current.offsetHeight;
         const windowHeight = window.innerHeight - 5;
         if (modalHeight + top > windowHeight) { top = top - (modalHeight + top - windowHeight + 5) };
         setTopPosition(top);
      }
   }, [])

   return (
      <div ref={componentRef} className="modal absolute  bg-white w-[276px] p-[10px] pt-2 rounded-lg"
         style={{ top: `${topPosition}px`, left: `${position.left}px` }}
      >
         <h2 className="text-center text-sm font-semibold text-gray-600 mb-3">{modalName}</h2>
         <span
            className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer rounded-lg w-8 h-8 !leading-8 text-center hover:bg-gray-200"
            onClick={() => { setHiddenModal(true) }}
         >close</span>
         {children}
      </div>
   )
}