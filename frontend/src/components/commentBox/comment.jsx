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

const comment = ({ images, postUserName, postUserImage, handleLike, isLiked, likes, post, showCommentBox }) => {

  const currentUser = useSelector((state) => state.currentUser.userData)

  const [newComment, setNewComment] = useState('')
  const [newReply, setNewReply] = useState('')
  const [comments, setComments] = useState([])
  const [commentsTill, setCommentsTill] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [prevPage, setprevPage] = useState(0)
  const [currUserImage, setCurrUserImage] = useState(currentUser.profilePicture)
  const [isLoading, setisLoading] = useState(false)
  const [isNoMore, setisNoMore] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isShowReply, setIsShowReply] = useState({
    id: '',
    replyTo: ''
  })
  const [isShowAllReplies, setIsShowAllReplies] = useState({
    "isShowAllReplies": false,
    "id": ''
  })
  const [cmtReplies, setCmtReplies] = useState()
  const [isReplyFetching, setIsReplyFetching] = useState(false)

  //update the post with comment ids
  const updatePost = async (commentId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
          postId: post._id
        }),
      })
      return await res.json()
    } catch (error) {
      alert(error)
    }
  }

  //update comment with ids of comment replies
  const updateComment = async (commentId, replyId) => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/comment?commentId=${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyId),
      })
      return await res.json()
    } catch (error) {
      alert(error)
    }
  }

  //save the comments and get response as commentId
  const SendComment = async (cmt) => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cmt),
      })
      return await res.json()
    } catch (error) {
      alert(error)
    }
  }

  const handleSendComment = async () => {
    if (Object.keys(newComment).length > 0) {
      setIsSending(true)
      const cmt = {
        text: newComment,
        user: currentUser.userId,
        allCommentIds: ''
      }
      const commentId = await SendComment(cmt)
      if (commentId) {
        const postUpt = await updatePost(commentId)
        if (postUpt.success) {
          await fetchPost('sending')
          setNewComment('')
        }
      }
    }
    else {
      alert("please write a comment...")
    }
  }

  // send reply of the comments to the server
  const handleSendReply = async (commentId) => {
    if (Object.keys(newReply).length > 0) {
      const reply = {
        text: newReply,
        user: currentUser.userId,
        replyTo: isShowReply.replyTo,
        allCommentIds: ''
      }
      const replyId = await SendComment(reply)
      if (replyId) {
        const allIds = await updateComment(commentId, replyId)
        setNewReply('')
        setIsShowReply(false)
        fetchPost('sending')
        handleFetchReply(allIds, 'sending')
      }
    }
    else {
      alert("please write a reply...")
    }
  }

  //fetch comment replies
  const handleFetchReply = async (allReplyIds, mode) => {
    try {
      if (mode !== 'sending' && mode !== 'deleting') {
        setIsReplyFetching(true)
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allReplyIds)
      });
      const data = await response.json();
      setCmtReplies(data)
      setIsReplyFetching(false)
    } catch (error) {
      alert("while fetch comment reply", error)
    }
  }

  // delete comment from the server
  const handleDeleteCmnt = async (commentId, replyId) => {
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/comment?commentId=${commentId}&postId=${post._id}&replyId=${replyId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        fetchPost({
          mode: 'deleting',
          commentId: commentId
        })

        if (replyId) {
          handleFetchReply(await res.json(), 'deleting')
        }
      })
  }

  //fetch post from postId
  const fetchPost = useCallback(async (mode) => {
    if (mode === 'fetching') {
      setisLoading(true)
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post?postId=${post._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    fetchComment(data.comments, mode)
  }, [currentPage, showCommentBox]);

  //fetch comment
  const fetchComment = async (allCommentIds, mode) => {
    if (mode === 'fetching') {
      setisLoading(true)
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/comment?limit=10&page=${currentPage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(allCommentIds)
    });
    const data = await response.json();
    if (data.length === 0) {
      setisNoMore(true)
    }
    if (data.length > 0) {

      if (mode === 'sending') {
        setComments([...commentsTill, ...data])
      }
      else if (mode.mode === 'deleting') {
        const updatedComments = comments.filter(cmt => cmt.comment._id !== mode.commentId);
        setComments([...updatedComments, ...data])
      }
      else {
        setCommentsTill(comments => [...comments, ...data])
        setComments(comments => [...comments, ...data]);
      }
    }

    setprevPage(currentPage)
    setisLoading(false)
    setIsSending(false)
  }

  useEffect(() => {
    if (currentPage > prevPage) {
      fetchPost('fetching')
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
                        {/* <p>Edit</p> */}
                        {currentUser.userId === comment.comment.user &&
                          <p onClick={() => handleDeleteCmnt(comment.comment._id, '')}
                          >Delete</p>}
                      </div>

                      {/* show all replies button*/}
                      {
                        comment.comment.replies?.length > 0 &&
                        isShowAllReplies !== comment.comment._id &&
                        <div className={styles.showAllReplyBtn}
                          onClick={() => {
                            handleFetchReply(comment.comment.replies, '')
                            setIsShowAllReplies(comment.comment._id)
                          }}>
                          <div style={{ width: '40px', height: '0.5px', backgroundColor: 'gray' }}></div>
                          <p>show all ({comment.comment.replies.length}) replies</p>
                          <div style={{ width: '40px', height: '0.5px', backgroundColor: 'gray' }}></div>
                        </div>
                      }

                      {/* loading while fetching replies */}
                      {
                        isShowAllReplies === comment.comment._id &&
                        isReplyFetching &&
                        <div className={styles.showAllReplyBtn}>
                          <div style={{ width: '40px', height: '0.5px', backgroundColor: 'gray' }}></div>
                          <p>Loading...</p>
                          <div style={{ width: '40px', height: '0.5px', backgroundColor: 'gray' }}></div>
                        </div>
                      }
                    </div>
                  </div>

                  {/* show all replies */}
                  {
                    // isShowAllReplies.isShowAllReplies &&
                    isShowAllReplies === comment.comment._id &&
                    !isReplyFetching &&
                    <div className={styles.replies_div}>
                      {
                        cmtReplies.length > 0 && cmtReplies?.map((reply) => {
                          return (
                            <>
                              <div className={styles.comment} key={reply.comment._id}>
                                <div className={styles.photo}>
                                  {!reply.userImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                                  <img src={reply.userImage} alt="user not found" className={styles.profile_image} />
                                </div>

                                <div className={styles.comment_text_actions}>
                                  <span style={{ color: 'white', fontWeight: 500 }}> {reply.userName}</span>
                                  <span><span style={{ color: 'blue' }}>@{reply.comment.replyTo}</span> {reply.comment.text}</span>

                                  {/* actions on comment */}
                                  <div className={styles.comment_actions}>
                                    <p onClick={() => {
                                      setIsShowReply({
                                        "id": reply.comment._id,
                                        "replyTo": reply.userName
                                      })
                                    }
                                    }>Reply</p>
                                    {/* <p>Edit</p> */}
                                    {currentUser.userId === reply.comment.user &&
                                      <p onClick={() => handleDeleteCmnt(comment.comment._id, reply.comment._id)}
                                      >Delete</p>}
                                  </div>

                                </div>
                              </div>

                              {/* reply to user who replied on comment */}
                              {
                                isShowReply.id === reply.comment._id && <div className={styles.reply_to}>
                                  <div className={styles.photo}>
                                    {!currUserImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                                    <img src={currUserImage} alt="user not found" className={styles.profile_image} />
                                  </div>
                                  <div className={styles.addComment}>
                                    <input type="text" value={newReply} placeholder={`reply to ${isShowReply.replyTo}...`} onChange={(e) => setNewReply(e.target.value)} />

                                    {/* send button */}
                                    <div className={styles.sendCmtBtn} onClick={() => handleSendReply(comment.comment._id)}>
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

                  {/* reply to comment user */}
                  {
                    isShowReply.id === comment.comment._id && <div className={styles.reply_to}>
                      <div className={styles.photo}>
                        {!currUserImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                        <img src={currUserImage} alt="user not found" className={styles.profile_image} />
                      </div>
                      <div className={styles.addComment}>
                        <input type="text" value={newReply} placeholder={`reply to ${isShowReply.replyTo}...`} onChange={(e) => setNewReply(e.target.value)} />

                        {/* send button */}
                        <div className={styles.sendCmtBtn} onClick={() => handleSendReply(comment.comment._id)}>
                          <IoSendSharp size={15} />
                          {/* <p>send</p> */}
                        </div>
                      </div>
                    </div>
                  }

                  {/* hide replies button*/}
                  {
                    comment.comment.replies?.length > 0 &&
                    isShowAllReplies === comment.comment._id &&
                    !isReplyFetching &&
                    <div className={styles.showAllReplyBtn}
                      onClick={() => setIsShowAllReplies(false)}>
                      <div style={{ width: '40px', height: '0.5px', backgroundColor: 'gray' }}></div>
                      <p>hide all replies</p>
                      <div style={{ width: '40px', height: '0.5px', backgroundColor: 'gray' }}></div>
                    </div>
                  }
                  {/* </div> */}
                </>

              )
            })
          }

          {/* fetch more button */}
          {
            !isNoMore &&
            !isLoading &&
            comments.length >= 10 &&
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
      </div >
    </div >
  )
}

export default comment
