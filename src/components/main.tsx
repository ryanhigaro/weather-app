import React, { ReactElement, useState } from 'react'
import styles from './main.module.css'
import Form from './form'


export default function WeatherPage(): ReactElement {
  const [weather, setWeather] = useState()

  return (
    <div className={styles.cardContainer}>
      <h2>Today's Weather</h2>
      <hr />
      <Form setWeather={setWeather} />
      {JSON.stringify(weather)}
    </div>
  )
}