import PropTypes from 'prop-types';

function BuildCars({nome, ano}){
  return(
    <>
      <li>Modelo: {nome}, Ano: {ano}</li>
    </>
  )
}

BuildCars.propTypes ={
  nome: PropTypes.string.isRequired,
  ano: PropTypes.number,
}

BuildCars.defaultProps ={
  nome: 'Modelo não especificado',
  ano: 0,
}

export default BuildCars;