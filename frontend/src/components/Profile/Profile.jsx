import React from 'react'
import Image from 'next/image';
import styles from './Profile.module.css'
import { CiShare1 } from 'react-icons/ci';
import { useRouter } from 'next/router';
import user from '../../assets/user.jpg'
import { useSelector } from 'react-redux';

const Profile = () => {
    const router = useRouter();
    const currentUser = useSelector((state) => state.currentUser.userData)

    return (
        <div className={styles.profile_container}>
            <div className={styles.cover_photo}>
                <CiShare1 className={styles.share_icon} onClick={() => router.push('/ProfileDashboard')} />
            </div>
            <div className={styles.below_cover}>
                <div className={styles.photo}>
                    <Image
                        alt='user_photo'
                        src={user}
                        layout='responsive'
                        objectFit='cover'
                        width={'100%'}
                        height={'100%'}

                    />
                </div>
                <h4>{currentUser.name}</h4>
                <p>{currentUser.bio}</p>
            </div>
        </div>
    )
}

export default Profile
