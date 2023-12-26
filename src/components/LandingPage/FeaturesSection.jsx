// components/FeaturesSection.js
import React from 'react';
import { FaGem, FaUserFriends, FaHeart } from 'react-icons/fa'; // Import icons
import styles from './FeaturesSection.module.css'; // Import the styles

const FeaturesSection = () => {
  return (
    <section id='features' className={styles.features}>
      <div className={styles.feature}>
        <FaGem className={styles.icon} />
        <h2>Explore Unique Products</h2>
        <p>Discover a world of unique treasures from various sellers. Your next find awaits!</p>
      </div>
      <div className={styles.feature}>
        <FaUserFriends className={styles.icon} />
        <h2>Connect with Sellers</h2>
        <p>Build meaningful connections with sellers and fellow treasure hunters in the community.</p>
      </div>
      <div className={styles.feature}>
        <FaHeart className={styles.icon} />
        <h2>Like, Comment, Share</h2>
        <p>Engage with the community by liking, commenting, and sharing your favorite discoveries.</p>
      </div>
    </section>
  );
};

export default FeaturesSection;
