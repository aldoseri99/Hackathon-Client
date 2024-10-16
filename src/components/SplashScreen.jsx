import React from "react"
import styles from "../SplashScreen.module.css"

export default function SplashScreen() {
  return (
    <main className={styles.main}>
      <img src="/RideRadarLogo.png" alt="logo-splash" className={styles.logo} />
    </main>
  )
}
