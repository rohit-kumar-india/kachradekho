import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router';
import styles from './postCard.module.css'
import Image from 'next/image'
import { BiBookmarkPlus } from 'react-icons/bi';
import { IoHeart } from 'react-icons/io5';
import { AiOutlineHeart } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs';
import { IoIosCall } from 'react-icons/io';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { IoSendSharp } from 'react-icons/io5';
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper";
import userAvatar from '../../assets/userAvatar.png'
import "swiper/css";
import Comment from '../commentBox/comment';
import { useSelector } from 'react-redux'
import Loader from '../../assets/loader.gif'

const Card = ({ post, mode }) => {

  const router = useRouter()
  const currUser = useSelector((state) => state.currentUser.userData)

  const [user, setUser] = useState({})
  const [images, setImages] = useState([])
  const [postUserImage, setpostUserImage] = useState()
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(post?.likes || 0)
  const [showCommentBox, setshowCommentBox] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [commentsCnt, setCommentsCnt] = useState(post?.comments?.length || 0)
  const [isShowSetting, setIsShowSetting] = useState(false)

  //fetch user profile of each post
  const fetchUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user?userId=${post?.user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const userData = await response.json();
    setUser(userData)

    //fetch user profile image
    if (userData && userData.profilePicture) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getImage?imageId=${userData.profilePicture}`)
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
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        like,
        postId: post._id
      })
    })
  }

  // send comment to the server
  const handleSendComment = async () => {
    if (Object.keys(newComment).length > 0) {
      setIsSending(true)
      const cmt = {
        text: newComment,
        user: currUser.userId,
        allCommentIds: ''
      }
      try {
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cmt),
        })
          .then(async (res) => {
            if (res.ok) {
              const commentId = await res.json()
              await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  commentId,
                  postId: post._id
                }),
              })
            }
          }).then(() => {
            setCommentsCnt(commentsCnt + 1)
            setNewComment('')
            setIsSending(false);
          })
      } catch (error) {
        alert(error)
      }
    }
    else {
      alert("please write a comment...")
    }
  }

  // delete comment
  const deleteComment = async (commentId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/comment?commentId=${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const replies = await res.json()
    return replies
  }

  // delete post
  const handleDeletePost = async (postId) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post?postId=${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (res) => {
          if (res.ok) {
            // delete all comments related to this post
            post.comments?.map(async (commentId) => {
              const deleteCmt = await deleteComment(commentId)
              deleteCmt?.map(async (replyId) => {
                const deleteRpl = await deleteComment(replyId)
              })
            })

            // delete all images related to this post
            post.images?.map( async (imageId) => {
              await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/image?imageId=${imageId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            })

            // remove postId from user schema

          }
        })
        .then(() => {
          alert("post deleted succesfully!, please reload the page.")
        })
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    if (user && Object.keys(user).length === 0) {
      fetchUser();
      fetchImages()
    }
  }, [user]);

  useEffect(() => {
    if (mode === 'profile') {
      fetchUser();
      fetchImages()
    }
  }, [])

  return (
    <>
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
                <h3
                  onClick={() => router.push(`/profile/${user.username}`)}>
                  {user?.username}
                </h3>
                <div className={styles.dot}></div>
                <p>2d ago</p>
              </div>
              <p>{user?.city}</p>
            </div>
          </div>

          {/* save post into account */}
          {currUser.userId !== user._id && <div className={styles.settings}>
            <BiBookmarkPlus size={25} />
          </div>}

          {/* settings dot if current users post */}
          {currUser.userId === user._id &&
            <div className={styles.settings}
              onClick={() => setIsShowSetting(!isShowSetting)}>
              <BiDotsVerticalRounded size={25} />
            </div>}
          {/* settings div */}
          {
            isShowSetting && <ul className={styles.showSetting}>
              <li onClick={() => handleDeletePost(post._id)}
              >Delete</li>
            </ul>
          }
        </div>

        {/* post images */}
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
                <SwiperSlide key={image}>
                  <img src={image} alt="poster1" />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* description */}
        <div className={styles.caption}>
          <p><span style={{ color: 'black', fontWeight: 'bold' }}>@{user?.username}</span> {post?.caption}</p>
        </div>

        {/* bottom data part */}
        <div className={styles.bottom_part}>
          <div className={styles.contact_action}>
            <div className={styles.like_comment}>
              {/* like button */}
              <button
                style={{ border: 'none', background: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={handleLike}>
                {isLiked && <IoHeart size={30} color='red' />}
                {!isLiked && < AiOutlineHeart size={30} />}
              </button>

              {/* comment button */}
              <BsChat size={25}
                style={{ cursor: 'pointer' }}
                onClick={() => setshowCommentBox(!showCommentBox)} />

              {/* share button */}
              <IoPaperPlaneOutline size={25} />
            </div>
            <div className={styles.contact}><IoIosCall size={20} />{user?.contactNo}</div>
          </div>

          {/* show likes */}
          <p>{likes} likes</p>
        </div>

        <div className={styles.showAllCommentsBtn} >
          <span onClick={() => setshowCommentBox(!showCommentBox)}>show all {commentsCnt} comments</span>
        </div>

        {/* add comment button */}
        <div className={styles.addComment_div}>
          <div className={styles.photo}>
            {!currUser.profilePicture && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
            <img src={currUser.profilePicture} alt="user not found" className={styles.profile_image} />
          </div>
          <div className={styles.addComment}>
            <input type="text" value={newComment} placeholder="Add a comment..." onChange={(e) => setNewComment(e.target.value)} />

            {/* send button */}
            <div className={styles.sendCmtBtn} onClick={() => handleSendComment()}>
              {!isSending && <IoSendSharp size={20} />}
              {isSending && <div className={styles.loader}>
                <Image
                  alt='loader'
                  src={Loader}
                  width={20}
                  height={20}
                />
              </div>}
            </div>
          </div>
        </div>
      </div>

      {/* comment box */}
      {showCommentBox && <div className={styles.comment_box}>
        <Comment
          images={images}
          postUserImage={postUserImage}
          postUsername={user.username}
          handleLike={handleLike}
          isLiked={isLiked}
          likes={likes}
          post={post}
          showCommentBox={showCommentBox}
          commentsCnt={commentsCnt}
          setCommentsCnt={setCommentsCnt}
        />

        {/* close comment box */}
        <div className={styles.close_comment_box}>
          <span>
            <RxCross2
              size={40}
              onClick={() => setshowCommentBox(!showCommentBox)} />
          </span>
        </div>
      </div>}
    </>
  )
}

export default Card
