// import React, { useState } from 'react';

// const Enter_OTP = () => {
//     const [otp, setOtp] = useState("");

//     const handleSubmit = (e) => {
//     const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("${process.env.REACT_APP_API}/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: "user@example.com", // pass the actual user email
//         otp,
//       }),
//     });

//     const data = await response.json();
//     if (data.success) {
//       alert("OTP Verified!");
//       // Redirect or proceed with next step (like reset password)
//     } else {
//       alert("Invalid OTP. Please try again.");
//     }
//   } catch (err) {
//     console.error("Error verifying OTP:", err);
//     alert("An error occurred. Please try again.");
//   }
// };

//     };

//     return (
//         <div className="newac-outer">
//             <div className="newac-inner">
//                 <div className="newac-title">
//                     <h1>Enter OTP</h1>
//                     <p>We have sent an OTP to your registered email. Please enter it below to reset your password.</p>
//                 </div>
//                 <div className="newac-data">
//                     <div className="newac-left">
//                         <img src="./assets1/images/cartoon.png" alt="Cartoon" className="newac-cartoon" />
//                     </div>
//                     <div className="newac-right">
//                         <form onSubmit={handleSubmit}>
//                             <div className="newac-form-group">
//                                 <label htmlFor="otp">OTP*</label>
//                                 <input
//                                     type="text"
//                                     id="otp"
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                     placeholder="Enter the OTP"
//                                 />
//                             </div>
//                             <button type="submit" className="newac-button">Verify OTP</button>
//                         </form>
//                         <p className="newac-login-link">
//                             Didn't receive the OTP? <a href="#">Resend OTP</a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Enter_OTP;




import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext";


const Enter_OTP = () => {
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const { email } = location.state || {};
    const navigate = useNavigate();
    const { isLoggedIn, logout, login } = useContext(AuthContext);




    const [resendDisabled, setResendDisabled] = useState(false);

    const handleResendOTP = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email not found. Go back and enter your email again.");
            return;
        }

        try {
            setResendDisabled(true); // Disable the link temporarily
            const res = await axios.post(`${process.env.REACT_APP_API}/send-otp`, { email });
            toast.success("OTP resent successfully!");

          

            setTimeout(() => {
                setResendDisabled(false); // Re-enable after 30 seconds
            }, 30000);
        } catch (err) {
            toast.error("Failed to resend OTP.");
            setResendDisabled(false);
        }
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/verify-otp`, {
                email,
                otp,
            });

            if (response.data.success) {
                toast.success("OTP Verified!");
                localStorage.setItem('loginnn', 'done');
                localStorage.setItem('email', email);
                login();
                setTimeout(() => {
                    navigate("/");
                }, 1500);


                // Redirect or next step
            } else {
                toast.error("Invalid or expired OTP. Please try again.");
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="newac-outer">
                <div className="newac-inner">
                    <div className="newac-title">
                        <h1>Enter OTP</h1>
                        <p>We have sent an OTP to your registered email. Please enter it below to reset your password.</p>
                    </div>
                    <div className="newac-data">
                        <div className="newac-left">
                            <img src="./assets1/images/cartoon.png" alt="Cartoon" className="newac-cartoon" />
                        </div>
                        <div className="newac-right">
                            <form onSubmit={handleSubmit}>
                                <div className="newac-form-group">
                                    <label htmlFor="otp">OTP*</label>
                                    <input
                                        type="text"
                                        id="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter the OTP"
                                    />
                                </div>
                                <button type="submit" className="newac-button">Verify OTP</button>
                            </form>
                            <p className="newac-login-link">
                                Didn't receive the OTP? <a href="#" onClick={handleResendOTP} style={{ pointerEvents: resendDisabled ? "none" : "auto", opacity: resendDisabled ? 0.5 : 1 }}>Resend OTP</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Enter_OTP;
