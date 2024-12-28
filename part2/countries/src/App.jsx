import { useState, useEffect } from 'react'
import exampleService from './services/example'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
 
    if (value && value.length > 0) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${RegExp(`\\b\\w*${value}\\w*\\b`, 'i')}`)
        .then(response => {
          setCountries(response.data.name)
        })
        .catch(error => {
          console.log(error)
        })
      }
  }, [value])

  const handleChange = (event) => setValue(event.target.value)

  return (
    <div>
      find countries <input value={value} onChange={handleChange}/>
      <pre>
        {JSON.stringify(countries, null, 2)}
      </pre>
    </div>
  )
}

export default App