import './App.css';
import RenderList from './components/RenderIList';
// import Condicional from './components/Condicional';
// import HelloWorld from './components/HelloWorld';
// import SayMyName from './components/SayMyName';
// import Pessoa from './components/Pessoa';
// import List from './components/List'
// import Eventos from './components/Eventos';
// import Form from './components/Form';

function App() {
  // const name = 'Emerson'
  // const url = 'https://via.placeholder.com/150'
  // const name2 = 'Erika'
  // function sum(y, x){
  //   return y + x;
  // }

  return (
    <div className="App">
      {/* <Form />
      <Eventos />
      <h1>Hello World!</h1>
      <p>Olá, {name}</p>
      <p>Resultado: {sum(20, 30)} </p>
      <img src={url} alt="Minha Imagem" />
      <HelloWorld />
      <SayMyName name='Emerson' />
      <SayMyName name={name2} />
      <Pessoa name="Emerosn" 
              idade="24"  
              profissao="Developer"
              foto="https://via.placeholder.com/150"/>
      <List />
      <Condicional /> */}
      <RenderList />
    </div>
  );
}

export default App;
 