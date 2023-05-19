import React, { useEffect } from 'react'
import styles from './Post.module.css'
import { IoImage } from 'react-icons/io5';
import CreatePost from '../CreatePost/CreatePost';
import PostCard from '../Card/postCard'
import { useDispatch } from 'react-redux'
import { setShowCreatePost } from '../../store/popUpSlice'

const Post = () => {
    
    const dispatch = useDispatch()

    return (
        <>
            {/* create a post */}
            <div className={styles.create_post_btn} onClick={()=>dispatch(setShowCreatePost())}>
                <div className={styles.create_post_left}>
                    <div className={styles.photo}></div>
                    <p>create a post...</p>
                </div>
                <IoImage size={25} />
            </div>

          
            {/* show post */}
            <PostCard/>
        </>
    )
}

export default Post
