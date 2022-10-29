import { useState, useEffect } from 'react'
import axios from 'axios'
import InputField from './components/InputField'
import CountriesList from './components/CountriesList'
import CountryDisplay from './components/CountryDisplay'

function App() {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    event.preventDefault()
    if (!event.target.value) {
      setFiltered([])
      setWeatherData(null)
      return
    }

    var countryList = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    countryList.sort((a, b) => (a.name.common > b.name.common) ? 1 : -1)
    setFiltered(countryList)
  }

  const handleButtonClick = (event) => {
    setWeatherData(null)
    setFiltered(countries.filter(country => country.name.common === event.target.value))
  }

  if (filtered.length >= 10) {
    return (
      <div>
        <InputField title="Find countries" handler={handleFilterChange} />
        Too many matches, please narrow your search further.
      </div>
    )
  }
  else if (filtered.length === 1) {
    const country = filtered[0]

    if (!weatherData) {
      const latLng = country.latlng
      const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latLng[0]}&lon=${latLng[1]}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`

      axios.get(apiCall).then(response => {
        setWeatherData(response.data)
      })
    }

    if (weatherData) {
      const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

      return (
        <div>
          <InputField title="Find countries" handler={handleFilterChange} />
          <CountryDisplay country={country} weather={weatherData} />
          <h3>Weather in {country.capital}</h3>
          <h4>Temperature: {(weatherData.main.temp - 273.15).toFixed(3)}°C</h4>
          <h4>{weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}</h4>
          <img src={weatherIconUrl} alt=""/>
          <h4>Wind speed: {weatherData.wind.speed} m/s</h4>
        </div>
      )
    }
    else {
      return (
        <div>
          <InputField title="Find countries" handler={handleFilterChange} />
          <CountryDisplay country={country} weather={weatherData} />
          <h3>Weather in {country.capital}</h3>
          <div>Could not retrive weather data. Please ensure that the API key REACT_APP_OPENWEATHER_API_KEY is defined in .env</div>
        </div>
      )
    }
  }
  else {
    return (
      <div>
        <InputField title="Find countries" handler={handleFilterChange} />
        <CountriesList list={filtered} handler={handleButtonClick} />
      </div>

    )
  }
}

export default App;
