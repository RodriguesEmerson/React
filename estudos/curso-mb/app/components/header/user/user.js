
import OpenUserBoxButton from './open-user-box'

export default function User(){
   const name = 'Emerson';
   
   return(
      <>
      <OpenUserBoxButton />
      <div className='user-infos hidden'>
         <div className='user-profile flex'>
            <div className="user-img">
               <sapn className="material-icons user-icon">account_circle</sapn>
            </div>
            <div className='user flex'>
               <span className='user-name'>Olá, {name}</span>
               <span className='user-email'>emersonexemple@email.com</span>
            </div>
         </div>
         <div className='user-options'>
            <ul className='flex'>
               <li>
                  <a href=''>Minha Conta</a>
               </li>
               <li>
                  <a href=''>Sair</a>
               </li>
            </ul>
         </div>
      </div>
      </>
   )
}