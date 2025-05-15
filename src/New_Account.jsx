// import axios from 'axios';
// import React, { useRef } from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
// const New_Account = () => {

//     const username = useRef()
//     const email = useRef()
//     const password = useRef()
//     const mobile=useRef()

//     const register = (e) => {
//         e.preventDefault()

//         var obj = {
//             username: username.current.value,
//             email: email.current.value,
//             password: password.current.value,
//             mobile:mobile.current.value,
//         } 
//         console.log(obj);



//         axios.post('${process.env.REACT_APP_API}/add',obj)
//         .then(function (response) {
//             alert("inside")
//           // handle success
//           if(response.data.status == "done")
//           {
//             toast("Success Register");
//             // Navigate("/login");
//           }
//         })
//         .catch(function (error) {
//           // handle error
//           console.log(error);
//           toast("error.message");
//         })
//     }


//     return (
//         <div className="newac-outer">
//             <div className="newac-inner">
//                 <div className="newac-title">
//                     <h1>Create Your Account</h1>
//                     <p>Welcome back! Please enter your details</p>
//                 </div>
//                 <div className="newac-data">
//                     <div className="newac-left">
//                         <img src="./assets1/images/cartoon.png" alt="Cartoon" className="newac-cartoon" />
//                     </div>
//                     <div className="newac-right">

//                         <form onSubmit={register}>
//                             <div className="newac-form-group">
//                                 <label htmlFor="first-name">First Name*</label>
//                                 <input type="text" id="first-name" ref={username}/>
//                             </div>
//                             <div className="newac-form-group">
//                                 <label htmlFor="last-name">Last Name*</label>
//                                 <input type="text" id="last-name"/>
//                             </div>
//                             <div className="newac-form-group">
//                                 <label htmlFor="email">Email*</label>
//                                 <input type="email" id="email" ref={email}/>
//                             </div>
//                             <div className="newac-form-group">
//                                 <label htmlFor="mobile">Mobile No.*</label>
//                                 <div className="newac-mobile-input">
//                                     <select>
//                                         <option value="+91">+91</option>
//                                         {/* Add more country codes if needed */}
//                                     </select>
//                                     <input type="text" id="mobile" ref={mobile}/>
//                                 </div>
//                             </div>
//                             <div className="newac-form-group">
//                                 <label htmlFor="password">Password*</label>
//                                 <input type="password" id="password" ref={password}/>
//                             </div>
//                             <button type="submit" className="newac-button">Sign Up</button>
//                         </form>
//                         <p className="newac-login-link">
//                             Already have an account?  <Link  to={"/login"}> Log in</Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default New_Account;




import axios from 'axios';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const New_Account = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const mobile = useRef();

  const navigate = useNavigate(); // Use this instead of Navigate component

  const register = (e) => {
    e.preventDefault();
  
    const enteredUsername = username.current.value.trim();
    const enteredEmail = email.current.value.trim();
    const enteredPassword = password.current.value;
    const enteredMobile = mobile.current.value.trim();
  
    // 🚨 Frontend validations
    if (!enteredUsername) {
      return toast.error("Username is required");
    }
  
    if (!enteredEmail.includes('@')) {
      return toast.error("Enter a valid email address");
    }
  
    if (!/^\d{10}$/.test(enteredMobile)) {
      return toast.error("Mobile number must be 10 digits");
    }
  
    if (enteredPassword.length < 2 || enteredPassword.length > 7) {
      return toast.error("Password must be between 2 and 7 characters");
    }
  
    const obj = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
      mobile: enteredMobile,
    };
  
    axios.post(`${process.env.REACT_APP_API}/add`,obj)
      .then((response) => {
        if (response.data.status === "done") {
          toast.success("Successfully registered!");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response?.data?.errors) {
          err.response.data.errors.forEach((e) => toast.error(e));
        } else {
            toast.error(err?.response?.data?.errors?.[0] || "Something went wrong");
            console.log("Error details:", err.response?.data || err.message);
        }
      });
  };
  

  return (
    <div className="newac-outer">
      <div className="newac-inner">
        <div className="newac-title">
          <h1>Create Your Account</h1>
          <p>Welcome back! Please enter your details</p>
        </div>
        <div className="newac-data">
          <div className="newac-left">
            <img src="./assets1/images/cartoon.png" alt="Cartoon" className="newac-cartoon" />
          </div>
          <div className="newac-right">
            <form onSubmit={register}>
              <div className="newac-form-group">
                <label htmlFor="first-name">First Name*</label>
                <input type="text" id="first-name" ref={username} />
              </div>
              <div className="newac-form-group">
                <label htmlFor="last-name">Last Name*</label>
                <input type="text" id="last-name" />
              </div>
              <div className="newac-form-group">
                <label htmlFor="email">Email*</label>
                <input type="email" id="email" ref={email} />
              </div>
              <div className="newac-form-group">
                <label htmlFor="mobile">Mobile No.*</label>
                <div className="newac-mobile-input">
                  <select>
                    <option value="+91">+91</option>
                  </select>
                  <input type="text" id="mobile" ref={mobile} />
                </div>
              </div>
              <div className="newac-form-group">
                <label htmlFor="password">Password*</label>
                <input type="password" id="password" ref={password} />
              </div>
              <button type="submit" className="newac-button">Sign Up</button>
            </form>
            <p className="newac-login-link">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default New_Account;
