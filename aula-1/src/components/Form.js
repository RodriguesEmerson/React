import { useState } from 'react';

function Form(){

  function cadastraUsuario(e){
    e.preventDefault();
    console.log(name)
    console.log(password)
    console.log('Usuário cadastrado!')
  }

  const[name, setName] = useState();
  const[password, setPassword] = useState();

  return(
    <div>
      <h1>Formulário</h1>
      <form onSubmit={cadastraUsuario}>

        <p>
          <label htmlFor="name">Nome: </label>
          <input  
            type="text"
            placeholder="Nome" 
            id="name" 
            name="name"
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
            onChange={(e) => setPassword(e.target.value)}
          />
          </p>
        <p><input type="submit" value="Cadastrar"/></p>
      </form>
    </div>
  )
}

export default Form;