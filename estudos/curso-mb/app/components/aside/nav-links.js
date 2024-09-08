'use client';

import { basename } from "path";


export default function LinksList({ links }){
   let atualLinkSelected;

   function handleClick(e){
      e.preventDefault()
      const liClass = e.target.closest('li').classList[1];
      const barSelected = document.querySelector(`.${liClass} .selected`);

      //verifica se há algum link aberto
      if(atualLinkSelected){
         atualLinkSelected.classList.add('hidden');
      } 
      atualLinkSelected = barSelected;
      barSelected.classList.remove('hidden');
   }

   return(
      <>
      {links.map((a) =>(
         <li key={a.icon} className={`nav-link ${a.icon}`}>
            <span className='selected hidden'></span>
            <a onClick={handleClick} href={a.a} target="_self">
               <span className="material-icons">{a.icon}</span>
               <span>{a.value}</span>
            </a>
         </li>
      ))}
      </>
   )
}