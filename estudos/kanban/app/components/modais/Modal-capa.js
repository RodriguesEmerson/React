import { useProvidersContext } from "@/app/context/providers";
import { useState, useEffect  } from "react";
import { editCapa } from "@/app/logica/logica-modais/main";

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

export default function ModalCapa() {
   const {
      position,
      hiddenCapaModal
   } = useProvidersContext();

   const [capa, setCapa] = useState();
   const [modelo, setModelo] = useState();

   useEffect(()=>{
      setCapa(editCapa.capa());
   },[editCapa.capa()]);

   function handleRemoveCapa(){
      editCapa.setCapa({color: "", full: false, img: ""});
      setCapa({color: "", full: false, img: ""});
      setModelo(3);
   }



   return (
      <>
      {!hiddenCapaModal &&
      <div className="modal absolute text-gray-600 bg-white w-[276px] p-1 pt-2 rounded-lg shadow-md"
         style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
         <h2 className="text-center text-sm font-semibold mb-4">Capa</h2>
         <span
            className="material-icons !text-base  absolute top-1 right-2 cursor-pointer"
            onClick={() => { }}
         >close</span>
            {capa &&
               <div className="flex flex-col gap-2 p-1">
                     <PreviewCapa capa={capa} setCapa={setCapa} modelo={modelo} setModelo={setModelo} />
                     <input type="button" value="Remover Capa"
                        className="bg-gray-200 text-[13px] font-semibold w-full 
                           rounded-sm h-8 cursor-pointer hover:bg-gray-300 transition-all"
                        onClick={()=> handleRemoveCapa()}
                     ></input>
                     <Cores capa={capa} setCapa={setCapa} setModelo={setModelo} />
               </div>
            }

      </div>}
      </>
   )
}

function PreviewCapa({ capa, setCapa, modelo, setModelo  }) {
   function handleChangeModel(model){
      if(capa.color == "") return;

      if(model === 1 || modelo === 3){
         setModelo(1)
         setCapa({color: `${capa.color}`, full: false, img: ""});
         editCapa.setCapa({color: `${capa.color}`, full: false, img: ""})
         return;
      }
      
      setModelo(2)
      setCapa({color: `${capa.color}`, full: true, img: ""});
      editCapa.setCapa({color: `${capa.color}`, full: true, img: ""})
   }

   return (
      <div className="text-xs">
         <p className="font-semibold mb-1">Tamanho</p>
         <div className="flex justify-between gap-[2px]">
            <div className={`w-[49%] rounded-md cursor-pointer p-[2px]
               ${(modelo == 1 || capa.color && modelo != 2) && "outline outline-[3px] outline-blue-500"}`}
               onClick={()=> {handleChangeModel(1)}}
            >
               <div className="h-7 rounded-t-[4px]" 
                  style={{ backgroundColor: capa.color ? `${capa.color}` : "lightgray"}}
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
               ${modelo == 2 && "outline outline-[3px] outline-blue-500"}`}
               onClick={()=> {handleChangeModel(2)}}
            >
               <div className="h-full p-1 rounded-[4px]" 
                  style={{ backgroundColor: capa.color ? `${capa.color}` : "lightgray"}}
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

   function handleChangeColor(newColor){
      setCapa(newColor);
      editCapa.setCapa(newColor);
   }

   return (
      <div className="text-xs mb-2">
         <p className="font-semibold">Cores</p>
         <div className="flex gap-[6px] flex-wrap w-full">
            {arrayColors.map(el => (
               <div key={`capa${el.color}`}
                  className={`h-9 w-[18%] rounded-[3px] cursor-pointer p-[1px]
                  ${capa.color == el.color && "outline outline-[3px] outline-blue-500"}`}
                  onClick={() => handleChangeColor({color: `${el.color}`, full: capa.full, img: ""})}
               >
                  <span className={`h-full w-full block rounded-[3px]`}
                     style={{ backgroundColor: el.color }}
                  >
                  </span>
               </div>
            ))
            }
         </div>
      </div>
   )
}