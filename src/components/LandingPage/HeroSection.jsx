// components/HeroSection.js
import React from 'react';
import styles from './HeroSection.module.css'; // Import the styles
import Phone from '../../assets/phone.png'
import Image from 'next/image';
import { useDispatch } from 'react-redux'
import { setShowLogin} from '../../store/slices'

const HeroSection = () => {
    const dispatch = useDispatch()
    
  return (
    <>
        {/* <Header/> */}
    <section id='hero' className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <h1 className={styles.h1}>Discover and Share Hidden Treasures</h1>
          <p className={styles.p}>Explore unique products and connect with sellers. Your journey begins here.</p>
            <button 
            onClick={() => dispatch(setShowLogin())}
            className={styles.signupButton}>
              Sign Up
            </button>
          <div className={styles.ctaButtons}>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {/* Placeholder Image (replace with your 3D visual or image) */}
          <Image className={styles.img} src={Phone}/>
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroSection;
