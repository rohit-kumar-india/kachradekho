import React from 'react'
import Header from '@/components/header/header'
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from '../styles/Home.module.css'
import Profile from '@/components/Profile/Profile';
import Post from '@/components/Post/Post';
import Notifications from '@/components/Notifications/Notifications';
import CreatePost from '@/components/CreatePost/CreatePost';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Header />

   

      {/* post profile container */}
      <div className={styles.profile_post_container}>
        {/* profile */}
        <div className={styles.profile}>
          <Profile />
        </div>
        {/* post */}
        <div className={styles.post}>
          <Post />
        </div>
        {/* notifications */}
        <div className={styles.notifications}>
          <Notifications />
        </div>
      </div>

      {/*  */}
    </div>
    
  )
}

export default HomePage
