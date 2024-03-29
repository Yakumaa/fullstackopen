import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
  const {country} = props
  console.log(country)
  const api_key = import.meta.env.VITE_API_KEY
  console.log(api_key)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}')
      .then(response => {
        console.log(response)
        setWeather(response.data)
      }
      )
  }, [])

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather.main.temp} Celsius</p>
      <p>description: {weather.weather[0].description}</p>
      <p>wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather