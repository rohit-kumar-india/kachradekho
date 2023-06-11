import React, { useState } from "react";

import styles from "./LoginSignup.module.css"; // Import your own CSS styles
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineUser } from 'react-icons/ai';
import { BiBriefcase } from 'react-icons/bi';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { setShowLogin, setShowRegister } from '../../store/popUpSlice'

const Signup = () => {

    const dispatch = useDispatch()

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        contact: "",
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
        } else if (username === "") {
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
        if(handleValidation()){

            console.log(values);
        }
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
                    <span onClick={() => dispatch(setShowRegister())}><RxCross2 size={20} /></span>
                </div>
                <form action="" onSubmit={(e) => handleRegister(e)}>
                    <h3>Create an Account</h3>

                    {/* <div className={styles.user_type}>
                        <div className={usertType==="candidate" ? "candidate" : "candidate selected"} onClick={()=>setusertType("candidate")}>
                            <AiOutlineUser />Candidate
                        </div>
                        <div className={usertType==="candidate" ? "selected employer" : "employer"} onClick={()=>setusertType("employer")}>
                            <BiBriefcase />Employer
                        </div>
                    </div> */}
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
                        <label htmlFor="email">Username:</label>
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
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Password"

                        />
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
                    <button type="submit" className={styles.btn_primary}>
                        Register
                    </button>
                    {/* <div className="form-group">
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId="YOUR_FACEBOOK_APP_ID"
              autoLoad={false}
              fields="name,email,picture"
              callback={handleFacebookLoginSuccess}
              cssClass="btn-facebook"
              textButton="Login with Facebook"
            />
          </div> */}
                </form>
                <div className={styles.call_to_action}>
                    <p>Already have an account?</p>
                    <span className={styles.btn_secondary} onClick={() => {
                        dispatch(setShowRegister())
                        dispatch(setShowLogin())
                    }}>
                        LogIn
                    </span>
                </div>
                <span className={styles.span_or}><p>or</p></span>
                <div className={styles.login_direct}>
                    <div className={styles.via_facebook}>
                        <FaFacebookF /> Login via facebook
                    </div>
                    <div className={styles.via_google}>
                        <AiOutlineGoogle /> Login via Google
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Signup;
