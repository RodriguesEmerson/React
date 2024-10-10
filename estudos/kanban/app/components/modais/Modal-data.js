
import { useState, useEffect } from "react";
import { useProvidersContext } from "../../context/providers"
import { datas } from "@/app/logica/logica-modais/main";

const selectOptions = [
   "Nenhum", "Na hora da entrega", "5 minutos antes",
   "10 minutos antes", "15 minutos antes", "1 hora antes",
   "2 horas antes", "1 dia antes", "2 dias antes"
]


export default function ModalData() {
   const {
      position,
   } = useProvidersContext();

   const [lembrete, setLembrete] = useState("Nenhum");
   const [showSelect, setShowSelect] = useState(false);
   const [meses, setMeses] = useState();
   const [mesAno, setMesAnos] = useState({mes: new Date().getMonth(), ano: new Date().getFullYear()})
   const meses3 = datas.calendario(mesAno.mes, mesAno.ano);
   useEffect(()=>{
      setMeses(meses3);
   },[])

   function hangleOpenSelect(){
      setShowSelect(!showSelect);
   }

   return (
      <div className="modal absolute  bg-white w-[276px] p-[10px] pt-2 rounded-lg"
         style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
         <h2 className="text-center text-sm font-semibold text-gray-600 mb-4">Data</h2>
         <span
            className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer"
            onClick={() => { }}
         >close</span>

        <Calendario meses={meses} mesAno={mesAno}/>

         <div className="text-xs mb-2">
            <p className="font-semibold mb-1 text-gray-600">Data Início</p>
            <div className="flex items-center gap-[6px] mb-3">
               <input className="w-[18px] h-[18px]" type="checkbox"
                  onChange={() => { }}
               />
               <input type="text" className="w-24 h-8 border border-gray-400 rounded-[3px] pl-2 focus-within:outline-blue-400"
                  placeholder="D/M/AAA"
               />
            </div>

            <p className="font-semibold mb-1 text-gray-600">Data de entrega</p>
            <div className="flex items-center gap-[6px]  mb-3">
               <input className="w-[18px] h-[18px]" type="checkbox"
                  onChange={() => { }}
               />
               <input type="text" className="w-24 h-8 border border-gray-400 rounded-[3px] pl-2 focus-within:outline-blue-400"
                  placeholder="D/M/AAA"
               />
               <input type="text" className="w-24 h-8 border border-gray-400 rounded-[3px] pl-2 focus-within:outline-blue-400"
                  placeholder="hh:mm"
               />
            </div>

            <p className="font-semibold mb-1 text-gray-600">Definir lembrete</p>
            <div className={`flex items-center gap-[6px] relative border border-gray-400 rounded-[3px] pl-2 w-full h-8 cursor-pointer
               ${showSelect && "outline outline-[1px] outline-blue-500 border-blue-500"}`}
               onClick={()=>{hangleOpenSelect()}}
            >
               <p>{lembrete}</p>
               {showSelect &&
                  <ul className="bg-white border text-[13px] border-gray-200 py-2 -ml-2 rounded-md  absolute bottom-9 w-full">
                     {selectOptions.map(option =>(
                        <li key={`select${option}`} className="option-modal-data relative h-7 leading-7 pl-2 cursor-pointer hover:bg-gray-100 "
                           onClick={()=> setLembrete(option)}
                        >
                           <span className={`w-[3px] h-full ${lembrete == option ? "block" : "hidden"} bg-blue-500 absolute left-0 top-0 -m-[1px]`}></span>
                           <p>{option}</p>
                        </li>
                     ))}
                  </ul>
               }
            </div>
         </div>
         <input type="submit" value="Salvar" 
            className="text-xs font-semibold text-white w-full h-8 bg-blue-600 cursor-pointer 
               hover:bg-blue-700 transition-all rounded-[3px]"
         />
      </div>
   )
}

function Calendario({ meses, mesAno }){
   const hoje = new Date().getDate();
   const diasMesAtual = []
   const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'];
   const diaDaSemana = datas.primeiroDiaMes(mesAno.mes, mesAno.ano);

   for(let dia = 1; dia <= meses?.mAtual; dia++){
      diasMesAtual.push(dia)
   }
   return(
      <div className="grid grid-cols-7 mb-2">
         {diasDaSemana.map(dia =>(
            <span key={`weedDay${dia}`} className={`text-xs  text-center font-semibold mb-2 ${dia == "Dom" && "text-red-500"}`}>{dia}</span>
         ))}
         {diaDaSemana.map(dia =>(
            <span key={`mAnterio${dia}`}></span>
         ))}
         {diasMesAtual.map(dia =>(
            <span key={`monthDay${dia}`} className={`h-8 leading-8 rounded-[3px] text-[14px] text-center hover:bg-gray-100 transition-all
               cursor-pointer
               ${hoje == dia && "text-blue-600 font-bold border-b-[3px] border-b-blue-600"}`
            }>{dia}</span>
         ))}   
      </div>
   )
}