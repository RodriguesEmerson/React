function RederizacaoListas(){
  const itens = ['Emerson', 'Rodrigues', 'This', 'Is', 'My', 'Name']

  return(
    <div className="box">
      <h2>Rederização de Listas com 'Map'</h2>
      {
        itens.length > 0 ? (
          itens.map((item, index) => (
            <p key={ index }>{ item }</p>
          ))
        ) : (
          <p>Não há itens na lista!</p>
        )
      }
    </div>
  )
}

export default RederizacaoListas;