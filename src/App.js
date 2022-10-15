import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

var axios = require("axios");

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  console.log(currencyOptions)

  var tickerOne = "ETH";
  var tickerTwo = "BTC";

  var pathOne = "https://rest.coinapi.io/v1/exchangerate/" + tickerOne + "/USD";
  var pathTwo = "https://rest.coinapi.io/v1/exchangerate/" + tickerTwo + "/USD";

  useEffect(() => {
    const expensesListResp = async () => {
      await axios.get(pathOne, { headers: {"X-CoinAPI-Key": "A576F188-FCEA-4546-A345-0059B152707F"} })
      .then(
        resp => setCurrencyOptions(resp.data.rate)
      )
    }
    expensesListResp();
  }, []);

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow />
      <div className="equals">=</div>
      <CurrencyRow />
    </>
  );
}

export default App;
