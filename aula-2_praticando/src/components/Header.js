import styles from './Header.module.css';

function Header(){
  return(
    <header>
      <h1>Estudando React</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Projetos</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;