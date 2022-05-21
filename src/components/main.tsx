import React, { ReactElement, useState } from 'react'
import styles from './main.module.css'
import Form from './Form'
import Preview from './Preview'
import History from './History'


export default function WeatherPage(): ReactElement {
  const [weather, setWeather] = useState()
  const [historyList, setHistoryList] = useState<any>([])

  return (
    <div className={styles.cardContainer}>
      <h2>Today's Weather</h2>
      <hr />
      <Form setWeather={setWeather} setHistoryList={setHistoryList} />
      <Preview queryResult={weather} />
      <History list={historyList} />
    </div>
  )
}