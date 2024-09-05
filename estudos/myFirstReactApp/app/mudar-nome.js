'use client';
import { useState } from "react";

export default function NovoNome() {
   const [nome, setNome] = useState('Emerson')
   function handleClick(){
      setNome(nome + ' Rodrigues');
   }
   return(
      <>
      <p>{nome}</p>
      <button onClick={handleClick}>Novo Nome</button>
      </>
   ) 
}