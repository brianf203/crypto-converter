import React from 'react'

export default function SelectRow(props) {
    const {
        tickers,
        selectedCurrencyFrom,
        selectedCurrencyTo,
        onChangeCurrencyFrom,
        onChangeCurrencyTo
    } = props
    return (
        <div>
            <select value={selectedCurrencyFrom} onChange={onChangeCurrencyFrom}>
                {tickers.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <select value={selectedCurrencyTo} onChange={onChangeCurrencyTo}>
                {tickers.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}
