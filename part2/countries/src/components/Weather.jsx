import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
  const {country} = props
  console.log(country.latlng[0])
  const api_key = import.meta.env.VITE_SOME_KEY
  console.log(api_key)
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
      .then(response => {
        console.log(response)
        setWeather(response.data)
      }
      )
  }, [])
  console.log(weather)

  return (
    <>
    {weather && (<div>
      <h2>Weather in {country.capital}</h2> 
      <p>temperature: {weather.main.temp} Celsius</p>
      <p>description: {weather.weather[0].description}</p>
      <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon"/>
      <p>wind: {weather.wind.speed} m/s</p>
    </div>)}
    </>
  )
}

export default Weather