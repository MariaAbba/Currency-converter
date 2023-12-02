import React from 'react'
import { Block } from './Block'
import './index.scss'
import { useState, useEffect } from 'react'

function App() {
  const [fromCurrency, setFromCurrency] = useState('AZN')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)
  const [rates, setRates] = useState({})

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((res) => res.json())
      .then((json) => {
        setRates(json.Valute)
        console.log(json.Valute)
      })
      .catch((err) => {
        console.warn(err)
        alert('Unable to get information')
      })
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency]
    const result = price * rates[toCurrency]
    setToPrice(result)
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    setToPrice(value)
  }

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  )
}

export default App
