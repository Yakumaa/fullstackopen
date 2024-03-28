import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {
  // console.log(props)
  const {searchCountry, handleSearchCountryChange } = props
  
  return (
    <form>
      <div>
        find countries <input value={searchCountry} onChange={handleSearchCountryChange}/>
      </div>
    </form>
  )
}

const Country = (props) => {
  // console.log(props)
  const {country} = props
  console.log(country)
  return (
    <>
    {country.name.common}<br/>
    </>
  )
}

const CountryDetail = (props) => {
  const {country} = props
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Country Flag" width="200" height="200"/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response)
        setCountries(response.data)
      })
  }, [])

  const handleSearchCountryChange = (event) => {
    setSearchCountry(event.target.value)
  }

  const filteredCountry = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  )
  console.log(filteredCountry)

  let displayCountries = null;
  if (searchCountry !== '') {
    if (filteredCountry.length > 10) {
      displayCountries = <p>Too many matches, specify another filter</p>
    }else if (filteredCountry.length === 1) {
      displayCountries = <CountryDetail country={filteredCountry[0]}/>
    }
    else {
      displayCountries = filteredCountry.map((country) => (
        <Country 
          key={country.cca3}
          country={country}
        />
      ))
    }
  }

  return (
    <>
      <Search searchCountry={searchCountry} handleSearchCountryChange={handleSearchCountryChange}/>
      {displayCountries}
    </>
  )
}

export default App
