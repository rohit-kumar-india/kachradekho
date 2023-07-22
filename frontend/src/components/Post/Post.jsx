import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image';
import styles from './Post.module.css'
import { IoImage } from 'react-icons/io5';
import CreatePost from '../CreatePost/CreatePost';
import PostCard from '../PostCard/postCard'
import { useDispatch, useSelector } from 'react-redux'
import { setShowCreatePost } from '../../store/slices'
import userAvatar from '../../assets/userAvatar.png'

const Post = () => {

    const dispatch = useDispatch()
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [userImage, setUserImage] = useState()

    const currentUser = useSelector((state) => state.currentUser.userData)

    //fetch user image from database
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
        setPosts(prevPosts => [...prevPosts, ...data]);
        // setPosts(data)
    };

    // useCallback(() => {
    // fetchPosts()
    // }, [currentPage])


    useEffect(() => {
        if (currentPage === 1) {
            fetchPosts();
        }
        // console.log("hello")
    }, [currentPage]);

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        console.log(scrollTop)
        if (scrollTop + clientHeight >= scrollHeight) {
            // Scrolling reached the end of the page
            setCurrentPage(prevPage => prevPage + 1);
            console.log('End of page reached');
            // Perform any actions or fetch more data here
        }
    };

    // useEffect(() => {
    // if (currentPage === 1) {
    //     fetchPosts();
    // }

    // const handleScroll = () => {
    //     if (
    //         window.innerHeight + window.scrollY >= document.body.offsetHeight
    //     ) {
    //         setCurrentPage(prevPage => prevPage + 1);
    //         console.log("updated")
    //     }
    // };

    // window.addEventListener('scroll', handleScroll);

    // return () => {
    //     window.removeEventListener('scroll', handleScroll);
    // };

    //     console.log("hello")


    //       window.addEventListener('scroll', handleScroll, {passive:true});
    //       return () => {
    //         window.removeEventListener('scroll', handleScroll, {passive:true});
    //       };


    // }, []);


    useEffect(() => {
        fetchImage(currentUser.profilePicture)
    }, [userImage])

    return (
        <>
            {/* create a post */}
            <div className={styles.create_post_btn} onClick={() => dispatch(setShowCreatePost())}>
                <div className={styles.create_post_left}>
                    <div className={styles.photo}>
                        {!userImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                        <img src={userImage} alt="user not found" className={styles.profile_image}/>
                    </div>
                    <p>create a post...</p>
                </div>
                <IoImage size={25} />
            </div>


            {/* show post */}
            {
                posts?.map((item, index) => {
                    return (

                        <PostCard post={item} />
                    )
                }
                )}

        </>
    )
}

export default Post
