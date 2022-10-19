import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
import SelectRow from './SelectRow';

var axios = require("axios");

function App() {

  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [fromPrice, setFromPrice] = useState()
  const [toPrice, setToPrice] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const tickers = ["ADA", "BNB", "BTC", "DOGE", "DOT", "ETH", "SHIB", "SOL", "USDC", "USDT", "XRP"]

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
      axios.get("https://rest.coinapi.io/v1/exchangerate/" + fromCurrency + "/USD", { headers: { "X-CoinAPI-Key": "183A07E3-D092-4040-917E-E6267A8C0341" } })
        .then(function (resp) {
          setFromPrice(resp.data.rate)
        });
      axios.get("https://rest.coinapi.io/v1/exchangerate/" + toCurrency + "/USD", { headers: { "X-CoinAPI-Key": "183A07E3-D092-4040-917E-E6267A8C0341" } })
        .then(function (resp) {
          setToPrice(resp.data.rate)
        });
    }
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    setExchangeRate(fromPrice / toPrice)
  }, [toPrice, fromPrice])

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
      <div style={{
        backgroundColor: "#d1d1d1",
        width: '320px',
        height: '210px',
        alignSelf: "center",
        justifycontent: "center",
        alignitems: "center",
        textalign: "center",
        display: "flex"
      }}>
        <div style={{
          backgroundColor: "#e0e0e0",
          width: '300px',
          height: '190px',
          alignSelf: "center",
          justifycontent: "center",
          alignitems: "center",
          textalign: "center",
          marginLeft: ".6rem"
        }}>
          <div className="equals"></div>
          <h1>Cryptocurrency Converter </h1>
          <CurrencyRow
            onChangeAmountFrom={handFromAmountChange}
            onChangeAmountTo={handToAmountChange}
            amountFrom={fromAmount}
            amountTo={toAmount}
          />
          <SelectRow
            tickers={tickers}
            selectedCurrencyFrom={fromCurrency}
            selectedCurrencyTo={toCurrency}
            onChangeCurrencyFrom={e => setFromCurrency(e.target.value)}
            onChangeCurrencyTo={e => setToCurrency(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
