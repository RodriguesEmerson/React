
'use Client';
export default function Options() {
   function hover(e){
      console.log(e)
   }
   return (
      <div className="options">
         <ul>
            <li className="card material-icons">credit_card</li>
            <li className="notification material-icons">notifications</li>
            <li className="help material-icons">help</li>
         </ul>
         <span onMouseEnter={ hover } className="options-desc card-desc hidden">Cartão Fidelidade</span>
         <span className="options-desc noti-desc hidden">Notificações</span>
         <span className="options-desc help-desc hidden">Ajuda</span>
      </div> 
   )
}