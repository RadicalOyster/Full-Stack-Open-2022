const CountryLabel = (props) => {
    return (
      <div>
        {props.name}
        <button onClick={props.handler} value={props.name}>Show</button>
      </div>
    )
  }

  export default CountryLabel