import PhoneBookLine from './PhoneBookLine'

const NumbersList = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
      {props.list.map(person =>
          <li key={person.name}>
          <PhoneBookLine name={person.name} number={person.number}/>
          <button onClick={props.clickHandler} value={person.id} data-name={person.name}>Delete
          </button>
          </li>
        )
      }
      </ul>
    </div>
  )
}

export default NumbersList