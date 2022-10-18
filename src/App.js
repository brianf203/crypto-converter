import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

var axios = require("axios");

function App() {

  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [fromPrice, setFromPrice] = useState()
  const [toPrice, setToPrice] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const tickers = ["BTC", "ETH", "BNB", "DOGE"]
  
  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  }
  else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fromAmount = 1;
    setFromCurrency("BTC")
    setToCurrency("ETH")
    setExchangeRate(1)
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {

      console.log("FROM CURRENCY: " + fromCurrency)
      console.log("TO CURRENCY: " + toCurrency)

      axios.get("https://rest.coinapi.io/v1/exchangerate/" + fromCurrency + "/USD", { headers: {"X-CoinAPI-Key": "D53E1FC5-E2E7-4126-A3E7-98BB55B8D634"} })
        .then(function(resp) {
          setFromPrice(resp.data.rate)
          console.log(fromCurrency + " price: " + fromPrice + "")
      });
      axios.get("https://rest.coinapi.io/v1/exchangerate/" + toCurrency + "/USD", { headers: {"X-CoinAPI-Key": "D53E1FC5-E2E7-4126-A3E7-98BB55B8D634"} })
        .then(function(resp) {
          setToPrice(resp.data.rate)
          console.log(toCurrency + " price: " + toPrice + "")
      });

      setExchangeRate(fromPrice / toPrice)
    }
  }, [fromCurrency, toCurrency])

  function handFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow 
        tickers={tickers}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow 
        tickers={tickers}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;
