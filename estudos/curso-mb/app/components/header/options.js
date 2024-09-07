'use client';

import './options.css'
export default function Options() {
   let openedLabel;
   function handleMouseEnter(e){
      const classe = e.target.classList[0];
      const hoveredItemLabel = document.querySelector(`.${classe}-desc`);
      hoveredItemLabel.classList.remove('hidden');
      openedLabel = hoveredItemLabel;
   }
   function handleMouseOut(){
      openedLabel.classList.add('hidden');
   }
   return (
      <div className="options">
         <ul>
            <li
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseOut}
               className="card material-icons">
                  credit_card
            </li>
            <li 
               onMouseEnter={handleMouseEnter} 
               onMouseLeave={handleMouseOut}
               className="noti material-icons">
                  notifications
               </li>
            <li 
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseOut} 
               className="help material-icons">
                  help
            </li>
   
         </ul>
         <span className="options-desc card-desc hidden">Cartão Fidelidade</span>
         <span className="options-desc noti-desc hidden">Notificações</span>
         <span className="options-desc help-desc hidden">Ajuda</span>
      </div> 
   )
}