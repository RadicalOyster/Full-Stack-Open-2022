const CountryDisplay = (props) => {
  return (
    <div>
      <h1>{props.country.name.common}</h1>

      <div>Capital: {props.country.capital}</div>
      <div>Area: {props.country.area}</div>

      <h3>Languages</h3>

      <ul>
        {Object.keys(props.country.languages).map(
          key => <li key={key}>{props.country.languages[key]}</li>
        )}
      </ul>
      <img src={props.country.flags.png} alt=""/>
    </div>
  )
}

export default CountryDisplay