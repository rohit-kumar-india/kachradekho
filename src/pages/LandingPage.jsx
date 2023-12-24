import React from 'react'
import styles from '../styles/LandingPage.module.css';
import Head from 'next/head';
import Header from '../components/header/header';
import HeroSection from '../components/LandingPage/HeroSection';
import FeaturesSection from '../components/LandingPage/FeaturesSection';
import HowItWorksSection from '../components/LandingPage/HowItWorksSection'
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import vec from '../assets/landingVector.png'

const LandingPage = () => {
    // Change the URL without triggering a full page reload
    const newUrl = `${process.env.NEXT_PUBLIC_HOST}`;
    window.history.pushState(null, null, newUrl);
    return (
        <>
            <div>
                <Head>
                    <title>KachraDekho - See and Share Unique Products</title>
                </Head>
                {/* <Header /> */}
                <HeroSection />
                {/* <FeaturesSection />
                <HowItWorksSection /> */}
                {/* <SignUpButton /> */}
            </div>
        </>
    )
}

export default LandingPage
