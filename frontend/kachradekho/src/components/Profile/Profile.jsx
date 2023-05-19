import React from 'react'
import styles from './Profile.module.css'
import { CiShare1 } from 'react-icons/ci';

const Profile = () => {
    return (
        <div className={styles.profile_container}>
                <div className={styles.cover_photo}>
                    <CiShare1 className={styles.share_icon} />
                </div>
                <div className={styles.below_cover}>
                    <div className={styles.photo}>
                        <img src="" alt="" />
                    </div>
                    <h4>Umesh Kumar Bhatiya</h4>
                </div>
        </div>
    )
}

export default Profile
