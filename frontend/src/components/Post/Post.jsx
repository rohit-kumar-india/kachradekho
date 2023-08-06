import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image';
import styles from './Post.module.css'
import { IoImage } from 'react-icons/io5';
import PostCard from '../PostCard/postCard'
import { useDispatch, useSelector } from 'react-redux'
import { setShowCreatePost } from '../../store/slices'
import userAvatar from '../../assets/userAvatar.png'
import Loader from '../../assets/loader.gif'

const Post = () => {

    const dispatch = useDispatch()
    const divRef = useRef()
    const currentUser = useSelector((state) => state.currentUser.userData)

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [prevScrollTop, setprevScrollTop] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [isNoMore, setisNoMore] = useState(false)

    const fetchPosts = async () => {
        setisLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post?limit=5&page=${currentPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.length === 0) {
            setisNoMore(true)
            setisLoading(false)
        }
        setPosts(prevPosts => [...prevPosts, ...data]);
    };

    const handleScroll = async (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        // Check if scroll has reached the bottom of the div container
        if (scrollTop + clientHeight >= scrollHeight - 5 && scrollTop > prevScrollTop) {
            // console.log('Reached the end of the div container!');
            setisLoading(true)
            await setCurrentPage(prevPage => prevPage + 1)
        }
        setprevScrollTop(scrollTop)
    }

    useEffect(() => {
        if (currentPage >= 1) {
            fetchPosts();
        }
    }, [currentPage]);


    return (
        <>
            {/* create a post */}
            <div className={styles.create_post_btn} onClick={() => dispatch(setShowCreatePost())}>
                <div className={styles.create_post_left}>
                    <div className={styles.photo}>
                        {!currentUser.profilePicture && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                        <img src={currentUser.profilePicture} alt="user not found" className={styles.profile_image} />
                    </div>
                    <p>create a post...</p>
                </div>
                <IoImage size={25} />
            </div>


            {/* show post */}
            <div
                className={styles.post}
                ref={divRef}
                onScroll={handleScroll}>
                {
                    posts?.map((item, index) => {
                        return (

                            <PostCard post={item} key={item._id} />
                        )
                    }
                    )}
                {posts.length === 0 && <span style={{ color: 'white', textAlign: 'center', fontSize: '14px' }}>Nothing to show...</span>}
                {isNoMore && posts.length > 0 && <span style={{ color: 'white', textAlign: 'center', fontSize: '14px' }}>No more content...</span>}
                {isLoading && <div className={styles.loader}>
                    <Image
                        alt='loader'
                        src={Loader}
                        width={40}
                        height={40}
                    />
                </div>}
            </div>
        </>
    )
}

export default Post
