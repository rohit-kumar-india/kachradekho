import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-scroll';
import styles from './header.module.css'
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FiBell } from 'react-icons/fi';
import { BsCloudUpload } from 'react-icons/bs';
import Login from '../loginSignup/Login';
import Signup from '../loginSignup/Signup';
import CreateProject from '../CreateProject/CreateProject';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setShowCreateProject, setShowLogin, setShowNotification, setShowRegister, logout } from '../../store/slices'
import KDL from '../../assets/KDL1.png'
import LOGO1 from '../../assets/logo.png'
import LOGO from '../../assets/InvestoGemsLogo.png';
import Image from 'next/image';
import trash from "../../assets/trash2.png";

const header = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const showCreateProject = useSelector((state) => state.createProject.value)
    const showLogin = useSelector((state) => state.logIn.value)
    const showRegister = useSelector((state) => state.register.value)
    const isLoggedIn = useSelector((state) => state.auth.loggedIn);
    const currentUser = useSelector((state) => state.currentUser.userData)

    const [showMenu, setShowMenu] = useState(false)

    const [scrollPosition, setScrollPosition] = useState(0);


  let toggle = false;
  const handleHamburger = ()=>{
    const parentDiv = document.getElementById("hamburger");

    // Check if the parent div exists
    if (parentDiv) {
      // Get all children elements of the parent div
      const children = parentDiv.children;

      // Loop through the children elements and add a class
      for (let i = 0; i < children.length; i++) {
        children[i].classList.toggle(styles.mobileHam);
      }
    }
    
    // toggle sidebar
    toggle = !toggle;
    const myDiv = document.getElementById("landingOptions");
    if(myDiv){
        myDiv.style.right = toggle==true ? 0 : '-220px';
    }
  }
    
  useEffect(() => {
    const handleScroll = () => {
      // Update the scroll position state when scrolling
      setScrollPosition(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to run the effect only once

  const divContainer = {
    backgroundColor: scrollPosition > 700 || isLoggedIn===true ? '#3F3BAA' : 'transparent',
  };
  const divLandingOptions = {
    display: isLoggedIn===true ? 'none' : 'visible',
    color: scrollPosition > 700 ? '#fff' : '#3F3BAA',
  };

    return (
        <>

            {/* create post popup */}
            {showCreateProject === "true" && <div className={styles.create_post_popup}>
                <CreateProject />
            </div>}

            {/* show login signup pages */}
            {showLogin === "true" && <div className={styles.login_popup}>
                <Login />
            </div>}
            {showRegister === "true" && <div className={styles.signup_popup}>
                <Signup />
            </div>}

            <nav>
                <div id='container' style={divContainer} className={styles.container}>

                    {/* logo */}
                    <div
                    onClick={()=>router.push('/')}
                    className={styles.mobile_logo}>
                        <Image src={trash} layout='responsive' width="100%" height="100%" objectFit='contain' />
                    </div>
                    <div
                    onClick={()=>router.push('/')}
                    className={styles.logo}>
                        <Image className={styles.img} src={LOGO} layout='responsive' width="100%" height="100%" objectFit='cover' />
                    </div>

                    {/* search bar */}
                    {isLoggedIn !== false && <div className={styles.search_bar}>
                        <input type="search" name="" id="" placeholder='search products...' />
                        <div className={styles.search_icon}>
                            <AiOutlineSearch size={25} />
                        </div>
                    </div>}

                    {/* mobile notification */}
                    {isLoggedIn !== false && <div className={styles.mobile_notification}
                        onClick={() => {
                            dispatch(setShowNotification())
                        }}>
                        <FiBell size={25} />
                        <div className={styles.notification_light}></div>
                    </div>}

                    {/* optins which will show only on landing page */}
                    <div id='landingOptions' style={divLandingOptions} className={styles.landing_options}>
                        <Link to="hero" className={styles.landing_links} smooth={true} duration={500}>
                            Home
                        </Link>
                        <Link to="features" className={styles.landing_links} smooth={true} duration={500}>
                            Features
                        </Link>
                        <Link to="about" className={styles.landing_links} smooth={true} duration={500}>
                            About Us
                        </Link>

                        {isLoggedIn === false && <div className={styles.btn} onClick={() => dispatch(setShowLogin())}>
                            Login / Signup
                        </div>}
                    </div>

                    {/* hamburger for landing page */}
                    {
                       isLoggedIn==false && <div
                       id='hamburger'
                       onClick={()=>handleHamburger()}
                       className={styles.hamburger}>
                            <div className={styles.line}></div>
                            <div className={styles.line}></div>
                            <div className={styles.line}></div>
                        </div>
                    }

                    {/* profile section */}
                    <div className={styles.profile_auth}>

                        {isLoggedIn !== false && <div className={`${styles.uploadBtn} ${styles.upload}`} onClick={() => dispatch(setShowCreateProject())}>
                            <BsCloudUpload />
                            Upload Project
                        </div>}
                        {isLoggedIn !== false && <div className="profile-icon">
                            <CgProfile onClick={() => {
                               
                                setShowMenu(!showMenu)
                            }}
                                size={35} style={{ cursor: "pointer" }} />

                            {/* profile menu */}
                            {showMenu && <div className={styles.profile_menu}>
                                <ul>
                                    <li onClick={() => router.push(`/profile/${currentUser.username}`)}>View Profile</li>
                                    <li>Change Password</li>
                                    <li>Uppload Project</li>
                                    <li onClick={() => {
                                        dispatch(logout())
                                        window.location.reload()
                                    }} > Logout</li>
                                </ul>
                            </div>}
                        </div>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default header
