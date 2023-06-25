import React from 'react'
import styles from '../styles/LandingPage.module.css';
import Header from '../components/header/header'
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import vec from '../assets/landingVector.png'

const LandingPage = () => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <Image src={vec} layout='responsive' width='100%' height='100%' />
            </div>

            <Footer />
        </>
    )
}

export default LandingPage
