// components/HeroSection.js
import React from 'react';
import styles from './HeroSection.module.css'; // Import the styles
import Phone from '../../assets/phone.png'
import Image from 'next/image';
import Header from '../header/header';

const HeroSection = () => {
  return (
    <>
        {/* <Header/> */}
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <h1 className={styles.h1}>Discover and Share Hidden Treasures</h1>
          <p className={styles.p}>Explore unique products and connect with sellers. Your journey begins here.</p>
          <div className={styles.ctaButtons}>
            <a href="#explore" className={styles.exploreButton}>
              Explore Now
            </a>
            <a href="#signup" className={styles.signupButton}>
              Sign Up
            </a>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {/* Placeholder Image (replace with your 3D visual or image) */}
          {/* <Image className={styles.img} src={Phone} /> */}
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroSection;
