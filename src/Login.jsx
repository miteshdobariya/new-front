// import React, { useContext, useRef } from 'react';
// import { FcGoogle } from "react-icons/fc";
// import { BsFacebook } from "react-icons/bs";
// import { Link,  useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AuthContext } from "./AuthContext";

// const Login = () => {
//     const { isLoggedIn, logout, login } = useContext(AuthContext);

//     const email = useRef();
//     const password = useRef();
//     const navigate = useNavigate();

//     const register = (e) =>{
//         e.preventDefault();
//         var obj = {
//             email: email.current.value,
//             password: password.current.value,

//         }
//         axios.post(`${process.env.REACT_APP_API}/verify`, obj)
//         .then(function (response) {
//             localStorage.setItem('loginnn', 'done');
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('email',response.data.data.email);
//             login();
//             toast.success("user login sucessfully");

//             setTimeout(() => {
//                 navigate("/");
//             }, 1000);
//             // Navigate("/");

//         })
//         .catch(function (error) {
//             // handle error 
//             toast.error(error.response.data.message);
//         })

//     }


//     return (
//        <>
//        <ToastContainer />
//         <div className="newac-outer">
//             <div className="newac-inner">
//                 <div className="newac-title">
//                     <h1>Log in to your Account</h1>
//                     <p>Welcome back! Select method to log in:</p>
//                 </div>
//                 <div className="newac-data">
//                     <div className="newac-left">
//                         <img src="./assets1/images/cartoon.png" alt="Cartoon" className="newac-cartoon" />
//                     </div>
//                     <div className="newac-right">
//                         <div className="login-methods">
//                             <button className="login-google"><FcGoogle />Google</button>
//                             <button className="login-facebook"><BsFacebook />Facebook</button>
//                         </div>
//                         <p className="login-divider">or continue with email</p>
//                         <form onSubmit={register}>
//                             <div className="newac-form-group">
//                                 <label htmlFor="email">Email*</label>
//                                 <input type="email" id="email" placeholder="Enter your email" ref={email}  />
//                             </div>
//                             <div className="newac-form-group">
//                                 <label htmlFor="password">Password*</label>
//                                 <input type="password" id="password" placeholder="Enter your password" ref={password} />
//                             </div>
//                             <p className="forgot-password">
//                                 <Link  to={"/forgot"}>Forgot Password?</Link>
//                             </p>
//                             <button type="submit" className="newac-button">Log in</button>
//                         </form>
//                         <p className="newac-login-link">
//                             Don't have an account? <Link  to={"/signup"}>Create an account</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//        </>
//     );
// };

// export default Login;






import React, { useContext, useRef, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./AuthContext";

const Login = () => {
    const { isLoggedIn, logout, login } = useContext(AuthContext);
     const [email, setEmail] = useState('');

    // const email = useRef();
    // const password = useRef();
    const navigate = useNavigate();

    const register = async(e) =>{
            e.preventDefault();
        alert(email)
        try {
      const res = await axios.post(`${process.env.REACT_APP_API}/send-otp`, { email });
      toast.success(res.data.message + ' OTP: ' + res.data.otp); // for dev only
      navigate('/otp', { state: { email }}); // Pass email to Enter_OTP component
    } catch (err) {
      toast.error('Failed to send OTP');
    }

    }


    return (
       <>
       <ToastContainer />
        <div className="newac-outer">
            <div className="newac-inner">
                <div className="newac-title">
                    <h1>Log in to your Account</h1>
                    <p>Welcome back! Select method to log in:defegrj</p>
                </div>
                <div className="newac-data">
                    <div className="newac-left">
                        <img src="./assets1/images/cartoon.png" alt="Cartoon" className="newac-cartoon" />
                    </div>
                    <div className="newac-right">
                        <div className="login-methods">
                            <button className="login-google"><FcGoogle />Google</button>
                            <button className="login-facebook"><BsFacebook />Facebook</button>
                        </div>
                        <p className="login-divider">or continue with email</p>
                        <form onSubmit={register}>
                            <div className="newac-form-group">
                                <label htmlFor="email">Email*</label>
                                <input type="email" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}  />
                            </div>
                           
                           
                            <button type="submit" className="newac-button">Log in</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div>
       </>
    );
};

export default Login;












