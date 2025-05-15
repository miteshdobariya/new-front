import React from "react";
import { Link } from "react-router-dom";
import heroImg from "./assets/Backgroungimg/heropic.png";
const Hero = () => {
    return (
        <>
            <div className="hero-main" style={{ backgroundImage: `url(${heroImg})` }} >
                {/* <div className="hero-img">
                    <img src="assets1/images/heropic.png" alt="Hero-img"/>
                </div> */}
                <div className="hero-txt">
                    <h2>
                        The club of white
                    </h2>
                </div>
                <div className="hero-button">
                    <Link to={"/"}>get started</Link>
                </div>
            </div>
        </>
    )
}
export default Hero;