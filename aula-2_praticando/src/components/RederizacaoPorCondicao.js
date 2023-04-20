import { useState } from "react";

function RederizacaoPorCondicao(){

  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  function login(e){
    e.preventDefault();
    setUserName(name)
  }

  function clear(){
    setUserName('')
  }

  return(
    <div className="box">
      <h2>Rederização por Condição</h2>
      <form>
        <p>
          <input 
            type="text" 
            placeholder="User name"
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <p>
          <input 
            type="password" 
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p><button onClick={login}>Login</button></p>
        {
          userName && (
            <div>
              <p>Your e-mail is: {name}</p>
              <p>Your Password is: {password}</p>
              <p><button onClick={clear}>Clear</button></p>
            </div>
          )
        }
      </form>
    </div>
  )
}

export default RederizacaoPorCondicao;