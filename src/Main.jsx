import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Service from "./Service";
import Categorymain from "./Categorymain";
import Bestsellers from "./Bestsellers";
import Review from "./Review";
import Footer from "./Footer";
import Product_inner from "./Product_inner";
import SendOTP from "./SendOtp";
import AAA from "./AAA";
const Main = () =>{
    return(
        <>
            <Hero/>
            {/* <SendOTP/> */}
            <Service/>
            <Categorymain/>
            <AAA/>
            <Bestsellers/>
            <Review/>
          
        </>
    )
}
export default Main;