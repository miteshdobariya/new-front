import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SendOTP = () => {
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/send-otp`, { email });
      toast.success(res.data.message + ' OTP: ' + res.data.otp); // for dev only
    } catch (err) {
      toast.error('Failed to send OTP');
    }
  };

  return (
    <div>
      <input type="email" placeholder="Enter email" value={email}
             onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSendOTP}>Send OTP</button>
    </div>
  );
};

export default SendOTP;
