import React, { useState } from "react";

import styles from "./EditProfile.module.css"; // Import your own CSS styles
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineUser } from 'react-icons/ai';
import { BiBriefcase } from 'react-icons/bi';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { setShowLogin, setShowRegister } from '../../store/popUpSlice'

const EditProfile = ({ showEditPopup, setShowEditPopup }) => {

    const dispatch = useDispatch()

    const [values, setValues] = useState({
        name: "",
        bio: "",
        email: "",
        date_of_birth: "",
        gender: "",
        contact: "",
        country: "",
        state: "",
        city: "",
        address: "",
    });
    const [usertType, setusertType] = useState("candidate")


    // toastify
    const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const handleValidation = () => {
        const { password, username } = values;
        if (password === "") {
            toast.error("Email and Password is required", toastOptions);
            return false;
        } else if (username.length === "") {
            toast.error("Email and Password is required", toastOptions);
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        handleValidation();
        console.log(values);
        // TODO: Handle login logic here
    };

    const handleGoogleLoginSuccess = (response) => {
        // TODO: Handle Google login success here
    };

    const handleFacebookLoginSuccess = (response) => {
        // TODO: Handle Facebook login success here
    };

    const handleLoginFailure = (error) => {
        // TODO: Handle login failure here
    };

    return (
        <section className={styles.login_page}>
            <div data-aos="fade-down"
                data-aos-easing="ease"
                className={styles.login_container}>
                <div className={styles.login_close}>
                    <span onClick={() => setShowEditPopup(!showEditPopup)}><RxCross2 size={20} /></span>
                </div>
                <form action="" onSubmit={(e) => handleRegister(e)}>
                    <h3>Edit Profile</h3>

                    <div className={styles.form_group}>
                        <label htmlFor="name">Username:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="your name"

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

                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="date_of_birth">Date of Birth:</label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth"
                            value={values.date}
                            onChange={handleChange}

                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="gender">Gender:</label>
                        <select name="gender" id="gender">
                            <option value="">Select a category</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="contact">Contact No:</label>
                        <input
                            type="number"
                            id="contact"
                            name="contact"
                            value={values.contact}
                            onChange={handleChange}
                            placeholder="0123456789"

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
                            placeholder="address"

                        />
                    </div>
                    <button type="submit" className={styles.btn_primary}>
                        Register
                    </button>

                </form>
            </div>
            <ToastContainer />
        </section>
    );
};

export default EditProfile;
