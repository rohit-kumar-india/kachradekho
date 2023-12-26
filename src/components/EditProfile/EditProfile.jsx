import React, { useState, useEffect } from "react";
import styles from "./EditProfile.module.css"; // Import your own CSS styles
import { RxCross2 } from 'react-icons/rx';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { setShowEditPopup, setUserData } from '../../store/slices'
import Loader from "../../assets/loader.gif"
import Image from "next/image";

const EditProfile = ({ user }) => {

    const dispatch = useDispatch()
    const currentUser =  useSelector((state) => state.currentUser.userData)


    const [values, setValues] = useState(user)
    const [isLoading, setIsLoading] = useState(false)

    // Change the URL without triggering a full page reload
    const newUrl = `${process.env.NEXT_PUBLIC_HOST}/profile/${user.username}/editProfile`;
    window.history.pushState(null, null, newUrl);

    useEffect(()=>{
        console.log("from editprofile" ,user);
    })

    // toastify
    const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user?userId=${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        let response = await res.json()

        if (response.success === "success") {
            toast.success('Your Profile has been updated', toastOptions);
            dispatch(setUserData({
                ...currentUser,
                userId: values._id,
                name: values.name,
                username: values.username,
                email: values.email,
                savedPost: values.post,
                gender: values.gender,
            }
            ))
            setTimeout(() => {
                dispatch(setShowEditPopup())
            }, 1500)
        }
        else {
            toast.error(response, toastOptions)
        }

        setIsLoading(false)
    };

    return (
        <section className={styles.edit_page}>
            <div data-aos="fade-down"
                data-aos-easing="ease"
                className={styles.edit_container}>
                <div className={styles.edit_close}>
                    <span onClick={() => dispatch(setShowEditPopup())}><RxCross2 size={20} /></span>
                </div>
                <form action="" onSubmit={(e) => handleUpdateUser(e)}>
                    <h3>Edit Profile</h3>

                    <div className={styles.form_group}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="your name"
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="username"
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="bio">Bio:</label>
                        <input
                            type="text"
                            id="bio"
                            name="bio"
                            value={values.bio}
                            onChange={handleChange}
                            placeholder="bio"
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="user@gmail.com"
                            required
                        />
                    </div>

                    {/* <div className={styles.form_group}>
                        <label htmlFor="date_of_birth">Date of Birth:</label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth"
                            value={values.date}
                            onChange={handleChange}

                        />
                    </div> */}

                    <div className={styles.form_group}>
                        <label htmlFor="gender">Gender:</label>
                        <select name="gender" id="gender" onChange={handleChange} value={values.gender} required>
                            <option value="">Select a category</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="contactNo">Contact No:</label>
                        <input
                            type="number"
                            id="contactNo"
                            name="contactNo"
                            value={values.contactNo}
                            onChange={handleChange}
                            placeholder="0123456789"
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="country">Country:</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={values.country}
                            onChange={handleChange}
                            placeholder="india"
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            placeholder="madhya pradesh"
                            required
                        />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            placeholder="indore"
                            required
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            placeholder="xyz"
                            required
                        />
                    </div>

                    {isLoading === false ? <button type="submit" className={styles.btn_primary}>
                        Update Profile
                    </button>
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

                </form>
            </div>
            <ToastContainer />
        </section>
    );
};

export default EditProfile;
