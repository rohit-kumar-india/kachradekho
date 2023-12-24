// components/HowItWorksSection.js
import React from 'react';
import styles from './HowItWorksSection.module.css'; // Import the styles

const HowItWorksSection = () => {
  return (
    <section className={styles.howItWorks}>
      <div className={styles.step}>
        <img src="/upload-icon.png" alt="Upload Icon" />
        <p>Step 1: Upload your unique find.</p>
      </div>
      <div className={styles.step}>
        <img src="/connect-icon.png" alt="Connect Icon" />
        <p>Step 2: Connect with like-minded treasure hunters.</p>
      </div>
      <div className={styles.step}>
        <img src="/engage-icon.png" alt="Engage Icon" />
        <p>Step 3: Receive likes, comments, and shares.</p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
