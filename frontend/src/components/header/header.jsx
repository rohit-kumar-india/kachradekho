import React, { useState, useCallback, useEffect } from 'react'
import styles from './header.module.css'
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FiBell } from 'react-icons/fi';
import { BsCloudUpload } from 'react-icons/bs';
import Login from '../loginSignup/Login';
import Signup from '../loginSignup/Signup';
import CreatePost from '../CreatePost/CreatePost';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setShowCreatePost, setShowLogin, setShowRegister, logout} from '../../store/slices'
import KDL from '../../assets/KDL1.png'
import Image from 'next/image';
import trash from "../../assets/trash2.png";
import Notifications from '../Notifications/Notifications';

const header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [isNotification, setIsNotification] = useState(false)
    const router = useRouter();
    const showCreatePost = useSelector((state) => state.createPost.value)
    const showLogin = useSelector((state) => state.logIn.value)
    const showRegister = useSelector((state) => state.register.value)
    const isLoggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch()

    const shoNotification = useCallback(() => {

        setIsNotification(!isNotification);
    }, [isNotification])

    useEffect(() => {
        console.log("isLoggedIn: ", isLoggedIn)
    },[])

    return (
        <>

            {/* create post popup */}
            {showCreatePost === "true" && <div className={styles.create_post_popup}>
                <CreatePost />
            </div>}

            {/* show login signup pages */}
            {showLogin === "true" && <div className={styles.login_popup}>
                <Login />
            </div>}
            {showRegister === "true" && <div className={styles.signup_popup}>
                <Signup />
            </div>}


            <div className={styles.container}>

                {/* logo */}
                <div className={styles.mobile_logo}>
                    <Image src={trash} layout='responsive' width="100%" height="100%" objectFit='contain' />
                </div>
                <div className={styles.logo}>
                    <Image src={KDL} layout='responsive' width="100%" height="100%" objectFit='cover' />
                </div>

                {/* search bar */}
                {isLoggedIn!==false && <div className={styles.search_bar}>
                    <input type="search" name="" id="" placeholder='search products...' />
                    <div className={styles.search_icon}>
                        <AiOutlineSearch size={25} />
                    </div>
                </div>}

                {/* mobile notification */}
                {isLoggedIn!==false && <div className={styles.mobile_notification}
                    onClick={() => {
                        shoNotification();
                        if (showMenu) {
                            setShowMenu(!showMenu);
                        }
                    }}
                >
                    <FiBell size={25} />
                    <div className={styles.notification_light}></div>

                    {isNotification && isLoggedIn!==false && <div className={styles.notification_container}>
                        <Notifications />
                    </div>}
                </div>}

                {/* profile section */}
                <div className={styles.profile_auth}>
                    {isLoggedIn===false && <div className={styles.btn} onClick={() => dispatch(setShowLogin())}>
                        Login / Register
                    </div>}

                    {isLoggedIn!==false && <div className={`${styles.btn} ${styles.upload}`} onClick={() => dispatch(setShowCreatePost())}>
                        <BsCloudUpload />
                        Upload Kachra
                    </div>}
                    {isLoggedIn!==false && <div className="profile-icon">
                        <CgProfile onClick={() => {
                            if (isNotification) {
                                shoNotification();
                            }
                            setShowMenu(!showMenu)
                        }}
                            size={35} style={{ cursor: "pointer" }} />

                        {/* profile menu */}
                        {showMenu && <div className={styles.profile_menu}>
                            <ul>
                                <li onClick={() => router.push('/ProfileDashboard')}>View Profile</li>
                                <li>Change Password</li>
                                <li>Uppload Kachra</li>
                                <li onClick={() => {
                                    dispatch(logout())
                                    window.location.reload()
                                }} > Logout</li>
                            </ul>
                        </div>}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default header
