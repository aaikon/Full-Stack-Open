import { useState, useEffect } from 'react'
import exampleService from './services/example'
import axios, { all } from 'axios'

const Countries = ({ countries, setValue }) => {
  const l = countries.length

  if (l > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (l > 1) {
    return (
      <div>
        {countries.map(country => (
          <p key={country.name}>{country.name} <button onClick={() => setValue(country.name)}>show</button></p>
        ))}
      </div>
    )
  } else if (l === 1) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name}</h1>
        <div>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
        </div>
        <h3>languages:</h3>
        <p>{JSON.stringify(country.languages)}</p>
        <img src={country.flag} alt="image of a flag" />
      </div>
    )
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState(null)

  useEffect(() => {
    if (!allCountries) {
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data.map(country => ({
          name: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flag: country.flags.png,
          weather: {
            temp: 1
          }
        })))
      })
    } else {
      setCountries(allCountries.filter(country => country.name.toLowerCase().includes(value.toLowerCase())))
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      find countries <input value={value} onChange={handleChange}/>
      <Countries countries={countries} setValue={setValue}/>
    </div>
  )
}

export default App