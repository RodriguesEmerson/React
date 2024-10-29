
import { modalInfos } from "@/app/logica/logica-modais/main";
import { useEffect, useState } from "react";
import { useProvidersContext } from "../../context/providers";
import { ButtonSaveDefault } from "../buttons";
import { datesHandler } from "@/app/logica/logica-modais/date-handler";
import Select from "../select";
import ModalBox from "./Modal-Box";


const selectOptions = [
   "Nenhum", "Na hora da entrega", "5 minutos antes",
   "10 minutos antes", "15 minutos antes", "1 hora antes",
   "2 horas antes", "1 dia antes", "2 dias antes"
]
const weekDays = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'];
const yearMonths = [
   'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
   'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function ModalData() {
   const { setHiddenDataModal } = useProvidersContext();

   const [lembrete, setLembrete] = useState("Nenhum");
   const [monthEndYear, setMonthEndYear] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
   const [period, setPeriod] = useState(modalInfos.getPeriodo());
   const [dateType, setDateType] = useState(true); //true = inicio, false = fim;
   datesHandler.editingPeriod = period;

   function handleClickSave(e) {
      e.preventDefault(); datesHandler.setPeriodo(); setHiddenDataModal(true)
   }

   return (
      <ModalBox modalName={'Data'} setHiddenModal={setHiddenDataModal}>
         <Calendar
            monthEndYear={monthEndYear}
            setMonthEndYear={setMonthEndYear}
            period={period}
            setPeriod={setPeriod}
            dateType={dateType}
            setDateType={setDateType}
         />

         <ButtonsMudarPeriod
            period={period}
            setPeriod={setPeriod}
            dateType={dateType}
         />

         <p className="font-semibold text-xs mb-1 text-gray-600">Definir lembrete</p>
         <Select 
            option={lembrete} 
            setOptions={setLembrete} 
            optionList={selectOptions} 
            chave={'none'} 
            width={'100%'}
         />

         <ButtonSaveDefault
            type={'submit'}
            value={'Salvar'}
            width={'100%'}
            handleClick={handleClickSave}
         />
      </ModalBox>
   )
}

function Calendar({ monthEndYear, setMonthEndYear, period, dateType, setDateType, setPeriod }) {
   const today = new Date().getDate();
   const currMonth = new Date().getMonth();
   const calendar = datesHandler.calendar(monthEndYear.month, monthEndYear.year);

   let { month, year } = monthEndYear;

   function handleChangeMonth(arrow) {
      if (arrow == 'next') {
         setMonthEndYear({ month: (month + 1) % 12, year: month == 11 ? monthEndYear.year + 1 : monthEndYear.year })
         return;
      }

      setMonthEndYear({ month: month == 0 ? 11 : monthEndYear.month - 1, year: month == 0 ? monthEndYear.year - 1 : monthEndYear.year })
   }

   return (
      <div>
         <div className="flex justify-between items-center  text-gray-600 mb-3">
            <span
               className="material-icons h-7 w-7 pt-[2px] text-center hover:bg-gray-200 cursor-pointer rounded"
               onClick={() => handleChangeMonth('previous')}
            >chevron_left
            </span>
            <p className="text-xs font-semibold cursor-default">
               {`${yearMonths[monthEndYear.month]} de ${monthEndYear.year}`}
            </p>
            <span
               className="material-icons h-7 w-7 pt-[2px] text-center hover:bg-gray-200 cursor-pointer rounded"
               onClick={() => handleChangeMonth('next')}
            >chevron_right
            </span>
         </div>
         <div className="grid grid-cols-7 mb-2">
            {weekDays.map(day => (
               <span
                  key={`weedDay${day}`}
                  className={`text-xs  text-center font-semibold mb-2 ${day == "Dom" && "text-red-700"}`}
               >{day}</span>
            ))}

            {calendar.lastDaysOfPreviousMonth.map(day => (
               <span
                  key={`mAnte${day}`}
                  className={`h-8 leading-8 rounded-[3px] text-[14px] text-center  hover:bg-gray-100 text-gray-400 cursor-pointer border border-white
                     ${(datesHandler.isDateInAnalyzedPeriod(period, day, month, year, 'ante') && "bg-blue-100 hover:!bg-blue-300")}
                  `}
                  onClick={() => {
                     dateType
                     ? datesHandler.handleStartDate(`${day}/${month}/${year}`, period.fim, false, setPeriod)
                     : datesHandler.handleEndDate(`${day}/${month}/${year}`, period.inicio, false, setPeriod);
                     setDateType(!dateType)
                  }}
               >{day}</span>
            ))}

            {calendar.currentMonthDays.map(day => (
               <span
                  key={`monthDay${day}`}
                  className={`h-8 leading-8 rounded-[3px] text-[14px] text-center hover:bg-gray-100   cursor-pointer border border-white
                     ${(today == day && monthEndYear.month == currMonth) && "text-blue-600 font-bold border-b-[3px] border-b-blue-600"}
                     ${(datesHandler.isDateInAnalyzedPeriod(period, day, month + 1, year) && "bg-blue-100 hover:!bg-blue-300")}
                  `}
                  onClick={() => {
                     dateType
                        ? datesHandler.handleStartDate(`${day}/${month + 1}/${year}`, period.fim, false, setPeriod)
                        : datesHandler.handleEndDate(`${day}/${month + 1}/${year}`, period.inicio, false, setPeriod);
                     setDateType(!dateType)
                  }}
               >{day}</span>
            ))}

            {calendar.firstDaysOfNextMonth.map(day => (
               <span
                  key={`mAnte${day}`}
                  className={`h-8 leading-8 rounded-[3px] text-[14px] text-center  hover:bg-gray-100 text-gray-400 cursor-pointer border border-white
                     ${(datesHandler.isDateInAnalyzedPeriod(period, day, month + 2, year) && "bg-blue-100 hover:!bg-blue-300")}
                  `}
                  onClick={() => {
                     dateType
                     ? datesHandler.handleStartDate(`${day}/${month + 2}/${year}`, period.fim, false, setPeriod)
                     : datesHandler.handleEndDate(`${day}/${month + 2}/${year}`, period.inicio, false, setPeriod);
                     setDateType(!dateType)
                  }}
               >{day}</span>
            ))}
         </div>
      </div>
   )
}

