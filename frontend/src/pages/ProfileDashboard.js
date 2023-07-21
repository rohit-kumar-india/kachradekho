import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image';
import styles from '@/styles/ProfileDashboard.module.css'
import Head from 'next/head'
import { IoMdSettings } from 'react-icons/io';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { BsFillPencilFill } from 'react-icons/bs';
import PostCard from '../components/PostCard/postCard'
import EditProfile from '../components/EditProfile/EditProfile'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setShowEditPopup, logout, setUserData } from '@/store/slices';
import userAvatar from '../assets/userAvatar.png'
import compressAndResizeImage from '@/components/compressFile';
import Loader from '../assets/loader.gif'

const Profile = () => {

  const [activeComponent, setActiveComponent] = useState('posts');
  const [showSettings, setShowSettings] = useState(false)
  const [userImage, setuserImage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  // const [imageId, setImageId] = useState()

  const showEditPopup = useSelector((state) => state.editPopup.value)
  const currentUser = useSelector((state) => state.currentUser.userData)

  const router = useRouter();
  const dispatch = useDispatch();

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  //convert image in base64 format
  // function convertToBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = async () => {
  //       // setuserImage(reader.result)
  //       resolve(reader.result)
  //     };
  //     reader.onerror = (error) => {
  //       console.error('Error converting image to base64:', error);
  //       reject(error)
  //     };
  //   })
  // };

  //modify imageId in the user profile
  const modifyprofilepicture = async (imageId) => {
    // console.log(currentUser.userId, imageId)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/editProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.userId,
          profilePicture: imageId
        }),
      })

      // update the token data for current user
      const data = {
        userId: currentUser.userId,
        name: currentUser.name,
        username: currentUser.username,
        gender: currentUser.gender,
        contactNo: currentUser.contactNo,
        bio: currentUser.bio,
        country: currentUser.country,
        state: currentUser.state,
        city: currentUser.city,
        address: currentUser.address,
        post: currentUser.post,
        profilePicture: imageId,
      }
      dispatch(setUserData(data))
      console.log("token updated")
    } catch (error) {
      console.log("error while modify imageId", error)
    }
  }

  // for setting the profile picture
  const handleImageChange = async (e) => {
    e.preventDefault();


    const file = e.target.files[0]
    const compressedImage = await compressAndResizeImage(file, 50)
    try {
      const data = {
        title: "user profile image",
        file: compressedImage,
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const imageId = await response.json()
      modifyprofilepicture(imageId.imageId)
      alert("Image uploaded successfully")
      // console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }

  }

  //fetch user image from database
  const fetchUserImage = async (imageId) => {
    setIsLoading(true)
    // console.log("image", imageId)
    // alert("hello")
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/image?imageId=${imageId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const image = await response.json()
    // console.log(image.image[0].file)
    if (image.success) {

      setuserImage(image.image[0].file)
    }

    setIsLoading(false)
  }

  // //fetch user profile from server
  // const fetchtUserProfile = async () => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser?userId=${currentUser?.userId}`);
  //     const userData = await response.json();
  //     fetchUserImage(userData.user.profilePicture)
  //   } catch (error) {
  //     console.log("error while fetching user profile", error)
  //   }
  // }

  useEffect(() => {
    // fetchtUserProfile()

    fetchUserImage(currentUser.profilePicture)
  }, [currentUser, userImage, activeComponent])

  useCallback(() => {
    // console.log(currentUser)
  }, [activeComponent])

  return (
    <>
      <Head>
        <title>KachraDekho | Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* edit profile */}
      {showEditPopup === 'true' && <div className={styles.edit_popup}>
        <EditProfile />
      </div>}

      {/* profile details */}
      <div className={styles.container}>

        <button
          className={styles.back_button}
          onClick={() => router.push('/')}
        ><BsBoxArrowLeft /> Back</button>

        <div className={styles.inner_container}>

          {/* upper part for basic details */}
          <div className={styles.details_hld}>
            <div className={styles.profleImage_Container}>
              <div className={styles.photo_hld}>
                {!userImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                <img src={userImage} alt="image not found" className={styles.profile_image} />
                {!userImage && <div className={styles.loader}>
                  <Image
                    alt='loader'
                    src={Loader}
                    objectFit='contain'
                    width={30}
                    height={30}
                  />
                </div>}
              </div>
              <div className={styles.change_image}>
                <label htmlFor="icon"><BsFillPencilFill /></label>
                <input type="file" name="icon" id="icon" accept='.jpeg, .png, .jpg' onChange={handleImageChange} />
                {/* <div className={styles.change_popup}><p>Change Photo jjjg</p></div> */}
              </div>
            </div>
            <div className={styles.name_post_hld}>
              <div className={styles.name_bio_hld}>
                <div className={styles.name}>
                  <span>{currentUser.name}</span>
                  <button onClick={() => dispatch(setShowEditPopup())}>Edit Profile</button>
                  <IoMdSettings size={30}
                    onClick={() => setShowSettings(!showSettings)}
                    style={{ cursor: "pointer" }}
                  />

                  {/* settings */}
                  {showSettings && <div className={styles.settings}>
                    <ul>
                      <li
                        onClick={() => router.push("/ChangePassword")}
                      >Change Password</li>
                      <li
                        onClick={() => {
                          dispatch(logout())
                          router.push('/')
                          // window.location.reload()
                        }}>Logout</li>
                    </ul>
                  </div>}
                </div>
                <div className={styles.user_data}>
                  <span>{currentUser.bio}</span>
                  {/* <span>date of birth</span> */}
                  <span>{currentUser.gender}</span>
                  <span>{currentUser.contactNo}</span>
                  <span>{currentUser.address}, {currentUser.city}, {currentUser.state}, {currentUser.country}</span>
                </div>
              </div>
              <div className={styles.post}>
                <span>100 posts</span>
                <span>100 saved</span>
              </div>
            </div>
          </div>

          {/* bottom part for posts */}
          <div className={styles.post_details}>
            <div className={styles.details_type}>
              <span
                className={`${activeComponent === 'posts' ? styles.activePost : ''
                  }`}
                onClick={() => handleComponentChange('posts')}>Posts</span>
              <span
                className={`${activeComponent === 'saved' ? styles.activePost : ''
                  }`}
                onClick={() => handleComponentChange('saved')}>Saved</span>
            </div>

            {/* show posts */}
            <div className={styles.slider}>
              {activeComponent === "posts" && <div
                className={`${styles.sliderWrapper} ${activeComponent === 'posts' ? styles.active : ''
                  }`}
              >
                <PostCard />
                <PostCard />
              </div>}
              {activeComponent === "saved" && <div
                className={`${styles.sliderWrapper} ${activeComponent === 'saved' ? styles.active : ''
                  }`}
              >
                <PostCard />
                <PostCard />
              </div>}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Profile

// export async function getServerSideProps() {

//   return {
//     props: {

//     },
//   };
// }