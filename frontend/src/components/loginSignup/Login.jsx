import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginSignup.module.css"; // Import your own CSS styles
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { setShowLogin, setShowRegister } from '../../store/popUpSlice'
import { useRouter } from "next/router";

const Login = () => {

  const dispatch = useDispatch()
  const router = useRouter()

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // toastify
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if(handleValidation()){
      const data = {
        username : values.username, 
        password : values.password
      }

      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json()
  
      setValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    if (response.success) {
      localStorage.setItem("token", response.token)
      toast.success('You are successfully logged in', toastOptions);

      dispatch(setShowLogin())
      router.push('/')

    } else {
      toast.error('User not found!', toastOptions);
    }
    }
   
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
 
  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(setShowLogin())
      router.push('/HomePage')
    }
  }, [])
 
  return (
    <section className={styles.login_page}>
      <div className={styles.login_container}>
        <div className={styles.login_close}>
          <span ><RxCross2 size={20} onClick={()=> dispatch(setShowLogin())}/></span>
        </div>
        <form onSubmit={handleLogin}>

          <h3>Welcome to KachraDekho</h3>
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
          <div className={styles.forgot_checkbox_hld}>
            <div className={styles.checkbox}>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me"><p>Remember me</p></label>
            </div>
            <div className={styles.forgot_password}>
              <p>Forgot Password?</p> 
            </div>
          </div>
          <button type="submit" className={styles.btn_primary}>
            Login
          </button>
         
        </form>
        <div className={styles.call_to_action}>
          <p>Don't have an account?</p>
          <span className={styles.btn_secondary} onClick={()=>{
           dispatch(setShowLogin())
           dispatch(setShowRegister())
          }}>
            Signup
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

export default Login;
