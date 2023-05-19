import React from 'react'
import styles from './postCard.module.css'
import Image from 'next/image'
import { BiBookmarkPlus } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { IoIosCall } from 'react-icons/io';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import kachra1 from '../../assets/kachra1.jpeg'
import kachra2 from '../../assets/kachra2.jpeg'
import kachra3 from '../../assets/kachra3.jpeg'

const Card = () => {

  const images = [kachra1, kachra2, kachra3];

  return (
    <div className={styles.post_container}>
      {/* upper data part */}
      <div className={styles.post_info}>
        <div className={styles.name_photo_hld}>
          <div className={styles.photo}></div>
          {/* <Image src="" width={20} height={20} />     */}
          <div className={styles.name_address}>
            <h2>Umesh Bhatiya</h2>
            <p>indore</p>
          </div>
        </div>
        <div className={styles.addToFavourite}>
          <BiBookmarkPlus size={30} />
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
                <div className={styles.swiper_slide}>
                  <Image src={image} alt="poster1" layout='responsive' width={300} height={300} />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      {/* description */}
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore consequatur aliquam hic, iure deleniti sed blanditiis ea at vel temporibus.</p>

      {/* bottom data part */}
      <div className={styles.contact_action}>
        <div className={styles.like_comment}>
          <AiOutlineHeart size={25} />
          <BsChat size={25} />
          <IoPaperPlaneSharp size={25} />
        </div>
        <div className={styles.contact}><IoIosCall size={20}/>0123456789</div>
      </div>
    </div>
  )
}

export default Card