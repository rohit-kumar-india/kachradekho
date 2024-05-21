import React, { useEffect, useRef, useState } from 'react'
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from '../styles/Home.module.css'
import Profile from './Profile';
import Projects from './Projects';
import Notifications from './Notification';
import { useSelector } from 'react-redux'

const HomePage = () => {

  const divRef = useRef()
  const [prevScrollTop, setprevScrollTop] = useState()

  const showNotification = useSelector((state) => state.notification.value)

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    console.log("scrollTop", scrollTop)
    console.log("scrollHeight", scrollHeight)
    console.log("clientheight", clientHeight)

    // Check if scroll has reached the bottom of the div container
    if (scrollTop + clientHeight >= scrollHeight - 20 && scrollTop > prevScrollTop) {
      
      console.log('Reached the end of the div container!');
      alert("end")
    }
    setprevScrollTop(scrollTop)
  }

  return (
    <div className={styles.container}>

      {/* project profile container */}
      <div className={styles.profile_project_container}>
        {/* profile */}
        <div className={styles.profile}>
          <Profile />
        </div>

        {/* project */}
        <div className={styles.project}>
          {showNotification==='false' ? <Projects /> :
          <Notifications/>}
        </div>

        {/* notifications */}
        <div className={styles.notifications}>
          <h4>Notifications</h4>
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
