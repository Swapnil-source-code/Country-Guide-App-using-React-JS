import { useState } from 'react';
import './CountryGuide-style.css'



const CountryGuide = () => {
 
  const [countryName, setCountryName] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(finalURL)
      .then((response) => response.json())
      .then((data) => {
        setResult({
          flag: data[0].flags.svg,
          name: data[0].name.common,
          capital: data[0].capital[0],
          continents: data[0].continents[0],
          population: data[0].population,
          currencyName: data[0].currencies[Object.keys(data[0].currencies)].name,
          currencyCode: Object.keys(data[0].currencies)[0],
          languages: Object.values(data[0].languages).toString().split(",").join(", "),
        });
      })
      .catch(() => {
        if (countryName.length === 0) {
          setResult({ error: "The input field can't be empty" });
        } else {
          setResult({ error: "Please enter a valid country name" });
        }
      });
  };

 
  return (
    <>
      <div className="container">
        <div className="guid-app">
          <div className="search-wrapper">
            <input
              type="text"
              id="country-inp"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
              placeholder="Enter country name here..."
            />
            <button id="search-btn" onClick={handleSearch}>Search</button>
          </div>

          {result && !result.error && (
            <div>
              <img src={result.flag} alt="Flag" className="flag-img" />
              <h2>{result.name}</h2>
              <div className="wrapper">
                <div className="data-wrapper">
                  <h4>Capital : </h4>
                  <span>{result.capital}</span>
                </div>
              </div>
              <div className="wrapper">
                <div className="data-wrapper">
                  <h4>Continents : </h4>
                  <span>{result.continents}</span>
                </div>
              </div>
              <div className="wrapper">
                <div className="data-wrapper">
                  <h4>Population : </h4>
                  <span>{result.population}</span>
                </div>
              </div>
              <div className="wrapper">
                <div className="data-wrapper">
                  <h4>Currency : </h4>
                  <span>{result.currencyName} - {result.currencyCode}</span>
                </div>
              </div>
              <div className="wrapper">
                <div className="data-wrapper">
                  <h4>Common Language : </h4>
                  <span>{result.languages}</span>
                </div>
              </div>
            </div>
          )}
          <br/>
          {result && result.error && (
            <h3>{result.error}</h3>
          )}
          
        </div>
      </div>
    </>
  )
}

export default CountryGuide