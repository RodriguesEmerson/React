'use client';
import './user.css'
export default function OpenUserBoxButton(){
   function handleClick(){
      const userInfos = document.querySelector('.user-infos');
      userInfos.classList.toggle('hidden')
   }
   return (
      <>
         <div onClick={handleClick} className="user-box flex">
            <span className="material-icons">keyboard_arrow_down</span>
            <div className="user-img">
               <span className="material-icons user-icon">account_circle</span>
            </div>
         </div>
      </>
   )
}