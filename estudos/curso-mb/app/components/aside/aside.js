
import './aside.css'


export default function Aside(){
   const links = [
      {icon: 'home', a: '', value: 'Início'},
      {icon: 'image', a: '', value: 'Seleção de fotos'},
      {icon: 'auto_stories', a: '', value: 'Prova de álbuns'},
      {icon: 'person', a: '', value: 'Clientes'},
      {icon: 'invert_colors', a: '', value: 'Personalizações'},
      {icon: 'settings', a: '', value: 'Configurações'},
      {icon: 'redeem', a: '', value: 'Ganhe créditos'}
   ]
   return(
      <section className='aside-bar'>
         <nav className="nav">
            <ul className='nav-ul'>
               <LinksList links={links} />
            </ul>
         </nav>
         <Creditos />
      </section>
   )
}

function LinksList({ links }){
   return(
      <>
      {links.map((a) =>(
         <li key={a.icon} className='nav-link'>
            <span className='selected'></span>
            <a href={a.a}>
               <span className="material-icons">{a.icon}</span>
               <span>{a.value}</span>
            </a>
         </li>
      ))}
      </>
   )
}

function Creditos(){
   const totalCredits = 1.432;
   return(
      <div className='credits-box'>
         <span>Você possui</span>
         <div className='credits-count'>
            <span className='credits-nuber'>{totalCredits}</span>
            <span> créditos</span>
         </div>
         <a className='button-buy-credits' href=''>COPRAR CRÉDITOS</a>
      </div>
   )
}
