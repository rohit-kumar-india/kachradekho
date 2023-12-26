import React, { useEffect, useState } from 'react'
import styles from './Notifications.module.css'
import { AiFillLike } from 'react-icons/ai';
import { AiOutlineComment } from 'react-icons/ai';

const Notifications = () => {

    const [notifications, setNotifications] = useState([])

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
        }
    ];

    useEffect(() => {

        setNotifications(notifi)
    }, [])


    return (
        <div className={styles.notifications_container}>
            <h4>Notifications</h4>

            <div className={styles.notifi_container}>
                {
                    notifications.map((data) => {
                        return (
                            data.mode === "like" ? <div className={styles.like}>
                                <AiFillLike className={styles.icon} />
                                <p>{data.notification}</p>
                            </div>
                                :
                                <div className={styles.comment}>
                                    <AiOutlineComment className={styles.icon} />
                                    <p>{data.notification}</p>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Notifications
