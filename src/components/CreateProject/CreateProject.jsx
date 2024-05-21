import React, { useState, useEffect } from 'react'
import styles from './CreateProject.module.css'
import { IoImage } from 'react-icons/io5';
import { BsCloudUpload } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import { setShowCreateProject } from '../../store/slices'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../assets/loader.gif'
import Image from "next/image";
import compressAndResizeImage from '../compressFile';
import userAvatar from '../../assets/userAvatar.png'

const CreateProject = () => {

    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.currentUser.userData)

    const [desc, setDesc] = useState('');
    const [projectTitle, setprojectTitle] = useState()
    const [teamMembers, setteamMembers] = useState()
    const [technologiesUsed, settechnologiesUsed] = useState()
    const [repositoryUrl, setrepositoryUrl] = useState()
    const [liveUrl, setliveUrl] = useState()
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [showLimit, setShowLimit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userImage, setUserImage] = useState(currentUser.profilePicture)

    // toastify
    const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    // Convert all images to Base64 concurrently using Promise.all
    const convertAllImagesToBase64 = async (images) => {
        try {
            const compressedImages = await Promise.all(images.map((image) => compressAndResizeImage(image)));
            setImageURLs(compressedImages);
        } catch (error) {
            console.error('Error converting images to Base64:', error);
            setImageURLs([]);
        }
    };

    // upload project data to the database
    const createProjectRequest = async (allImageIds) => {
        const project = {
            title: projectTitle,
            discription: desc,
            teamMembers,
            technologies: technologiesUsed,
            repositoryUrl,
            liveUrl,
            images: allImageIds,
            user: currentUser.userId,
        }
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(async (res) => {
                if (res.ok) {
                    const projectId = await res.json()
                    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user?userId=${currentUser.userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(projectId),
                    })
                        .then((res) => {
                            if (res.ok) {
                                dispatch(setShowCreateProject())
                                alert("project created successfully")
                            }
                        })
                }
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (imageURLs.length > 0) {
            setIsLoading(true);

            try {
                let allImageIds = []
                await Promise.all(imageURLs.map(async (image) => {
                    const data = {
                        title: "project image",
                        file: image,
                    }
                    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/image`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });

                    const imageId = await response.json()
                    allImageIds.push(imageId.imageId)
                    console.log('Image uploaded successfully');
                }))
                createProjectRequest(allImageIds)
            } catch (error) {
                console.error('Error uploading image:', error);
            }

            setIsLoading(false)
        }
        else {
            alert("please enter an image!")
        }
    };

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        setImages([...files]);
    }

    function deleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    }

    useEffect(() => {
        if (images.length < 1) return;
        if (images.length > 5) {
            setShowLimit(true);
            setImageURLs([]);
            return;
        }
        convertAllImagesToBase64(images);
    }, [images]);

    return (
        <div className={styles.create_project_container}>

            {/* user profile */}
            <div className={styles.create_project_header}>
                <div className={styles.create_project_left}>
                    <div className={styles.photo}>
                        {!userImage && <Image src={userAvatar} alt="avatar" width={"100%"} height={"100%"} layout='responsive' />}
                        <img src={userImage} alt="user not found" className={styles.profile_image} />
                    </div>
                    <h5>{currentUser.name}</h5>
                </div>
                <span> <RxCross2 size={20} onClick={() => dispatch(setShowCreateProject())} /></span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.data_part}>
                    {/* project title */}
                    <input
                        type="text"
                        onChange={(e) => {
                            setprojectTitle(e.target.value)
                        }}
                        value={projectTitle}
                        placeholder='write project title...*'
                        required />

                    {/* Technologies Used */}
                    <input
                        type="text"
                        onChange={(e) => {
                            settechnologiesUsed(e.target.value)
                        }}
                        value={technologiesUsed}
                        placeholder='write technologies used...*'
                        required />

                    {/* Team Members */}
                    <input
                        type="text"
                        onChange={(e) => {
                            setteamMembers(e.target.value)
                        }}
                        value={teamMembers}
                        placeholder='Enter Team Members Name...' />

                    {/* repository Url */}
                    <input
                        type="text"
                        onChange={(e) => {
                            setrepositoryUrl(e.target.value)
                        }}
                        value={repositoryUrl}
                        placeholder='Enter repository/code Url...' />

                    {/* live Url */}
                    <input
                        type="text"
                        onChange={(e) => {
                            setliveUrl(e.target.value)
                        }}
                        value={liveUrl}
                        placeholder='Enter live Url...' />

                    {/* description */}
                    <textarea
                        type="text"
                        rows="4"
                        className=""
                        placeholder="write something about your project...*"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    ></textarea>

                    {/* upload and display images */}
                    <div className={styles.select_show_images}>
                        <div className={styles.upload_images}>
                            <label htmlFor="getProject">
                                <BsCloudUpload size={30} />
                                <span style={{ color: "blue" }}>click here, or drag & drop</span>
                                <span style={{ color: "dimgray" }}>to upload the project...</span>
                            </label>
                            <input
                                type="file"
                                id='getProject'
                                multiple
                                accept="image/*"
                                onChange={onImageChange}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop} />
                        </div>
                        <div className={styles.display_images}>
                            {imageURLs.map((imageSrc, index) => (
                                <div className={styles.image_container}>
                                    <RxCrossCircled className={styles.delete_icon} onClick={() => deleteImage(index)} />
                                    <img src={imageSrc} alt="not found" />
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.submit_btn}>
                    <div> {showLimit && <p>*Upto 5 images can be selected</p>}</div>

                    {isLoading === false ? <input type="submit" value="Project" className={`${(desc.length === 0 && imageURLs.length === 0) ? styles.Disabled : ''}`} />
                        :
                        <div className={styles.loader}>
                            <Image
                                alt='loader'
                                src={Loader}
                                layout='responsive'
                                objectFit='contain'
                                width={'100%'}
                                height={'100%'}
                            />
                        </div>}

                    {/* <input type="submit" value="Project" /> */}
                </div>
            </form>
        </div>
    )
}

export default CreateProject
