import React, { useState, useEffect } from 'react'
import styles from './header.module.css'
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { BsCloudUpload } from 'react-icons/bs';
import Login from '../loginSignup/Login';
import Signup from '../loginSignup/Signup';
import CreatePost from '../CreatePost/CreatePost';
// import { Link } from 'react-router-dom';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setShowCreatePost, setShowLogin, setShowRegister } from '../../store/popUpSlice'

const header = () => {
    const [showLoginForm, setshowLoginForm] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const router = useRouter();
    const showCreatePost = useSelector((state) => state.createPost.value)
    const showLogin = useSelector((state) => state.logIn.value)
    const showRegister = useSelector((state) => state.register.value)
    const dispatch = useDispatch()


    useEffect(() => {

    }, [showCreatePost])

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
                <div className={styles.logo}>
                    Logo
                    {showLogin}
                </div>

                {/* search bar */}
                <div className={styles.search_bar}>
                    <input type="search" name="" id="" placeholder='search here...' />
                    <AiOutlineSearch size={25} />
                </div>

                {/* profile section */}
                <div className={styles.profile_auth}>
                    {!isLoggedIn && <div className={styles.btn} onClick={() => dispatch(setShowLogin())}>
                        Login / Register
                    </div>}

                    {isLoggedIn && <div className={styles.btn} onClick={() => dispatch(setShowCreatePost())}>
                        <BsCloudUpload />
                        Upload Kachra
                    </div>}
                    {isLoggedIn && <div className="profile-icon">
                        <CgProfile onClick={() => setShowMenu(!showMenu)} size={40} style={{ cursor: "pointer" }} />

                        {/* profile menu */}
                        {showMenu && <div className={styles.profile_menu}>
                            <ul>
                                <li onClick={() => router.push('/ProfileDashboard')}>View Profile</li>
                                <li>Change Password</li>
                                <li>Uppload Kachra</li>
                                <li>Logout</li>
                            </ul>
                        </div>}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default header
