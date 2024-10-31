
import { modalInfos } from "@/app/logica/logica-modais/main";
import { useEffect, useState } from "react";
import { useProvidersContext } from "../../context/providers";
import { ButtonSaveDefault } from "../buttons";
import useDateHandler from "@/app/hooks/useDateHandler";
import Select from "../select";
import ModalBox from "./Modal-Box";
import { useDateContext } from "@/app/context/useDateContext";


export default function ModalData() {
   const { setHiddenDataModal } = useProvidersContext();
   const { datesHandler, selectOptions } = useDateHandler();

   const [lembrete, setLembrete] = useState("Nenhum");
   const [dateType, setDateType] = useState(true); //true = inicio, false = fim;

   function handleClickSave(e) {
      e.preventDefault(); datesHandler.savePeriod(); setHiddenDataModal(true)
   }

   return (
      <ModalBox modalName={'Data'} setHiddenModal={setHiddenDataModal}>
         <Calendar
            dateType={dateType}
            setDateType={setDateType}
         />

         <ButtonsMudarPeriod
            dateType={dateType}
            setDateType={setDateType}
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

function Calendar({ dateType, setDateType }) {
   const { datesHandler, weekDays, yearMonths } = useDateHandler();
   const {  monthEndYear, calendar, period, endDate, startDate } = useDateContext();
   let { month, year } = monthEndYear;

   if(!period) return <></>
   return (
      <div>
         <div className="flex justify-between items-center  text-gray-600 mb-3">
            <span
               className="material-icons h-7 w-7 pt-[2px] text-center hover:bg-gray-200 cursor-pointer rounded"
               onClick={() => datesHandler.handleChangeMonth('previous')}
            >chevron_left
            </span>
            <p className="text-xs font-semibold cursor-default">
               {`${yearMonths[monthEndYear.month]} de ${monthEndYear.year}`}
            </p>
            <span
               className="material-icons h-7 w-7 pt-[2px] text-center hover:bg-gray-200 cursor-pointer rounded"
               onClick={() => datesHandler.handleChangeMonth('next')}
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

            {calendar?.lastDaysOfPreviousMonth.map(day => (
               <span
                  key={`mAnte${day}`}
                  className={`h-8 leading-8 rounded-[3px] text-[14px] text-center  hover:bg-gray-100 text-gray-400 cursor-pointer border border-white
                     ${(datesHandler.isDateInAnalyzedPeriod(period, day, month, year, 'ante') && "bg-blue-100 hover:!bg-blue-300")}
                  `}
                  onClick={() => {
                     dateType
                     ? datesHandler.handleStartDate(`${day}/${month}/${year}`, endDate, false)
                     : datesHandler.handleEndDate(`${day}/${month}/${year}`, startDate, false);
                     setDateType(!dateType)
                  }}
               >{day}</span>
            ))}

            {calendar?.currentMonthDays.map(day => (
               <span
                  key={`monthDay${day}`}
                  className={`h-8 leading-8 rounded-[3px] text-[14px] text-center hover:bg-gray-100   cursor-pointer border border-white
                     ${(new Date().getDate() == day && monthEndYear.month == new Date().getMonth()) && "text-blue-600 font-bold border-b-[3px] border-b-blue-600"}
                     ${(datesHandler.isDateInAnalyzedPeriod(period, day, month + 1, year) && "bg-blue-100 hover:!bg-blue-300")}
                  `}
                  onClick={() => {
                     dateType
                        ? datesHandler.handleStartDate(`${day}/${month + 1}/${year}`, endDate, false)
                        : datesHandler.handleEndDate(`${day}/${month + 1}/${year}`, startDate, false);
                     setDateType(!dateType);
                  }}
               >{day}</span>
            ))}

            {calendar?.firstDaysOfNextMonth.map(day => (
               <span
                  key={`mAnte${day}`}
                  className={`h-8 leading-8 rounded-[3px] text-[14px] text-center  hover:bg-gray-100 text-gray-400 cursor-pointer border border-white
                     ${(datesHandler.isDateInAnalyzedPeriod(period, day, month + 2, year) && "bg-blue-100 hover:!bg-blue-300")}
                  `}
                  onClick={() => {
                     dateType
                     ? datesHandler.handleStartDate(`${day}/${month + 2}/${year}`, endDate, false)
                     : datesHandler.handleEndDate(`${day}/${month + 2}/${year}`, startDate, false);
                     setDateType(!dateType)
                  }}
               >{day}</span>
            ))}   
         </div>
      </div>
   )
}

function ButtonsMudarPeriod({ dateType, setDateType }) {
   const { datesHandler } = useDateHandler();
   const { period, startDate, endDate, setStartDate, setEndDate } = useDateContext();

   if(!period) return <></>
   return (
      <div className="text-xs mb-2">
         <p className="font-semibold mb-1 text-gray-600">Data Início</p>
         <div className="flex items-center gap-[6px] mb-3">
            <input
               className="w-[18px] h-[18px]" type="checkbox"
               checked={startDate ? true : false}
               onChange={(e) => {
                  !e.target.checked
                     ? datesHandler.handleStartDate(startDate, endDate, true)
                     : datesHandler.handleStartDate(datesHandler.today(), endDate, false);
               }}
            />
            <input
               type="text"
               className={`w-[100px] h-8 border border-gray-400 rounded-[3px] pl-2 focus-within:outline-blue-400 
                  ${!startDate && "bg-gray-200 border-none"} 
                  ${(dateType && startDate) && ("border-none outline !outline-blue-400")}
               `}
               placeholder="dd/mm/aaaa"
               disabled={!startDate ? true : false}
               value={startDate}
               // onClick={setDateType(true)}
               onChange={(e) => { setStartDate(e.target.value) }}
               onKeyDown={(e) => { (e.key == "Enter") && datesHandler.handleStartDate(e.target.value, endDate, false)}}

            />
         </div>

         {/* ///**************DATA FIM************************/}
         <p className="font-semibold mb-1 text-gray-600">Data de entrega</p>
         <div className="flex items-center gap-[6px]  mb-3">
            <input
               className="w-[18px] h-[18px]" type="checkbox"
               checked={endDate ? true : false}
               onChange={(e) => {
                  !e.target.checked
                  ? datesHandler.handleEndDate(startDate, endDate, true)
                  : datesHandler.handleEndDate(datesHandler.today(), startDate, false);
               }}
            />
            <input
               type="text"
               className={`w-[100px] h-8 border border-gray-400 rounded-[3px] pl-2 focus-within:outline-blue-400
                  ${!endDate && "bg-gray-200 border-none"} 
                  ${(!dateType && endDate) && ("border-none outline !outline-blue-400")}
               `}
               placeholder="D/M/AAA"
               disabled={!endDate ? true : false}
               value={endDate}
               // onClick={setDateType(false)}
               onChange={(e) => { setEndDate(e.target.value) }}
               onKeyDown={(e) =>{(e.key == "Enter") && datesHandler.handleEndDate(e.target.value, startDate, false)}}
            />
            <input
               type="text"
               className={`w-[100px] h-8 border border-gray-400 rounded-[3px] pl-2 focus-within:outline-blue-400
                  ${!endDate && "bg-gray-200 border-none"}
               `}
               placeholder="hh:mm"
               onChange={() => { }}
            />
         </div>

      </div>
   )
}