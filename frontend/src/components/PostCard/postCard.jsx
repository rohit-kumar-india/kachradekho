import React, { useEffect, useState, useCallback } from 'react'
import styles from './postCard.module.css'
import Image from 'next/image'
import { BiBookmarkPlus } from 'react-icons/bi';
import { IoHeart, IoHeartDislike } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs';
import { IoIosCall } from 'react-icons/io';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper";
import userAvatar from '../../assets/userAvatar.png'
import "swiper/css";

const Card = ({ post }) => {

  const [user, setUser] = useState({})
  const [images, setImages] = useState([])
  const [postUserImage, setpostUserImage] = useState()
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(post?.likes || 0)

  //fetch user profile of each post
  const fetchUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user?userId=${post?.user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const userData = await response.json();
    setUser(userData.user)

    //fetch user profile image
    if (userData.user && userData.user.profilePicture) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getImage?imageId=${userData.user.profilePicture}`)
      const image = await res.json()
      // console.log(image)
      setpostUserImage(image.image[0].file)
    }
  };

  //fetch post images
  const fetchImages = async () => {
    const imageUrls = []
    if (post?.images) {
      await Promise.all(post.images.map(async (imageId) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getImage?imageId=${imageId}`)
        const image = await response.json()
        imageUrls.push(image.image[0].file)
      }))

    }
    setImages(imageUrls)
  }

  //set likes in the database
  const handleLike = async () => {
    try {
      let like = likes;
      like = isLiked ? like - 1 : like + 1;
      await setIsLiked(prevIsLiked => !prevIsLiked);
      setLikes(like); // Update the local likes state
      sendLikesToServer(like);
    } catch (error) {
      console.error('Error updating like:', error);
      // Handle error here, such as showing a notification or alert
    }
  };

  //for sending the likes response to the server
  let sendLikesToServer = async (like) => {

    // Send the like action to the server
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        like,
        postId: post._id
      })
    })
    const likeres = await res.json()
    console.log(likeres)
  }

  useEffect(() => {
    if (user && Object.keys(user).length === 0) {
      fetchUser();
      fetchImages()
    }
  }, [user]);

  return (
    <div className={styles.post_container} key={user?._id}>
      {/* upper data part */}
      <div className={styles.post_info}>
        <div className={styles.name_photo_hld}>
          <div className={styles.photo}>
            {!postUserImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
            <img src={postUserImage} alt="user not found" className={styles.profile_image} />
          </div>
          {/* <Image src="" width={20} height={20} />     */}
          <div className={styles.name_address}>
            <div className={styles.name}>
              <h3>{user?.name}</h3>
              <div className={styles.dot}></div>
              <p>2d ago</p>
            </div>
            <p>{user?.city}</p>
          </div>
        </div>
        <div className={styles.addToFavourite}>
          <BiBookmarkPlus size={25} />
        </div>
      </div>
      {/* image */}
      <div id='post_images' className={styles.post_images}>
        {/* product name */}
        <p style={{ color: 'gray' }}>{post?.productName}</p>

        {/* product images */}
        <Swiper
          // data-aos-duration="2000"
          spaceBetween={30}
          slidesPerView={1}
          grabCursor={true}
          centeredSlides={true}
          effect={'fade'}
          navigation={true}
          pagination
          modules={[Navigation, Pagination]}
        >
          {images.map((image) => {
            return (
              <SwiperSlide >
                <img src={image} alt="poster1" />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      {/* description */}
      <div className={styles.caption}>
        <p><span style={{ color: 'black', fontWeight: 'bold' }}>{user?.name}</span> {post?.caption}</p>
      </div>

      {/* bottom data part */}
      <div className={styles.bottom_part}>
        <div className={styles.contact_action}>
          <div className={styles.like_comment}>
            <button
              style={{ border: 'none', background: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={handleLike}>
              {isLiked && <IoHeart size={30} color='red' />}
              {!isLiked && < AiOutlineHeart size={30} />}
            </button>
            <BsChat size={25} />
            <IoPaperPlaneOutline size={25} />
          </div>
          <div className={styles.contact}><IoIosCall size={20} />{user?.contactNo}</div>
        </div>

        {/* show likes */}
        <p>{likes} likes</p>
      </div>
    </div>
  )
}

export default Card
