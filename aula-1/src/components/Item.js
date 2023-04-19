import PropTypes from 'prop-types'

function Item({ marca, ano }) {
  return (
    <>
      <li>Marca: {marca}, Ano: {ano}</li>
    </>
  )
}

Item.propTypes = {
  marca: PropTypes.string,
}
Item.defaultProps = {
  marca: 'Faltou a marca',
  ano: 0,
}
export default Item;