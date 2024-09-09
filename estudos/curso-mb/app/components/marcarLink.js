'use client'
import { useEffect } from 'react';

export default function MarcarPaginaSelecionada({ item }){
   useEffect(()=>{
      const linkPage = document.querySelector(`.selected-${item}`);
      linkPage.classList.remove('hidden');
   })
}