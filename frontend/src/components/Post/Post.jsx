import React, { useEffect } from 'react'
import Image from 'next/image';
import styles from './Post.module.css'
import { IoImage } from 'react-icons/io5';
import CreatePost from '../CreatePost/CreatePost';
import PostCard from '../PostCard/postCard'
import { useDispatch } from 'react-redux'
import { setShowCreatePost } from '../../store/popUpSlice'
import user from '../../assets/user.jpg'

const Post = () => {

    const dispatch = useDispatch()

    return (
        <>
            {/* create a post */}
            <div className={styles.create_post_btn} onClick={() => dispatch(setShowCreatePost())}>
                <div className={styles.create_post_left}>
                    <div className={styles.photo}>
                        <Image
                            alt='Mountains'
                            src={user}
                            layout='responsive'
                            objectFit='cover'
                            width={'100%'}
                            height={'100%'}

                        />
                    </div>
                    <p>create a post...</p>
                </div>
                <IoImage size={25} />
            </div>


            {/* show post */}
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </>
    )
}

export default Post
