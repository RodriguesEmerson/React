
//PODE SER FEITO DESSA FORMA================================
/*
function Pessoa(props){
    return(
        <div>
            <img src={props.foto} alt={props.name}/>
            <h2>Nome: {props.name}</h2>
            <p>Idade: {props.idade}</p>
            <p>Profissão: {props.profissao}</p>
        </div>
    )
}
*/

//=============Importando Style================//
import styles from './Pessoa.module.css'

//OU DESSA FORMA, VIA DESESTRUTURAÇÃO
function Pessoa({name, foto, idade, profissao}){
    return(
        <div className={styles.container}>
            <img src={foto} alt={name}/>
            <h2 className={styles.content}>Nome: {name}</h2>
            <p>Idade: {idade}</p>
            <p>Profissão: {profissao}</p>
        </div>
    )
}


export default Pessoa;