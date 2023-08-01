import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import styles from './Profile.module.css'
import { CiShare1 } from 'react-icons/ci';
import { useRouter } from 'next/router';
import userAvatar from '../../assets/userAvatar.png'
import { useSelector } from 'react-redux';

const Profile = () => {
    
    const router = useRouter();
    const currentUser = useSelector((state) => state.currentUser.userData)
    
    const [userImage, setUserImage] = useState(currentUser.profilePicture)

    return (
        <div className={styles.profile_container}>
            <div className={styles.cover_photo}>
                <CiShare1 className={styles.share_icon} onClick={() => router.push('/ProfileDashboard')} />
            </div>
            <div className={styles.below_cover}>
                <div className={styles.photo}>
                    {!userImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                    <img src={userImage} alt="user not found" className={styles.profile_image} />
                </div>
                <h4>{currentUser?.name}</h4>
                <p>{currentUser?.bio}</p>
                <p>10 posts saved</p>
            </div>
        </div>
    )
}

export default Profile
