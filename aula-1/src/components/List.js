import Item from "./Item";

function List() {
  return (
    <>
      <h1>Minha Lista</h1>
      <ul>
        <li>Item 2</li>
        <li>Item 3</li>
        <Item marca="Fiat" ano={2023}/>
        <Item  ano="2022"/>
      </ul>
    </>
  )
}

export default List;