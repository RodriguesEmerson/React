import { useState } from 'react';
import Cars from './Cars';
import styles from './Main.module.css';
import MetodoPorProps from './MetodoPorProps';
import RederizacaoPorCondicao from './RederizacaoPorCondicao';
import RederizacaoListas from './RederizasaoListas';


function Main(){

  const url = 'https://via.placeholder.com/150';

  function cadastraUsuario(e){
    e.preventDefault();
    console.log(name, senha)
  }

  function saySomething(){
    alert('Learning React')
  }

  const [name, setName] = useState();
  const [senha, setSenha] = useState();


  return(
    <main>
      <div className={styles.box}>
        <img src={url} alt="minha imagem"/>
        <div className={styles.boxDescription}>
          <h2>Produto - 1</h2>
          <p>
            This is just a exemple of to practice! 
            This is just a exemple of to practice!
            This is just a exemple of to practice!
          </p>
        </div>
        <div className={styles.buttons}>
          <button>Comprar</button>
        </div>
      </div>

      <div className={styles.form}>
        <h2>Formulário Practice</h2>
        <form onSubmit={cadastraUsuario}>
          <p>
            <label htmlFor="nome">Nome: </label>
            <input 
              type="text" 
              placeholder="Nome"
              id="nome"
              name="nome"
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="senha">Senha: </label>
            <input
              type="password"
              placeholder="Senha"
              id="senha"
              name="senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </p>
          <p>
            <button type='submit'>Cadastrar</button>
          </p>
        </form>
      </div>
      <Cars />
      <MetodoPorProps event={saySomething}/>
      <RederizacaoPorCondicao />
      <RederizacaoListas />

    </main>
  )
}

export default Main;