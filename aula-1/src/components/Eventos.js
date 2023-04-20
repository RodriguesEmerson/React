import Button from "./Button";

function Eventos() {

  function meuEvento(){
    console.log('Botão Clicado')
  }

  return (
    <div className="box">
      <p>Clique para disparar um evento</p>
      <button onClick={meuEvento}>Ativar</button>
      <p><Button event={meuEvento} text="Evento por Prosps" /></p>
    </div>
  )
} 

export default Eventos;