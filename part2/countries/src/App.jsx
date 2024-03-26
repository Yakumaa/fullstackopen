import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {
  console.log(props)
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
  console.log(props)
  const {country} = props
  console.log(country)
  return (
    <>
    {country.name}
    </>
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
    typeof country.name === 'string' && country.name.toLowerCase().includes(searchCountry.toLowerCase())
  )

  return (
    <>
      <Search searchCountry={searchCountry} handleSearchCountryChange={handleSearchCountryChange}/>
      {filteredCountry.map((country) => (
        <Country 
          key={country.id}
          country={country}
        />
      ))}
    </>
  )
}

export default App
