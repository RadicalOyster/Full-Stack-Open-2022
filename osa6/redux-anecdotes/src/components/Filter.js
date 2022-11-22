import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({setFilter}) => {
  const handleChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter: <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const ConncetedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConncetedFilter