import React, { useEffect, useState, useCallback } from 'react'
import styles from './postCard.module.css'
import Image from 'next/image'
import { BiBookmarkPlus } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { IoIosCall } from 'react-icons/io';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import kachra1 from '../../assets/kachra1.jpeg'
import kachra2 from '../../assets/kachra2.jpeg'
import kachra3 from '../../assets/kachra3.jpeg'
// import user from '../../assets/user.jpg'

const Card = ({ post }) => {

  const [user, setUser] = useState({})
  const [images, setImages] = useState([])

  const fetchUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser?userId=${post?.user}`);
    const userData = await response.json();
    // console.log(userData)
    setUser(userData.user)
  };

  const fetchImages = async () => {
    const imageUrls = []
    if(post?.images){
     await Promise.all(post.images.map(async (imageId) => {
       const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getImage?imageId=${imageId}`)
       const image = await response.json()
       // console.log(image.image[0].file)
       imageUrls.push(image.image[0].file)
     }))
      
    }
    console.log(imageUrls)
    setImages(imageUrls)
  }
 
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      fetchUser();
      fetchImages()
    }
    console.log(images)
  }, [user]);

return (
    <div className={styles.post_container} key={user.id}>
      {/* upper data part */}
      <div className={styles.post_info}>
        <div className={styles.name_photo_hld}>
          <div className={styles.photo}>
            <Image
              alt='user'
              src={kachra1}
              layout='responsive'
              objectFit='cover'
              width={'100%'}
              height={'100%'}

            />
          </div>
          {/* <Image src="" width={20} height={20} />     */}
          <div className={styles.name_address}>
            <div className={styles.name}>
              <h3>{user.name}</h3>
              <div className={styles.dot}></div>
              <p>2d ago</p>
            </div>
            <p>{user.city}</p>
          </div>
        </div>
        <div className={styles.addToFavourite}>
          <BiBookmarkPlus size={25} />
        </div>
      </div>
      {/* image */}
      <div id='post_images' className={styles.post_images}>
        <Swiper
          // data-aos-duration="2000"
          spaceBetween={30}
          slidesPerView={1}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          effect={'fade'}
          navigation={true}
          // autoplay={{
          //     delay: 8000,
          //     disableOnInteraction: false,
          // }}
          modules={[Autoplay, Navigation]}
        >
          {images.map((image) => {
            return (
              <SwiperSlide >
                <img src={image} alt="poster1"  />

              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      {/* description */}
      <p>{post?.caption}</p>

      {/* bottom data part */}
      <div className={styles.contact_action}>
        <div className={styles.like_comment}>
          <AiOutlineHeart size={30} />
          <BsChat size={25} />
          <IoPaperPlaneOutline size={25} />
        </div>
        <div className={styles.contact}><IoIosCall size={20} />0123456789</div>
      </div>
    </div>
  )
}

export default Card
