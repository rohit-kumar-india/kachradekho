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

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [userImage, setUserImage] = useState()
    const [prevScrollTop, setprevScrollTop] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [isNoMore, setisNoMore] = useState(false)

    const currentUser = useSelector((state) => state.currentUser.userData)

    //fetch current user image from database
    const fetchImage = async (imageId) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/image?imageId=${imageId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const image = await response.json()
        // console.log(image.image[0].file)
        if (image.success) {
            setUserImage(image.image[0].file)
        }
    }

    const fetchPosts = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getPost?limit=5&page=${currentPage}`);
        const data = await response.json();
        if(data.length===0){
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

    useEffect(() => {
        fetchImage(currentUser?.profilePicture)
    }, [userImage])

    return (
        <>
            {/* create a post */}
            <div className={styles.create_post_btn} onClick={() => dispatch(setShowCreatePost())}>
                <div className={styles.create_post_left}>
                    <div className={styles.photo}>
                        {!userImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                        <img src={userImage} alt="user not found" className={styles.profile_image} />
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

                            <PostCard post={item} />
                        )
                    }
                    )}
                {posts.length === 0 && <span style={{ color: 'white', textAlign: 'center', fontSize: '14px' }}>Nothing to show...</span>}
                {isNoMore && <span style={{ color: 'white', textAlign: 'center', fontSize: '14px' }}>No more content...</span>}
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
