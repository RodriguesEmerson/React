import Options from "./options"
import User from "./user"
import "./header.css"
import 'material-icons/iconfont/material-icons.css';

export default function Header(){
   return (
      <header>
         <div className="logo">Lodo do Site</div>
         <div className="interacao">
            <Options />
            <User />
         </div>
      </header>
   )
}

