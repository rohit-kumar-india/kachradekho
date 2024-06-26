import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image';
import styles from '@/styles/ProfileDashboard.module.css'
import Head from 'next/head'
import { IoMdSettings } from 'react-icons/io';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { BsFillPencilFill } from 'react-icons/bs';
import ProjectCard from '../../components/ProjectCard/projectCard'
import EditProfile from '../../components/EditProfile/EditProfile'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setShowEditPopup, logout, setUserData } from '@/store/slices';
import userAvatar from '../../assets/userAvatar.png'
import compressAndResizeImage from '@/components/compressFile';
import Loader from '../../assets/loader.gif'

const Profile = ({ user}) => {

    const showEditPopup = useSelector((state) => state.editPopup.value)
    const currentUser = useSelector((state) => state.currentUser.userData)

    const router = useRouter();
    const dispatch = useDispatch();

    const [activeComponent, setActiveComponent] = useState('projects');
    const [showSettings, setShowSettings] = useState(false)
    const [userImage, setuserImage] = useState(currentUser.profilePicture)
    const [isProjectsFetching, setIsProjectsFetching] = useState(false)
    const [isSavedProjectsFetching, setIsSavedProjectsFetching] = useState(false)
    const [savedProjects, setSavedProjects] = useState([])
    const [projects, setProjects] = useState([])

    // Change the URL without triggering a full page reload
    const newUrl = `${process.env.NEXT_PUBLIC_HOST}/profile/${user.username}`;
    window.history.pushState(null, null, newUrl);

    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
    };

    //modify imageId in the user profile
    const modifyprofilepicture = async (imageId, compressedImage) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user?userId=${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profilePicture: imageId
                }),
            })

            // update the token data for current user
            dispatch(setUserData({
                ...currentUser,
                profilePicture: compressedImage,
            }))
            setuserImage(compressedImage)
        } catch (error) {
            console.log("error while modify imageId", error)
        }
    }

    // for setting the profile picture
    const handleImageChange = async (e) => {
        e.preventDefault();

        //compress and save image in database
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
            await modifyprofilepicture(imageId.imageId, compressedImage)
            alert("Image uploaded successfully")
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    // for fetching projects
    const fetchProject = async (projectId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project?projectId=${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            alert(error)
        }

    };

    const handleUserProjectFetch = async () => {
        setIsProjectsFetching(true)
        const projects = await Promise.all(user.projects?.map((projectId) => fetchProject(projectId)))
        setProjects(projects);
        setIsProjectsFetching(false)
    }
    const handleSavedProjectFetch = async () => {
        setIsSavedProjectsFetching(true)
        const projects = await Promise.all(user.savedProjects?.map((projectId) => fetchProject(projectId)))
        setSavedProjects(projects);
        setIsSavedProjectsFetching(false)
    }

    useEffect(() => {
        handleUserProjectFetch()
        handleSavedProjectFetch()

        console.log("from profile ",user)
    }, [activeComponent]);

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
                <EditProfile user={user} />
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

                            {/* image edit button */}
                            {currentUser.userId === user._id && <div className={styles.change_image}>
                                <label htmlFor="icon"><BsFillPencilFill /></label>
                                <input type="file" name="icon" id="icon" accept='.jpeg, .png, .jpg' onChange={handleImageChange} />
                                {/* <div className={styles.change_popup}><p>Change Photo jjjg</p></div> */}
                            </div>}
                        </div>
                        <div className={styles.name_project_hld}>
                            <div className={styles.name_bio_hld}>
                                <div className={styles.name}>
                                    <span>{user.name}</span>

                                    {/* edit profile button */}
                                    {currentUser.userId === user._id && <button onClick={() => dispatch(setShowEditPopup())}>Edit Profile</button>}

                                    {currentUser.userId === user._id && <IoMdSettings size={30}
                                        onClick={() => setShowSettings(!showSettings)}
                                        style={{ cursor: "pointer" }} />
                                    }

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

                                {/* username */}
                                <span className={styles.username}>
                                    @{user?.username}
                                </span>

                                <div className={styles.user_data}>
                                    <span>{user?.bio}</span>
                                    {/* <span>date of birth</span> */}
                                    <span>{user?.gender}</span>
                                    <span>{user?.contactNo}</span>
                                    <span>{user?.address}, {user?.city}, {user?.state}, {user?.country}</span>
                                </div>
                            </div>
                            <div className={styles.project}>
                                <span>{user.projects.length || 0} projects</span>
                                {currentUser.userId === user._id && <span>{user.savedProjects.length || 0} saved</span>}
                            </div>
                        </div>
                    </div>

                    {/* bottom part for projects */}
                    <div className={styles.project_details}>
                        <div className={styles.details_type}>
                            <span
                                className={`${activeComponent === 'projects' ? styles.activeProject : ''
                                    }`}
                                onClick={() => handleComponentChange('projects')}>Projects</span>
                            <span
                                className={`${activeComponent === 'saved' ? styles.activeProject : ''
                                    }`}
                                onClick={() => handleComponentChange('saved')}>Saved</span>
                        </div>

                        {/* show projects */}
                        <div className={styles.slider}>
                            {activeComponent === "projects" && <div
                                className={`${styles.sliderWrapper} ${activeComponent === 'projects' ? styles.active : ''
                                    }`}
                            >
                                {
                                    projects?.map((project, index) => {
                                        return (
                                            <ProjectCard
                                                mode={'profile'}
                                                project={project} />
                                        )
                                    })
                                }

                                {/* when nothing to show */}
                                {
                                    !isProjectsFetching &&
                                    projects.length === 0 &&
                                    <p>Nothing projected yet...</p>
                                }

                                {/* loader */}
                                {isSavedProjectsFetching && <div className={styles.loader}>
                                    <Image
                                        alt='loader'
                                        src={Loader}
                                        width={40}
                                        height={40}
                                    />
                                </div>}
                            </div>}
                            {activeComponent === "saved" && <div
                                className={`${styles.sliderWrapper} ${activeComponent === 'saved' ? styles.active : ''
                                    }`}
                            >
                                {
                                    savedProjects?.map((project, index) => {
                                        return (
                                            <ProjectCard
                                                mode={'profile'}
                                                project={project} />
                                        )
                                    })
                                }

                                {/* when nothing to show */}
                                {
                                    !isSavedProjectsFetching &&
                                    savedProjects.length === 0 &&
                                    <p style={{textAlign:'center'}}>No saved project...</p>
                                }

                                {/* loader */}
                                {isSavedProjectsFetching && <div className={styles.loader}>
                                    <Image
                                        alt='loader'
                                        src={Loader}
                                        width={40}
                                        height={40}
                                    />
                                </div>}
                            </div>}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile

export async function getServerSideProps(context) {
    const { slug } = context.query;
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user?username=${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const userData = await response.json();

    //fetch user profile image
    let profilePicture = ''
    if (userData && userData.profilePicture) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getImage?imageId=${userData.profilePicture}`)
        const image = await res.json()
        profilePicture = image.image[0].file
    }

    return {
        props: {
            user: userData,
            profilePicture: profilePicture
        },
    };
}