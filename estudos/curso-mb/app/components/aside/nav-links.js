'use client';

export default function LinksList({ links }){
   return(
      <>
      {links.map((a) =>(
         <li key={a.icon} className={`nav-link ${a.icon}`}>
            <span className={`selected hidden selected-${a.icon}`}></span>
            <a  href={a.a} target="_self">
               <span className="material-icons">{a.icon}</span>
               <span>{a.value}</span>
            </a>
         </li>
      ))}
      </>
   )
}