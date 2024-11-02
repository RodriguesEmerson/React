import { useProvidersContext } from "@/app/context/providers";
import { useCoverContext } from "@/app/context/useCoverContext";
import useCoverHandler from "@/app/hooks/useCoverHandler";
import ModalBox from "./Modal-Box";

export default function ModalCapa() {
   const { setHiddenCapaModal } = useProvidersContext();
   const { coverHandler } = useCoverHandler();

   return (
      <ModalBox modalName={'Capa'} setHiddenModal={setHiddenCapaModal}>
         <div className="flex flex-col gap-2 p-1">
            <PreviewCover />
            <input type="button" value="Remover Capa"
               className="bg-gray-200 text-[13px] font-semibold w-full 
                           rounded-sm h-8 cursor-pointer hover:bg-gray-300 transition-all"
               onClick={() => coverHandler.removeCover()}
            ></input>
            <Colors />
            <Images />
         </div>
      </ModalBox>
   )
}

function PreviewCover() {
   const { coverHandler } = useCoverHandler()
   const { cover, coverStyle } = useCoverContext();
   return (
      <div className="text-xs">
         <p className="font-semibold mb-1">Tamanho</p>
         <div className="flex justify-between gap-[2px]">
            <div className={`w-[49%] rounded-md cursor-pointer p-[2px]
               ${(!coverStyle && cover?.color) ? "outline outline-[3px] outline-blue-500" : ''}`}
               onClick={() => { coverHandler.handleChangeCoverStyle(false) }}
            >
               <div className="h-7 rounded-t-[4px]"
                  style={{ backgroundColor: cover?.color ? `${cover.color}` : "lightgray" }}
               >
               </div>
               <div className=" flex flex-col gap-1 p-1 mt-1">
                  <span className="rounded-md h-1 w-full bg-gray-400 block"></span>
                  <span className="rounded-md h-1 w-3/4 bg-gray-400 block"></span>
                  <div className="flex justify-between items-center">
                     <div className="flex w-2/5 h-4 gap-1 items-center">
                        <span className="rounded-md h-1 w-full bg-gray-400 block"></span>
                        <span className="rounded-md h-1 w-full bg-gray-400 block"></span>
                     </div>
                     <span className="rounded-full h-3 w-3 bg-gray-400 block"></span>
                  </div>
               </div>
            </div>
            <div className={`w-[49%]  rounded-[4px] overflow-hidden cursor-pointer p-[2px]
               ${(coverStyle && cover?.color) ? "outline outline-[3px] outline-blue-500" : ''}`}
               onClick={() => { coverHandler.handleChangeCoverStyle(true) }}
            >
               <div className="h-full p-1 rounded-[4px]"
                  style={{ backgroundColor: cover?.color ? `${cover?.color}` : "lightgray" }}
               >
                  <span className="rounded-md mb-1 mt-12 h-1 w-full bg-gray-500 block"></span>
                  <span className="rounded-md h-1 w-3/4 bg-gray-500 block"></span>
               </div>
            </div>
         </div>
      </div>
   )
}

function Colors() {
   const { cover } = useCoverContext();
   const { coverHandler, arrayColors } = useCoverHandler();

   return (
      <div className="text-xs mb-2">
         <p className="font-semibold mb-1">Cores</p>
         <div className="flex gap-[6px] flex-wrap w-full">
            {arrayColors.map(color => (
               <div key={`capa${color.color}`}
                  className={`h-9 w-[18%] rounded-[3px] cursor-pointer p-[1px]
                  ${cover?.color == color.color && "outline outline-[3px] outline-blue-500"}`}
                  onClick={() => coverHandler.setCover({ color: `${color.color}`, full: cover.full, img: "" })}
               >
                  <span className={`h-full w-full block rounded-[3px]`}
                     style={{ backgroundColor: color.color }}
                  >
                  </span>
               </div>
            ))}
         </div>
      </div>
   )
}

function Images() {
   const { coverHandler, images } = useCoverHandler();

   return (
      <div className="text-xs mb-2">
         <p className="font-semibold mb-1">Imagens</p>
         <div className="flex justify-between gap-[6px] flex-wrap w-full">
            {images.map(image => (
               <div key={`imgSC${image}`}
                  className="flex-1 min-w-[30%] h-11 bg-black overflow-hidden rounded-sm cursor-pointer"
                  onClick={() => coverHandler.setCover({ color: "", full: false, img: `${image}` })}
               >
                  <img src={`${image}`} className="w-full h-full object-cover hover:opacity-60 transition-all"></img>
               </div>
            ))}
         </div>
      </div>
   )
}