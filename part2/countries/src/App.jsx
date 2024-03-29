import { useState, useEffect } from 'react'
import axios from 'axios'
import Country, {CountryDetail} from './components/Country'
import Weather from './components/Weather'

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
      displayCountries = <CountryDetail country={filteredCountry[0]}/> && <Weather country={filteredCountry[0]}/>
      
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
