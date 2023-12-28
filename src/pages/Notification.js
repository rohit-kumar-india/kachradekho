import React, { useEffect, useState } from 'react'
import styles from '../styles/Notification.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setShowNotification} from '../store/slices'
import { BsBoxArrowLeft } from 'react-icons/bs';
import userAvatar from '../assets/userAvatar.png'
import Image from 'next/image';

const Notifications = () => {

    const dispatch = useDispatch()

    const showNotification = useSelector((state) => state.notification.value)

    const [notifications, setNotifications] = useState([])
    const [postUserImage, setpostUserImage] = useState()

    const notifi = [
        {
            "id": "1",
            "notification": "umesh liked your post",
            "mode": "like",
            "userId":""
        },
        {
            "id": "2",
            "notification": "prashant liked your post",
            "mode": "like",
            "userId":""
        },
        {
            "id": "3",
            "notification": "gaurav commented your post",
            "mode": "comment",
            "userId":""
        },
        {
            "id": "1",
            "notification": "umesh liked your post",
            "mode": "like",
            "userId":""
        },
        {
            "id": "2",
            "notification": "prashant liked your post",
            "mode": "like",
            "userId":""
        },
        {
            "id": "3",
            "notification": "gaurav commented your post",
            "mode": "comment",
            "userId":""
        },
        {
            "id": "1",
            "notification": "umesh liked your post",
            "mode": "like",
            "userId":""
        },
        {
            "id": "2",
            "notification": "prashant liked your post",
            "mode": "like",
            "userId":""
        },
        {
            "id": "3",
            "notification": "gaurav commented your post",
            "mode": "comment",
            "userId":""
        },
        {
            "id": "1",
            "notification": "umesh liked your post",
            "mode": "like",
            "userId":""
        },
        {
            "id": "2",
            "notification": "prashant liked your post",
            "mode": "like",
            "userId":""
        },
        {
            "id": "3",
            "notification": "gaurav commented your post",
            "mode": "comment",
            "userId":""
        },
        {
            "id": "1",
            "notification": "umesh liked your post",
            "mode": "like",
            "userId":""
        },
        {
            "id": "2",
            "notification": "prashant liked your post",
            "mode": "like",
            "userId":""
        },
        {
            "id": "3",
            "notification": "gaurav commented your post",
            "mode": "comment",
            "userId":""
        },
    ];

    useEffect(() => {

        setNotifications(notifi)
    }, [])


    return (
        <div className={styles.notifications_container}>
            {showNotification==='true' && <button
                className={styles.back_button}
                onClick={() => dispatch(setShowNotification())}
                ><BsBoxArrowLeft /> Back
            </button>}

            <div className={styles.notifi_container}>
                {
                    notifications.map((data) => {
                        return (
                            <div className={styles.notification}>
                                <div className={styles.photo_notification_hld}>
                                    <div className={styles.photo}>
                                       {!postUserImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                                       <img src={postUserImage} alt="user not found" className={styles.profile_image} />
                                    </div>
                                    <p>{data.notification}</p>
                                </div>
                                <div className={styles.notification_post}>
                                    <Image src="" />
                                </div>
                            </div>
                         
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Notifications
