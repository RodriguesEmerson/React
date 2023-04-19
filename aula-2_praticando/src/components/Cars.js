import BuildCars from "./BuildCars";
import styles from './Cars.module.css';
function Cars(){
  return(
    <div className={styles.box}>
      <h1>Carros</h1>
      <ul>
        <BuildCars nome="Fiat" ano={2000}/>
        <BuildCars nome="Renault" ano={2010}/> 
      </ul>
    </div>
  )
}

export default Cars; 