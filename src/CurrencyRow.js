import React from 'react'

export default function CurrencyRow(props) {
  const {
    onChangeAmountFrom,
    onChangeAmountTo,
    amountFrom,
    amountTo
  } = props
  return (
    <div>
      <input type="number" className="input" value={amountFrom} onChange={onChangeAmountFrom} />
      <div className="equals">=</div>
      <input type="number" className="input" value={amountTo} onChange={onChangeAmountTo} />
    </div>
  )
}
