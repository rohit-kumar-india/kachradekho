import React, { useState, useEffect } from 'react'
import styles from './CreatePost.module.css'
import { IoImage } from 'react-icons/io5';
import { BsCloudUpload } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import { setShowCreatePost } from '../../store/popUpSlice'
import { useDispatch } from 'react-redux'

const CreatePost = () => {

    const [desc, setDesc] = useState();
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [showLimit, setShowLimit] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (images.length < 1) return;
        if (images.length > 5) {
            setShowLimit(true);
            setImageURLs([]);
            return;
        }
        const newImageURLs = [];
        images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
        setImageURLs(newImageURLs);
    }, [images]);

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

    return (
        <div className={styles.create_post_container}>

            {/* user profile */}
            <div className={styles.create_post_btn}>
                <div className={styles.create_post_left}>
                    <div className={styles.photo}></div>
                    <p>Umesh Kumar Bhatiya</p>
                </div>
                <RxCrossCircled size={30} onClick={() => dispatch(setShowCreatePost())} />
            </div>

            <form>
                <div className={styles.data_part}>
                    {/* description */}
                    <textarea
                        type="text"
                        rows="4"
                        className=""
                        placeholder="write something about your product*"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>

                    {/* upload and display images */}
                    <div className={styles.select_show_images}>
                        <div className={styles.upload_images}>
                            <label htmlFor="getKachra">
                                <BsCloudUpload size={30} />
                                <span style={{ color: "blue" }}>click here, or drag & drop</span>
                                <span style={{ color: "dimgray" }}>to upload the kachra...</span>
                            </label>
                            <input
                                type="file"
                                id='getKachra'
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
                    <input type="submit" value="Post" />
                </div>
            </form>
        </div>
    )
}

export default CreatePost
