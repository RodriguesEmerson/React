'use client'

import { createContext, useContext, useState } from "react";
const dateContext = createContext();

export function DateProvider({ children }) {
   const [monthEndYear, setMonthEndYear] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
   const [calendar, setCalendar] = useState();
   const [period, setPeriod] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [checkOne, setCheckOne] = useState(false);
   const [checkTwo, setCheckTwo] = useState(false);
   const [dateType, setDateType] = useState(true); //true = inicio, false = fim;
   
   return (
      <dateContext.Provider
         value={{
            monthEndYear, setMonthEndYear,
            calendar, setCalendar,
            period, setPeriod,
            startDate, setStartDate,
            endDate, setEndDate,
            checkOne, setCheckOne,
            checkTwo, setCheckTwo,
            dateType, setDateType
         }}>
         {children}
      </dateContext.Provider>
   )
}

export function useDateContext() {
   return useContext(dateContext)
}