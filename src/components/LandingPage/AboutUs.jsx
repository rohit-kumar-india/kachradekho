// components/AboutUsSection.js
import React from 'react';
import styles from './AboutUs.module.css'; // Import the styles
import Vec from '../../assets/ab.png'
import Image from 'next/image';

const AboutUsSection = () => {
  return (
    <section id='about' className={styles.aboutUs}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {/* Image (replace with your actual image URL) */}
          {/* <img src='../../assets/about_back2.png' alt="About Us" /> */}
          <Image className={styles.img} src={Vec}/>
        </div>
        <div className={styles.contentContainer}>
          <h2 className={styles.h2}>About Us</h2>
          <p className={styles.p}>
            Welcome to KachraDekho, where we believe that every discarded item has a story to tell.
            Our platform connects treasure hunters with sellers, creating a community of discovery and
            sharing.
          </p>
          <p className={styles.p}>
            At KachraDekho, we're passionate about sustainability, creativity, and the joy of finding
            hidden gems. Our mission is to reduce waste by giving new life to pre-loved items and
            fostering a community that values uniqueness.
          </p>
          <p className={styles.p}>
            Meet the team behind KachraDekho - a group of individuals dedicated to building a platform
            that celebrates the beauty in the discarded.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
