import { useState, useEffect } from 'react'
import axios from 'axios'

const RenderData = ({country}) => {
  const languages = Object.values(country.languages)
  console.log(country)
  return (
    <div>
    <h2>{country.name.common}</h2>
    {country.capital && country.capital.length === 1 ? (
      <div>{'capital   ' + country.capital[0]}</div>
    ) : null}
    area {country.area}
    <h3>languages:</h3>
    <ul>
      {languages.map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.name.common}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [userInput, setUserInput] = useState('')
  const [toShow, setToShow] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
    .then(response => setCountries(response.data))
  }, [])

  const filterCountries = (event) => {
    setUserInput(event.target.value)
    setToShow(countries.filter(country => country.name.common
      .toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const SelectCountry = (country) => {
    setToShow(countries.filter(maa => JSON.stringify(maa.name.official) === JSON.stringify(country.name.official)))
    setUserInput('')
  }

  const RenderAndButton = ({country}) => (
    <div>
    {country.name.common + ' '}
    <button type="button" onClick={() => SelectCountry(country)}>show</button>
    </div>
  )

  return (
    <div>
      find countries <input value={userInput} onChange={filterCountries} />
      { toShow.length > 10 ? (<div>Too many matches, specify another filter</div>) :
        (
          toShow.length !== 1 ? (
            toShow.map(maa => 
              <RenderAndButton key={maa.name.common} country={maa} />
              )
            ) : (
            <RenderData country={toShow[0]} />
          )
        )
      }
    </div>
  )
}

export default App;
