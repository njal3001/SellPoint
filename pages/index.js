import Head from 'next/head'
import styles from '../styles/Home.module.css'
import AppBar from '../components/header'
import Card from '../components/cards'
import PostCards from '../components/cards_alt';
import fire from '../config/fire-config'

export default function Home() {
  return (

    <div className={styles.container}> 
      <AppBar/>
      <div className={styles.rad}>
        <div className={styles.annonseContainer}>
            <PostCards/>
        </div>
      </div>
     </div>
  )
}
