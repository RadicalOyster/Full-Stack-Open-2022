import CountryLabel from './CountryLabel'

const CountryList = (props) => {
    return (
      <div>
        {props.list.map(country => <CountryLabel key={country.name.common} name={country.name.common} handler={props.handler}/>)}
      </div>
    )
  }

  export default CountryList