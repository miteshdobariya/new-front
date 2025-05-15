import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Forget_Password = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle password reset (e.g., API call)
        console.log("Password reset link sent to:", email);
    };

    return (
        <div className="newac-outer">
            <div className="newac-inner">
                <div className="newac-title">
                    <h1>Forgot Password</h1>
                    <p>Enter your email to reset your password</p>
                </div>
                <div className="newac-data">
                    <div className="newac-left">
                        <img src="./assets1/images/cartoon.png" alt="Cartoon" className="newac-cartoon" />
                    </div>
                    <div className="newac-right">
                        <form onSubmit={handleSubmit}>
                            <div className="newac-form-group">
                                <label htmlFor="email">Email*</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <button type="submit" className="newac-button">Reset Password</button>
                        </form>
                        <p className="newac-login-link">
                            Remembered your password? <Link  to={"/login"}> Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forget_Password;
