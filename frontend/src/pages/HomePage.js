import React, { useEffect } from 'react'
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

  const onScroll = () => {
    console.log("hello")
  }
  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    }
  }, []);

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

          {/* copyright */}
          <div className={styles.copyright}>
            <p>Copyright &copy; 2023, All Right Reserved <br /> Developed by Bugide.</p>
          </div>
        </div>
      </div>

      {/*  */}
    </div>

  )
}

export default HomePage
