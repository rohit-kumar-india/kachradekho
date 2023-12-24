import React from 'react'
import Head from 'next/head';
import HeroSection from '../components/LandingPage/HeroSection';
import FeaturesSection from '../components/LandingPage/FeaturesSection';
import AboutUs from '../components/LandingPage/AboutUs'
import Footer from '@/components/Footer/Footer';

const LandingPage = () => {
    // Change the URL without triggering a full page reload
    // const newUrl = `${process.env.NEXT_PUBLIC_HOST}`;
    // window.history.pushState(null, null, newUrl);

    return (
        <>
            <div>
                <Head>
                    <title>KachraDekho - See and Share Unique Products</title>
                </Head>
                <HeroSection />
                <FeaturesSection />
                <AboutUs />
                <Footer/>
            </div>
        </>
    )
}

export default LandingPage
