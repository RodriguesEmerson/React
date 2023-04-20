function RenderList(){

  const itens = ['João', 'Maria', 'Chucruiti', 'Will', 'Flash', 'Chaveco']
                //Impossível ser mais aleatório do que isso. kkkkk

  return(
    <div className="box">
      <h2>Renderizando Listas</h2>
      {
        itens.length > 0 ? (
          itens.map((item, index) => (
            <p key={index}> {item} </p>
          ))
        ) : (
          <p>Não há itens na lista!</p>
        )
      }
    </div>
  )
}

export default RenderList;
