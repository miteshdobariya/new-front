import React, { useState } from 'react';

const New_Password = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setResponse("Passwords do not match!");
            return;
        }

        // Add logic to update the password (e.g., API call)
        console.log("Password updated successfully:", newPassword);
        setResponse("Password updated successfully!");
    };

    return (
        <div className="newac-outer">
            <div className="newac-inner">
                <div className="newac-title">
                    <h1>Set New Password</h1>
                    <p>Enter your new password below and confirm it.</p>
                </div>
                <div className="newac-data">
                    <div className="newac-left">
                        <img src="./assets1/images/cartoon.png" alt="Cartoon" className="newac-cartoon" />
                    </div>
                    <div className="newac-right">
                        <form onSubmit={handleSubmit}>
                            <div className="newac-form-group">
                                <label htmlFor="new-password">New Password*</label>
                                <input
                                    type="password"
                                    id="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter your new password"
                                />
                            </div>
                            <div className="newac-form-group">
                                <label htmlFor="confirm-password">Confirm Password*</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter your new password"
                                />
                            </div>
                            <button type="submit" className="newac-button">Update Password</button>
                        </form>
                        {response && (
                            <p
                                style={{
                                    marginTop: "20px",
                                    color: response === "Password updated successfully!" ? "green" : "red",
                                }}
                            >
                                {response}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New_Password;
