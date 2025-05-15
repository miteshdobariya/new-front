import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Categoryinsert = () => {

    const name = useRef();
    const img = useRef();

    const register = (e) => {
        e.preventDefault();
        const params = new FormData();


    
        params.set("name", name.current.value.toLowerCase())

        params.set("img", img.current.files[0])


        axios.post(`${process.env.REACT_APP_API}/catinsert`, params)
            .then(function (response) {
                console.log(params, "*****")
                if (response.data.status == "done") {
                    toast.success("Success Register");

                }
            })
            .catch(function (error) {

                toast("error");
            })
    }



    return (
        <>
            <ToastContainer />
            <div className="signup-main">
                <div className="container">
                    <h1>Insert Image</h1>
                    <form onSubmit={register}>
                        <label htmlFor="username">Name:</label>
                        <input type="text" ref={name} required/>

                        <label htmlFor="username">image:</label>
                        <input type="file" ref={img} required />

                        <button className="sign-button" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>


        </>
    )
}
export default Categoryinsert;