function ButtonsMudarPeriod({ period, setPeriod, dateType}) {
   const [hasStartDate, setHasStartDate] = useState();
   const [hasEndDate, setHasEndDate] = useState();
   const [startDate, setStartDate] = useState(datesHandler.dateConvert(period.inicio, 'br'));
   const [endDate, setEndDate] = useState(datesHandler.dateConvert(period.fim, 'br'));

   useEffect(() => {
      period.inicio && setHasStartDate(true);
      period.fim && setHasEndDate(true);
      setStartDate(datesHandler.dateConvert(period.inicio, 'br'));
      setEndDate(datesHandler.dateConvert(period.fim, 'br'));
   }, [period])

   return (
      <div className="text-xs mb-2">
         <p className="font-semibold mb-1 text-gray-600">Data Início</p>
         <div className="flex items-center gap-[6px] mb-3">
            <input
               className="w-[18px] h-[18px]" type="checkbox"
               checked={hasStartDate ? true : false}
               onChange={(e) => {
                  setHasStartDate(!hasStartDate);
                  !e.target.checked
                     ? datesHandler.handleStartDate(period.inicio, period.fim, true, setPeriod)
                     : datesHandler.handleStartDate(datesHandler.today(), period.fim, false, setPeriod);
               }}
            />
            <input
               type="text"
               className={`w-[100px] h-8 border border-gray-400 rounded-[3px] pl-2 focus-within:outline-blue-400 
                  ${!hasStartDate && "bg-gray-200 border-none"} 
                  ${(dateType && hasStartDate) && ("border-none outline !outline-blue-400")}
               `}
               placeholder="dd/mm/aaaa"
               disabled={!hasStartDate ? true : false}
               value={startDate}
               onChange={(e) => { setStartDate(e.target.value) }}
               onKeyDown={(e) => { (e.key == "Enter") && datesHandler.handleStartDate(e.target.value, period.fim, false, setPeriod)}}

            />
         </div>

         {/* ///**************DATA FIM************************/}
         <p className="font-semibold mb-1 text-gray-600">Data de entrega</p>
         <div className="flex items-center gap-[6px]  mb-3">
            <input
               className="w-[18px] h-[18px]" type="checkbox"
               checked={hasEndDate ? true : false}
               onChange={(e) => {
                  setHasEndDate(!hasEndDate);
                  !e.target.checked
                  ? datesHandler.handleEndDate(period.inicio, period.fim, true, setPeriod)
                  : datesHandler.handleEndDate(datesHandler.today(), period.inicio, false, setPeriod);
               }}
            />
            <input
               type="text"
               className={`w-[100px] h-8 border border-gray-400 rounded-[3px] pl-2 focus-within:outline-blue-400
                  ${!hasEndDate && "bg-gray-200 border-none"} 
                  ${(!dateType && hasEndDate) && ("border-none outline !outline-blue-400")}
               `}
               placeholder="D/M/AAA"
               disabled={!hasEndDate ? true : false}
               value={endDate}
               onChange={(e) => { setEndDate(e.target.value) }}
               onKeyDown={(e) =>{(e.key == "Enter") && datesHandler.handleEndDate(e.target.value, period.inicio, false, setPeriod)}}
            />
            <input
               type="text"
               className={`w-[100px] h-8 border border-gray-400 rounded-[3px] pl-2 focus-within:outline-blue-400
                  ${!hasEndDate && "bg-gray-200 border-none"}
               `}
               placeholder="hh:mm"
               onChange={() => { }}
            />
         </div>

      </div>
   )
}