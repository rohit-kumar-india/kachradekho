import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image';
import styles from '../styles/Projects.module.css'
import { IoImage } from 'react-icons/io5';
import ProjectCard from '../components/ProjectCard/projectCard'
import { useDispatch, useSelector } from 'react-redux'
import { setShowCreateProject } from '../store/slices'
import userAvatar from '../assets/userAvatar.png'
import Loader from '../assets/loader.gif'

const Project = () => {

    const dispatch = useDispatch()
    const divRef = useRef()
    const currentUser = useSelector((state) => state.currentUser.userData)

    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [prevScrollTop, setprevScrollTop] = useState()
    const [isLoading, setisLoading] = useState(false)
    const [isNoMore, setisNoMore] = useState(false)

    const fetchProjects = async () => {
        setisLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project?limit=5&page=${currentPage}`, {
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
        setProjects(prevProjects => [...prevProjects, ...data]);
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
            fetchProjects();
        }
    }, [currentPage]);


    return (
        <>
            {/* create a project */}
            <div className={styles.create_project_btn} onClick={() => dispatch(setShowCreateProject())}>
                <div className={styles.create_project_left}>
                    <div className={styles.photo}>
                        {!currentUser?.profilePicture && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                        <img src={currentUser?.profilePicture} alt="user not found" className={styles.profile_image} />
                    </div>
                    <p>create a project...</p>
                </div>
                <IoImage size={25} />
            </div>


            {/* show project */}
            <div
                className={styles.project}
                ref={divRef}
                onScroll={handleScroll}>
                {
                    projects?.map((item, index) => {
                        return (

                            <ProjectCard project={item} key={item._id} />
                        )
                    }
                    )}
                {projects.length === 0 && <span style={{ color: 'white', textAlign: 'center', fontSize: '14px' }}>Nothing to show...</span>}
                {isNoMore && projects.length > 0 && <span style={{ color: 'white', textAlign: 'center', fontSize: '14px' }}>No more content...</span>}
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

export default Project
