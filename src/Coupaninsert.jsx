import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Coupaninsert = () => {

    const name = useRef();
    const discount = useRef();

    const register = (e) => {
        e.preventDefault();
        const params = new FormData();

const obj={
            name: name.current.value,
            discount: discount.current.value
        }
      

    
        params.set("name", name.current.value)

        params.set("discount", discount.current.value)

        console.log(params, "*****")
        axios.post(`${process.env.REACT_APP_API}/coupaninsert`,obj)
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
                        <label htmlFor="username">Coupan Code:</label>
                        <input type="text" ref={name} required/>

                        <label htmlFor="username">Disccount:</label>
                        <input type="text" ref={discount} required />

                        <button className="sign-button" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>


        </>
    )
}
export default Coupaninsert;