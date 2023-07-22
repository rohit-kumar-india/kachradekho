import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import styles from './Profile.module.css'
import { CiShare1 } from 'react-icons/ci';
import { useRouter } from 'next/router';
import userAvatar from '../../assets/userAvatar.png'
import { useSelector } from 'react-redux';

const Profile = () => {
    const [userImage, setUserImage] = useState()

    const router = useRouter();
    const currentUser = useSelector((state) => state.currentUser.userData)

    //fetch user image from database
    const fetchImage = async (imageId) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/image?imageId=${imageId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const image = await response.json()
        // console.log(image.image[0].file)
        if (image.success) {
            setUserImage(image.image[0].file)
        }
    }

    useEffect(() => {
        fetchImage(currentUser.profilePicture)
    }, [])

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
                <h4>{currentUser.name}</h4>
                <p>{currentUser.bio}</p>
                <p>10 posts saved</p>
            </div>
        </div>
    )
}

export default Profile
