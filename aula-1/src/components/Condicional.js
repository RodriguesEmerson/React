import { useState } from 'react';

function Condicional(){

  const [email, setEmail] = useState();
  const [userEmail, setUserEmail] = useState();

  function enveiarEmail(e){
    e.preventDefault();
    setUserEmail(email)
  }

  function limparEmail(){
    setUserEmail('')
  }

  return(
    <div>
      <h2>Cada stre seu email:</h2>
      <form>
        <input 
          type='email' 
          placeholder='Digite seu email...' 
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={enveiarEmail}>enveiarEmail</button>
        {userEmail && (
          <div>
            <p>O email do usuário é: {userEmail}</p>
            <button onClick={limparEmail}>Limpar</button>
          </div>
        )}
      </form>
    </div>
  )
}

export default Condicional;