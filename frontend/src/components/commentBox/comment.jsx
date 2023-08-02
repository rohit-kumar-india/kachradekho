import React, { useState, useCallback, useEffect } from 'react'
import styles from './comment.module.css'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper";
import userAvatar from '../../assets/userAvatar.png'
import "swiper/css";
import { AiOutlineHeart } from 'react-icons/ai'
import { IoSendSharp } from 'react-icons/io5';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { IoHeart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../assets/loader.gif'
import Image from 'next/image';

const comment = ({ images, postUserName, postUserImage, handleLike, isLiked, likes, post }) => {

  const currentUser = useSelector((state) => state.currentUser.userData)

  const [newComment, setNewComment] = useState('')
  const [newReply, setNewReply] = useState('')
  const [comments, setComments] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [prevPage, setprevPage] = useState(0)
  const [currUserImage, setCurrUserImage] = useState(currentUser.profilePicture)
  const [isLoading, setisLoading] = useState(false)
  const [isNoMore, setisNoMore] = useState(false)
  const [currPost, setCurrPost] = useState(post)
  const [isShowReply, setIsShowReply] = useState(false)
  const [isShowAllReplies, setIsShowAllReplies] = useState(false)

  //update the post with comment ids
  const updatePost = async (commentId) => {
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

    // alert("comment added successfully")
    setNewComment('')

    // add recent comment
    const data = {
      "comment": {
        "text": newComment
      },
      "userName": currentUser.name,
      "userImage": currentUser.profilePicture
    }
    setComments(comments => [...comments, data]);
  }

  //save the comments and get response as commentId
  const handleSendComment = async () => {
    try {
      if (Object.keys(newComment).length > 0) {
        const cmt = {
          text: newComment,
          user: currentUser.userId,
          allCommentIds: ''
        }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cmt),
        })
        let commentId = await res.json()

        updatePost(commentId)
      }
      else {
        alert("please write a comment...")
      }
    } catch (error) {
      alert(error)
    }
  }

  // send reply of the comments to the server
  const handleSendReply = async () => {
    try {
      if (Object.keys(newReply).length > 0) {
        const reply = {
          text: newReply,
          userId: currentUser.userId,
          userName: currentUser.name,
          userImage: currentUser.profilePicture,
          replyTo: isShowReply.replyTo
        }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/comment?commentId=${isShowReply.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reply),
        })
        let response = await res.json()
        if (response.success) {
          setNewReply('')
          setIsShowReply(false)
        }
      }
      else {
        alert("please write a reply...")
      }
    } catch (error) {
      alert(error)
    }
  }

  //fetch post from postId
  const fetchPost = useCallback(async () => {
    setprevPage(currentPage)
    setisLoading(true)
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post?postId=${currPost._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setCurrPost(data)
    fetchComment()
  }, [currentPage]);

  //fetch comment
  const fetchComment = async () => {
    setisLoading(true)
    const allCommentIds = currPost.comments
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/comment?limit=10&page=${currentPage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ allCommentIds })
    });
    const data = await response.json();
    if (data.length === 0) {
      setisNoMore(true)
    }
    if (data.length > 0) {
      setComments(comments => [...comments, ...data]);

    }
    setisLoading(false)
  }

  useEffect(() => {
    if (currentPage > prevPage) {
      fetchPost()
    }
  }, [currentPage])

  return (
    <div className={styles.comment_container}>
      {/* images */}
      <div id='post_images' className={styles.comment_left}>

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
          {images?.map((image) => {
            return (
              <SwiperSlide >
                <img src={image} alt="poster1" />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      {/* comment section */}
      <div className={styles.comment_right}>
        {/* post info part */}
        <div className={styles.post_info}>
          <div className={styles.name_photo_hld}>
            <div className={styles.photo}>
              {!postUserImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
              <img src={postUserImage} alt="user not found" className={styles.profile_image} />
            </div>
            <div className={styles.name}>
              <h3>{postUserName}</h3>
            </div>
          </div>
        </div>

        {/* all comments part */}
        <div className={styles.allComments}>
          {
            !isNoMore && !isLoading && comments.length === 0 && <p className={styles.no_comments_show}>no comments to show...</p>
          }

          {
            comments?.map((comment) => {
              return (
                <>
                  <div className={styles.comment} key={comment.comment._id}>

                    <div className={styles.photo}>
                      {!comment.userImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                      <img src={comment.userImage} alt="user not found" className={styles.profile_image} />
                    </div>

                    <div className={styles.comment_text_actions}>
                      <span style={{ color: 'white', fontWeight: 500 }}> {comment.userName}</span>
                      <span> {comment.comment.text}</span>

                      {/* actions on comment */}
                      <div className={styles.comment_actions}>
                        <p onClick={() => setIsShowReply({
                          "id": comment.comment._id,
                          "replyTo": comment.userName
                        })}>Reply</p>
                        <p>Edit</p>
                        <p>Delete</p>
                      </div>

                      {/* show all replies button*/}
                      {
                        comment.comment.replies.length > 0 &&
                        !isShowAllReplies &&
                        <div className={styles.showAllReplyBtn}
                          onClick={() => setIsShowAllReplies(!isShowAllReplies)}>
                          <div style={{ width: '40px', height: '0.5px', backgroundColor: 'gray' }}></div>
                          <p>show all ({comment.comment.replies.length}) replies</p>
                          <div style={{ width: '40px', height: '0.5px', backgroundColor: 'gray' }}></div>
                        </div>
                      }
                    </div>

                    {/* show all replies */}
                    {
                      isShowAllReplies && <div className={styles.allComments}>
                        {
                          comment.comment.replies?.map((reply) => {
                            return (
                              <>
                                <div className={styles.comment} key={reply.text}>
                                  <div className={styles.photo}>
                                    {!reply.userImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                                    <img src={reply.userImage} alt="user not found" className={styles.profile_image} />
                                  </div>

                                  <div className={styles.comment_text_actions}>
                                    <span style={{ color: 'white', fontWeight: 500 }}> {reply.userName}</span>
                                    <span> {reply.text}</span>

                                    {/* actions on comment */}
                                    <div className={styles.comment_actions}>
                                      <p onClick={() => setIsShowReply({
                                        "id": reply.userId,
                                        "replyTo": reply.userName
                                      })}>Reply</p>
                                      <p>Edit</p>
                                      <p>Delete</p>
                                    </div>

                                  </div>
                                </div>

                                {/* reply to user */}
                                {
                                  isShowReply.id === comment.comment._id && <div className={styles.reply_to}>
                                    <div className={styles.photo}>
                                      {!currUserImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                                      <img src={currUserImage} alt="user not found" className={styles.profile_image} />
                                    </div>
                                    <div className={styles.addComment}>
                                      <input type="text" value={newReply} placeholder={`reply to ${isShowReply.replyTo}...`} onChange={(e) => setNewReply(e.target.value)} />

                                      {/* send button */}
                                      <div className={styles.sendCmtBtn} onClick={() => handleSendReply()}>
                                        <IoSendSharp size={15} />
                                        {/* <p>send</p> */}
                                      </div>
                                    </div>
                                  </div>
                                }

                              </>
                            )
                          })
                        }
                      </div >
                    }

                    {/* reply to user */}
                    {
                      isShowReply.id === comment.comment._id && <div className={styles.reply_to}>
                        <div className={styles.photo}>
                          {!currUserImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                          <img src={currUserImage} alt="user not found" className={styles.profile_image} />
                        </div>
                        <div className={styles.addComment}>
                          <input type="text" value={newReply} placeholder={`reply to ${isShowReply.replyTo}...`} onChange={(e) => setNewReply(e.target.value)} />

                          {/* send button */}
                          <div className={styles.sendCmtBtn} onClick={() => handleSendReply()}>
                            <IoSendSharp size={15} />
                            {/* <p>send</p> */}
                          </div>
                        </div>
                      </div>
                    }

                    {/* hide replies button*/}
                    {
                      comment.comment.replies.length > 0 &&
                      isShowAllReplies &&
                      <div className={styles.showAllReplyBtn}
                        onClick={() => setIsShowAllReplies(!isShowAllReplies)}>
                        <div style={{ width: '40px', height: '0.5px', backgroundColor: 'gray' }}></div>
                        <p>hide all replies</p>
                        <div style={{ width: '40px', height: '0.5px', backgroundColor: 'gray' }}></div>
                      </div>
                    }
                  </div>
                </>

              )
            })
          }

          {
            isNoMore && <p className={styles.no_comments_show}>no more comments...</p>
          }

          {/* fetch more button */}
          {
            !isNoMore &&
            !isLoading &&
            comments.length !== 0 &&
            <div className={styles.fetchMoreBtn}
              onClick={() => setCurrentPage(currentPage + 1)}>
              <AiOutlinePlusCircle size={25} color='gray' />
            </div>
          }

          {isLoading && <div className={styles.loader}>
            <Image
              alt='loader'
              src={Loader}
              width={30}
              height={30}
            />
          </div>}
        </div >


        {/* like and add comment part */}
        <div div className={styles.bottom_part} >
          <div className={styles.like_share}>
            {/* like button */}
            <button
              style={{ border: 'none', background: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              onClick={handleLike}>
              {isLiked && <IoHeart size={30} color='red' />}
              {!isLiked && < AiOutlineHeart size={30} color='gray' />}
            </button>

            {/* share button */}
            <IoPaperPlaneOutline size={25} />
          </div>

          {/* show likes */}
          <p>{likes} likes</p>

          {/* add comment button */}
          <div className={styles.name_photo_hld}>
            <div className={styles.photo}>
              {!currUserImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
              <img src={currUserImage} alt="user not found" className={styles.profile_image} />
            </div>
            <div className={styles.addComment}>
              <input type="text" value={newComment} placeholder="Add a comment..." onChange={(e) => setNewComment(e.target.value)} />

              {/* send button */}
              <div className={styles.sendCmtBtn} onClick={() => handleSendComment()}>
                <IoSendSharp size={20} />
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default comment
