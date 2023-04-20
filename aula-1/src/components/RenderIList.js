function RenderList(){

  const itens = ['João', 'Maria', 'Chucriti', 'Will', 'Flash', 'Chaveco']
                //Impossível ser mais aleatório do que isso. kkkkk

  return(
    <div className="box">
      <h2>Renderizando Listas</h2>
      {
        itens.map(item => (
          <p>{item}</p>
        ))
      }
    </div>
  )
}

export default RenderList;