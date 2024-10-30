'use client'

import  { createContext, useContext, useState } from "react";
import { modalInfos } from "../logica/logica-modais/main";
const useDateContextHandler = createContext();

export function useDateContext({ children }){
   const [monthEndYear, setMonthEndYear] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
   const [calendar, setCalendar]= useState(  );
   const [period, setPeriod] = useState(modalInfos.getPeriodo());
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

   return (
      <useDateContextHandler.Provider 
         value={{
            monthEndYear, setMonthEndYear,
            calendar, setCalendar,
            period, setPeriod,
            startDate, setStartDate,
            endDate, setEndDate

         }}>
         { children }
      </useDateContextHandler.Provider>
   )
}

export function useuseDateContextHandler(){
   return useContext(useDateContextHandler)
}