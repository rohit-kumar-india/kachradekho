import React, { useEffect, useState } from 'react';
import styles from '../styles/Notification.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setShowNotification } from '../store/slices';
import { BsBoxArrowLeft } from 'react-icons/bs';
import userAvatar from '../assets/userAvatar.png';
import Image from 'next/image';

const Notifications = () => {
  const dispatch = useDispatch();
  const showNotification = useSelector((state) => state.notification.value);
  const currentUser = useSelector((state) => state.currentUser.userData);

  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNoMore, setIsNoMore] = useState(false);

  const ws = new WebSocket(`ws://${window.location.host}/api/notifications`);

  const fetchNotifications = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/notification?limit=10&page=1&currUser=${currentUser.username}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log(data)
    if (data.length === 0) {
      setIsNoMore(true);
    }
    setNotifications((prevNotifications) => [...prevNotifications, ...data]);
  };

  const handleScroll = async (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading && !isNoMore) {
      setIsLoading(true);
      await fetchNotifications();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // WebSocket message event handler
    ws.addEventListener('message', (event) => {
      const notificationData = JSON.parse(event.data);
      console.log('Received WebSocket message:', notificationData);
      setNotifications((prevNotifications) => [notificationData, ...prevNotifications]);
    });

    return () => {
      // Close WebSocket connection on component unmount
      ws.close();
    };
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className={styles.notifications_container}>
      {showNotification === 'true' && (
        <button
          className={styles.back_button}
          onClick={() => dispatch(setShowNotification())}
        >
          <BsBoxArrowLeft /> Back
        </button>
      )}

      <div className={styles.notifi_container} onScroll={handleScroll}>
        {notifications.map((data) => (
          <div key={data._id} className={styles.notification}>
            <div className={styles.photo_notification_hld}>
              <div className={styles.photo}>
                <Image src={data.senderImage} width={100} height={100} alt="user not found" className={styles.profile_image} />
              </div>
              <span>{data.notifi.sender}</span>
              <p>{data.notifi.text}</p>
              <span>{data.notifi.commentText}</span>
            </div>
            <div className={styles.notification_post}>
              {/* Display post content here */}
              <Image src={data.postImage} width={100} height={100} alt="post not found" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
