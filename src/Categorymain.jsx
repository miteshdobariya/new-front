


import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Autoplay, Navigation } from "swiper/modules"; // Import Navigation module
import "swiper/css";
import "swiper/css/navigation"; // Import navigation styles
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryMain = () => {
    const navigate=useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const prevButton = document.querySelector(".swiper-button-prev2");
            const nextButton = document.querySelector(".swiper-button-next2");

            if (prevButton && nextButton) {
                prevButton.style.display = "flex";
                nextButton.style.display = "flex";
            }
        }, 500); // Delay ensures elements are rendered before targeting them
    }, []);
 const [data, setdata] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/getallcat`)

            .then(function (response) {

                setdata(response.data.data)

            })
            .catch(function (error) {
                if (error.response) {
                    // If the error comes from the server
                    toast.error(error.response.data.result || error.response.data.message);
                } else {
                    // Generic error
                    toast.error("Something went wrong!");
                }
                console.log(error);
            });
    }, [])

const looknow = (e) =>{
    e.preventDefault();
   var catname=e.currentTarget.getAttribute("cat-name");
   navigate("/products/" +catname)
}

const seeall = () =>{
    navigate("/ourcatagory")
}


    return (
        
        <>
         <ToastContainer />
            <div className="category-main">
            <div className="container">
                <div className="seller-title">
                    <h3>Our Categories</h3>
                    <div className="arrow">
                    <h4 onClick={seeall}> see all <img src="assets1/images/errow.svg" /></h4>
                </div>
                </div>
               
                <div className="category-inner">
                    {/* <div className="swiper-button-prev2">&lt;</div>
                <div  className="swiper-button-next2">&gt;</div> */}

                    {/* Swiper Component */}
                    <Swiper
                        slidesPerView={4}
                        loop={true}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={10}
                        navigation={{ nextEl: ".swiper-button-next2", prevEl: ".swiper-button-prev2" }}
                        modules={[Navigation]} // Include Navigation and Autoplay modules
                        className="swiper-container"
                        breakpoints={{
                            // When window width is >= 320px
                            320: { slidesPerView: 3, spaceBetween: 10 },
                            // When window width is >= 600px
                            600: { slidesPerView: 2, spaceBetween: 0 },
                            // When window width is >= 1000px
                            1000: { slidesPerView: 3, spaceBetween: 20 },
                            // When window width is >= 1200px
                            1200: { slidesPerView: 4, spaceBetween: 20 },
                        }}
                    >
                        

                       { data.map((i) => {
                            return(
                                <>
                                    <SwiperSlide>
                            <div className="cat-img" onClick={looknow} cat-name={i.name}>
                                <img src={`${process.env.REACT_APP_API}/images/${i.img}`}  alt="Category 1" />
                                <div className="cat-name">
                                    <h4>{i.name}</h4>
                                </div>
                                <div className="cat-button">
                                    <Link  onClick={looknow} cat-name={i.name}>Look now</Link>
                                </div>
                            </div>
                        </SwiperSlide>
                                </>
                            )
                        })}

                        {/* <SwiperSlide>
                            <div className="cat-img">
                                <img src="assets1/images/cat2.png" alt="Category 2" />
                                <div className="cat-name">
                                    <h4>Lehenga</h4>
                                </div>
                                <div className="cat-button">
                                    <Link to={"/products"}>Look now</Link>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="cat-img">
                                <img src="assets1/images/cat3.png" alt="Category 3" />
                                <div className="cat-name">
                                    <h4>Krti-plazo</h4>
                                </div>
                                <div className="cat-button">
                                    <Link to={"/products"}>Look now</Link>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="cat-img">
                                <img src="assets1/images/cat4.png" alt="Category 4" />
                                <div className="cat-name">
                                    <h4>Gown</h4>
                                </div>
                                <div className="cat-button">
                                    <Link to={"/products"}>Look now</Link>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="cat-img">
                                <img src="assets1/images/cat3.png" alt="Category 3" />
                                <div className="cat-button">
                                    <Link to={"/products"}>Look now</Link>
                                </div>
                            </div>
                        </SwiperSlide> */}

                        {/* Navigation Buttons INSIDE Swiper */}

                    </Swiper>
                </div>
            </div>
        </div>
        </>
    );
};

export default CategoryMain;
