function MetodoPorProps(props){
  return(
    <div className="box">
      <h2>Executando Método passado por Props</h2>
      <button onClick={props.event}>Show Alert</button>
    </div>
  )
}

export default MetodoPorProps;