import { useState, useEffect } from 'react'

const Country = (props) => {
  // console.log(props)
  const {country} = props
  const [showDetails, setShowDetails] = useState(false)
  // console.log(country)
  return (
    <>
    {country.name.common}
    <button onClick={() => setShowDetails(!showDetails)}>Show</button><br/>
    {showDetails && <CountryDetail country={country}/>}
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
      <img src={country.flags.png} alt="Country Flag"/>
    </div>
  )
}

export default Country
export {CountryDetail}