
import "./header.css"
import 'material-icons/iconfont/material-icons.css';
import User from "./user/user"
import Options from "./options"

export default function Header(){
   return (
      <header>
         <div className="logo">Foto Select</div>
         <div className="interacao">
            <Options />
            <User />
         </div>
      </header>
   )
}

