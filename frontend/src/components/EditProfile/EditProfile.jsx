import React, { useState } from "react";
import jwt from 'jsonwebtoken';
import styles from "./EditProfile.module.css"; // Import your own CSS styles
import { RxCross2 } from 'react-icons/rx';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { setShowLogin, setShowRegister } from '../../store/popUpSlice'

const EditProfile = ({ showEditPopup, setShowEditPopup }) => {

    const dispatch = useDispatch()

    // const token = localStorage.getItem("token");
    // const decodedToken = jwt.decode(token);
    // // console.log(decodedToken.username);
    // const { username} = decodedToken;

    // console.log(username)

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODc3MTM4OTZ9._4aGZs5qRCWsGV3qGWyJmsV7GRt3TPdVYMzIfJuKQB0';

    try {
        const decodedToken = jwt.verify(token, 'sabchorhai');
        const userId = decodedToken.username;
        console.log('User ID:', userId);
    } catch (error) {
        console.error('Token verification failed:', error.message);
    }

    const [values, setValues] = useState({
        name: "",
        bio: "",
        username: "",
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

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log(values)
        const data = {
            name: values.name,
            bio: values.bio,
            username: values.username,
            gender: values.gender,
            contact: values.contact,
            country: values.country,
            state: values.state,
            city: values.city,
            address: values.address,
        }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/editProfile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        setValues({
            name: "",
            bio: "",
            username: "",
            gender: "",
            contact: "",
            country: "",
            state: "",
            city: "",
            address: "",
        });

        if (response.success) {
            toast.success('Your Profile has been updated', toastOptions);
            setShowEditPopup(!showEditPopup);
        }
        else {
            toast.error(response, toastOptions)
        }
    };

    return (
        <section className={styles.edit_page}>
            <div data-aos="fade-down"
                data-aos-easing="ease"
                className={styles.edit_container}>
                <div className={styles.edit_close}>
                    <span onClick={() => setShowEditPopup(!showEditPopup)}><RxCross2 size={20} /></span>
                </div>
                <form action="" onSubmit={(e) => handleRegister(e)}>
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
                        <label htmlFor="username">Username:</label>
                        <input
                            type="email"
                            id="username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="user@gmail.com"

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
                        <select name="gender" id="gender" onChange={handleChange}>
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
