import { useProvidersContext } from "@/app/context/providers";
import { useState, useEffect } from "react";
import { modalInfos } from "@/app/logica/logica-modais/main";
import { coverHandler } from "@/app/logica/logica-modais/cover-handler";
import ModalBox from "./Modal-Box";


//********************************************************************************************* */
const arrayColors = [
   { color: '#FFC636' },
   { color: '#FF6444' },
   { color: '#00ADA9' },
   { color: '#260273' },
   { color: '#04D99D' },
   { color: '#F205CB' },
   { color: '#7C05F2' },
   { color: '#FEA362' },
   { color: '#94C748' },
   { color: '#8590A2' },
]
const arrayImages = [
   "/images/bg-img-1.jpg", "/images/bg-img-2.jpg", "/images/bg-img-3.jpg",
   "/images/bg-img-4.jpg", "/images/bg-img-5.jpg", "/images/bg-img-6.jpg",
   "/images/bg-img-7.jpg", "/images/bg-img-8.jpg", "/images/bg-img-9.jpg",
]
//********************************************************************************************** */


export default function ModalCapa() {
   const { setHiddenCapaModal } = useProvidersContext();

   const cardInfos = modalInfos.getCardInfos();
   const [model, setModel] = useState();
   const [capa, setCapa] = useState(cardInfos.capa);

   function handleRemoveCapa() {
      coverHandler.removeCover();
      setCapa(cardInfos.capa)
      setModel(3);
   }
   //486

   return (
      <ModalBox modalName={'Capa'} setHiddenModal={setHiddenCapaModal}>
         {capa &&
            <div className="flex flex-col gap-2 p-1">
               <PreviewCapa capa={capa} setCapa={setCapa} model={model} setModel={setModel} />
               <input type="button" value="Remover Capa"
                  className="bg-gray-200 text-[13px] font-semibold w-full 
                           rounded-sm h-8 cursor-pointer hover:bg-gray-300 transition-all"
                  onClick={() => handleRemoveCapa()}
               ></input>
               <Cores capa={capa} setCapa={setCapa} setModel={setModel} />
               <Imagens setCapa={setCapa} />
            </div>
         }
      </ModalBox>
   )
}

function PreviewCapa({ capa, setCapa, model, setModel }) {
   function handleChangeModel(model) {
      if (capa.color == "") return;

      if (model === 1 || model === 3) {
         setModel(1)
         setCapa({ color: `${capa.color}`, full: false, img: "" });
         coverHandler.setCover({ color: `${capa.color}`, full: false, img: "" })
         return;
      }

      setModel(2)
      setCapa({ color: `${capa.color}`, full: true, img: "" });
      coverHandler.setCover({ color: `${capa.color}`, full: true, img: "" })
   }

   return (
      <div className="text-xs">
         <p className="font-semibold mb-1">Tamanho</p>
         <div className="flex justify-between gap-[2px]">
            <div className={`w-[49%] rounded-md cursor-pointer p-[2px]
               ${(model == 1 || capa.color && model != 2) && "outline outline-[3px] outline-blue-500"}`}
               onClick={() => { handleChangeModel(1) }}
            >
               <div className="h-7 rounded-t-[4px]"
                  style={{ backgroundColor: capa.color ? `${capa.color}` : "lightgray" }}
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
               ${model == 2 && "outline outline-[3px] outline-blue-500"}`}
               onClick={() => { handleChangeModel(2) }}
            >
               <div className="h-full p-1 rounded-[4px]"
                  style={{ backgroundColor: capa.color ? `${capa.color}` : "lightgray" }}
               >
                  <span className="rounded-md mb-1 mt-12 h-1 w-full bg-gray-500 block"></span>
                  <span className="rounded-md h-1 w-3/4 bg-gray-500 block"></span>
               </div>
            </div>
         </div>
      </div>
   )
}

function Cores({ capa, setCapa }) {

   function handleChangeColor(capa) {
      coverHandler.setCover(capa);
      setCapa(capa);
   }

   return (
      <div className="text-xs mb-2">
         <p className="font-semibold mb-1">Cores</p>
         <div className="flex gap-[6px] flex-wrap w-full">
            {arrayColors.map(el => (
               <div key={`capa${el.color}`}
                  className={`h-9 w-[18%] rounded-[3px] cursor-pointer p-[1px]
                  ${capa.color == el.color && "outline outline-[3px] outline-blue-500"}`}
                  onClick={() => handleChangeColor({ color: `${el.color}`, full: capa.full, img: "" })}
               >
                  <span className={`h-full w-full block rounded-[3px]`}
                     style={{ backgroundColor: el.color }}
                  >
                  </span>
               </div>
            ))}
         </div>
      </div>
   )
}

function Imagens({ setCapa }) {

   function handleChangeImage(capa) {
      coverHandler.setCover(capa);
      setCapa(capa)
   }

   return (
      <div className="text-xs mb-2">
         <p className="font-semibold mb-1">Imagens</p>
         <div className="flex justify-between gap-[6px] flex-wrap w-full">
            {arrayImages.map(image => (
               <div key={`imgSC${image}`}
                  className="flex-1 min-w-[30%] h-11 bg-black overflow-hidden rounded-sm cursor-pointer"
                  onClick={() => handleChangeImage({ color: "", full: false, img: `${image}` })}
               >
                  <img src={`${image}`} className="w-full h-full object-cover hover:opacity-60 transition-all"></img>
               </div>
            ))}
         </div>
      </div>
   )
}