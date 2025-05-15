import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaHeart } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const Ourcatagory = () => {
const [data1, setdata1] = useState([])
  useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/getallproduct`)

            .then(function (response) {

                const filteredData = response.data.data.filter(product => product.isnew === "yes");
                setdata1(response.data.data);

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

    const navigate=useNavigate();

    const [likedItems, setLikedItems] = useState([]);
   


    const toggleLike = (index) => {
        if (likedItems.includes(index)) {
            setLikedItems(likedItems.filter((item) => item !== index)); // remove from liked
        } else {
            setLikedItems([...likedItems, index]); // add to liked
        }
    };


    useEffect(() => {
        setTimeout(() => {
            const prevButton = document.querySelector(".swiper-button-prevseller7");
            const nextButton = document.querySelector(".swiper-button-nextseller7");

            if (prevButton && nextButton) {
                prevButton.style.display = "flex";
                nextButton.style.display = "flex";
            }
        }, 500); // Delay ensures elements are rendered before targeting them
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const prevButton = document.querySelector(".swiper-button-prevseller8");
            const nextButton = document.querySelector(".swiper-button-nextseller8");

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


    return (
        <>
            <div className="ourcat-main">
                <div className="container">
                    <div className="cat-inner">
                        <div className="title-section">
                            <div className="title">
                                <h3>our Category</h3>
                                <h4>Curated Elegance, Timeless Traditions.</h4>
                            </div>
                        </div>
                        <div className="detail-section">
                            

                            {
                                data.map((i) => {
                                    return (
                                        <>
                                            <div className="cln">
                                                <div className="cat-img" onClick={looknow} cat-name={i.name}>
                                                    <img src={`${process.env.REACT_APP_API}/images/${i.img}`}  alt="category" />
                                                </div>
                                                <div className="cat-detail">
                                                    <div className="name">
                                                        <h5>{i.name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }

                        </div>
                    </div>

                    <div className="cat-inner2">
                        <div className="swiper-button-prevseller7">&lt;</div>
                        <div className="swiper-button-nextseller7">&gt;</div>
                        <div className="swiper-button-prevseller8">&lt;</div>
                        <div className="swiper-button-nextseller8">&gt;</div>
                        <div className="title-section2">
                            <h3>All-Products</h3>
                        </div>
                        <div className="detail-section2">
                            <Swiper
                                slidesPerView={5}
                                loop={true}
                                autoplay={{
                                    delay: 1000,
                                    disableOnInteraction: false,
                                }}
                                spaceBetween={0}
                                navigation={{ nextEl: ".swiper-button-nextseller7", prevEl: ".swiper-button-prevseller7" }}

                                modules={[Navigation]} // Include Navigation and Autoplay modules
                                className="swiper-container1"
                                breakpoints={{
                                    // When window width is >= 320px
                                    320: { slidesPerView: 2, spaceBetween: 0 },
                                    // When window width is >= 600px
                                    600: { slidesPerView: 4, spaceBetween: 0 },

                                    // When window width is >= 1000px
                                    1000: { slidesPerView: 4, spaceBetween: 20 },
                                    // When window width is >= 1200px
                                    1200: { slidesPerView: 5, spaceBetween: 20 },
                                }}
                            >
                                

                                {data1.map((item, index) => (
                                    <SwiperSlide key={index}>

                                        <div className="cat-cln">
                                            <div className="cat-img">
                                                <img src={`${process.env.REACT_APP_API}/images/${item.img}`} alt={item.name} />
                                                <div className="heart" onClick={() => toggleLike(index)}>
                                                    <FaHeart color={likedItems.includes(index) ? "red" : "gray"} />
                                                </div>
                                                <div className="back">
                                                    <img src="assets1/images/heartback.png" alt="like" />
                                                </div>
                                            </div>
                                            <div className="cat-detail">
                                                <div className="name">
                                                    <h4>{item.name}</h4>
                                                </div>
                                                <div className="price">
                                                    <h4>{item.price.toLocaleString()}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}





                                {/* Navigation Buttons INSIDE Swiper */}



                            </Swiper>


                            <Swiper
                                slidesPerView={5}
                                loop={true}
                                autoplay={{
                                    delay: 1000,
                                    disableOnInteraction: false,
                                }}
                                spaceBetween={0}
                                navigation={{ nextEl: ".swiper-button-nextseller8", prevEl: ".swiper-button-prevseller8" }}

                                modules={[Navigation]} // Include Navigation and Autoplay modules
                                className="swiper-container88"
                                breakpoints={{
                                    // When window width is >= 320px
                                    320: { slidesPerView: 2, spaceBetween: 0 },
                                    // When window width is >= 600px
                                    600: { slidesPerView: 4, spaceBetween: 0 },

                                    // When window width is >= 1000px
                                    1000: { slidesPerView: 4, spaceBetween: 20 },
                                    // When window width is >= 1200px
                                    1200: { slidesPerView: 5, spaceBetween: 20 },
                                }}
                            >


                                {data1.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="cat-cln">
                                            <div className="cat-img">
                                                <img src={`${process.env.REACT_APP_API}/images/${item.img}`} alt={item.name} />
                                                <div className="heart" onClick={() => toggleLike(index)}>
                                                    <FaHeart color={likedItems.includes(index) ? "red" : "gray"} />
                                                </div>
                                                <div className="back">
                                                    <img src="assets1/images/heartback.png" alt="like" />
                                                </div>
                                            </div>
                                            <div className="cat-detail">
                                                <div className="name">
                                                    <h4>{item.name}</h4>
                                                </div>
                                                <div className="price">
                                                    <h4>{item.price.toLocaleString()}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}





                                {/* Navigation Buttons INSIDE Swiper */}



                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Ourcatagory;