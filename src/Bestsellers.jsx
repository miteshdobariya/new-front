import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "swiper/css/navigation";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Bestsellers = () => {
    const navigate = useNavigate();


    const register = (e) => {
        e.preventDefault();
        var id = e.currentTarget.getAttribute("data-id");
        // alert(id);
        navigate("/productinner/" + id);
    }

    useEffect(() => {
        setTimeout(() => {
            const prevButton = document.querySelector(".swiper-button-prevseller");
            const nextButton = document.querySelector(".swiper-button-nextseller");

            if (prevButton && nextButton) {
                prevButton.style.display = "flex";
                nextButton.style.display = "flex";
            }
        }, 500); // Delay ensures elements are rendered before targeting them
    }, []);

    const [data, setdata] = useState([])


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/getallproduct`)

            .then(function (response) {

                const filteredData = response.data.data.filter(product => product.isnew === "yes");
                setdata(filteredData);

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



    return (
        <>
            <ToastContainer />
            <div className="bestseller-main">
                <div className="container">
                    <div className="seller-title">
                        <h3>Bestseller trends</h3>
                    </div>
                    <div className="seller-inner">

                        <div className="swiper-button-prevseller">&lt;</div>
                        <div className="swiper-button-nextseller">&gt;</div>
                        {/* ---------- SWIPER START ------------ */}


                        <Swiper
                            slidesPerView={5}
                            loop={true}
                            autoplay={{
                                delay: 1000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={20}
                            navigation={{ nextEl: ".swiper-button-nextseller", prevEl: ".swiper-button-prevseller" }}

                            modules={[Navigation]} // Include Navigation and Autoplay modules
                            className="swiper-container1"
                            breakpoints={{
                                // When window width is >= 320px
                                320: { slidesPerView: 2, spaceBetween: 0 },
                                // When window width is >= 600px
                                600: { slidesPerView: 3, spaceBetween: 15 },

                                // When window width is >= 1000px
                                1000: { slidesPerView: 4, spaceBetween: 20 },
                                // When window width is >= 1200px
                                1200: { slidesPerView: 5, spaceBetween: 20 },
                            }}
                        >


                            {
                                data.map((i) => {
                                    return (
                                        <>
                                            <SwiperSlide>
                                                <div className="seller-cln" onClick={register}  data-id={i._id}>
                                                    <div className="seller-img">
                                                        <img /*src={`${process.env.REACT_APP_API}/images/${i.img}`}*/ src={i.img} alt="Category 1" />
                                                    </div>
                                                    <div className="seller-detail">
                                                        <div className="name">
                                                            <h4>{i.name}</h4>
                                                        </div>
                                                        <div className="price">
                                                            <h4>
                                                                ₹{i.price.toLocaleString()}

                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>


                                            </SwiperSlide>
                                        </>
                                    )
                                })
                            }

                            {/* <SwiperSlide>
                               <div className="seller-cln">
                               <div className="seller-img">
                              
                                    <img src="assets1/images/best2.png" alt="Category 1" />
                                </div>
                                <div className="seller-detail">
                                    <div className="name">
                                        <h4>Red georgeette croptop pa...</h4>
                                    </div>
                                    <div className="price">
                                        <h4>
                                            13,999
                                        </h4>
                                    </div>
                                </div>
                               </div>


                            </SwiperSlide>

                            <SwiperSlide>
                               <div className="seller-cln">
                               <div className="seller-img">
                                    <img src="assets1/images/best3.png" alt="Category 1" />
                                </div>
                                <div className="seller-detail">
                                    <div className="name">
                                        <h4>Red georgeette croptop pa...</h4>
                                    </div>
                                    <div className="price">
                                        <h4>
                                            13,999
                                        </h4>
                                    </div>
                                </div>
                               </div>


                            </SwiperSlide>

                            <SwiperSlide>
                               <div className="seller-cln">
                               <div className="seller-img">
                                    <img src="assets1/images/best4.png" alt="Category 1" />
                                </div>
                                <div className="seller-detail">
                                    <div className="name">
                                        <h4>Red georgeette croptop pa...</h4>
                                    </div>
                                    <div className="price">
                                        <h4>
                                            13,999
                                        </h4>
                                    </div>
                                </div>
                               </div>


                            </SwiperSlide>

                            <SwiperSlide>
                               <div className="seller-cln">
                               <div className="seller-img">
                                    <img src="assets1/images/best5.png" alt="Category 1" />
                                </div>
                                <div className="seller-detail">
                                    <div className="name">
                                        <h4>Red georgeette croptop pa...</h4>
                                    </div>
                                    <div className="price">
                                        <h4>
                                            13,999
                                        </h4>
                                    </div>
                                </div>
                               </div>


                            </SwiperSlide>
                            <SwiperSlide>
                               <div className="seller-cln">
                               <div className="seller-img">
                                    <img src="assets1/images/best1.png" alt="Category 1" />
                                </div>
                                <div className="seller-detail">
                                    <div className="name">
                                        <h4>Red georgeette croptop pa...</h4>
                                    </div>
                                    <div className="price">
                                        <h4>
                                            13,999
                                        </h4>
                                    </div>
                                </div>
                               </div>


                            </SwiperSlide> */}

                            {/* Navigation Buttons INSIDE Swiper */}



                        </Swiper>


                        {/* ----------- SWIPER END-------------- */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Bestsellers;



// import React, { useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const Bestsellers = () => {
//     const prevRef = useRef(null);
//     const nextRef = useRef(null);
//     const swiperRef = useRef(null);

//     useEffect(() => {
//         setTimeout(() => {
//             if (prevRef.current && nextRef.current) {
//                 prevRef.current.style.display = "flex";
//                 nextRef.current.style.display = "flex";
//             }
//         }, 500);
//     }, []);

//     return (
//         <>
//             <div className="bestseller-main">
//                 <div className="container">
//                     <div className="seller-title">
//                         <h3>Bestseller trends</h3>
//                     </div>
//                     <div className="seller-inner">
//                         {/* Navigation Buttons (OUTSIDE Swiper) */}
//                         <div ref={prevRef} className="swiper-button-prevseller">&lt;</div>
//                         <div ref={nextRef} className="swiper-button-nextseller">&gt;</div>

//                         {/* Swiper Component */}
//                         <Swiper
//                             ref={swiperRef}
//                             slidesPerView={5}
//                             loop={true}
//                             autoplay={{
//                                 delay: 2000,
//                                 disableOnInteraction: false,
//                             }}
//                             spaceBetween={20}
//                             navigation={{
//                                 prevEl: prevRef.current,
//                                 nextEl: nextRef.current,
//                             }}
//                             onBeforeInit={(swiper) => {
//                                 if (swiper.params.navigation) {
//                                     swiper.params.navigation.prevEl = prevRef.current;
//                                     swiper.params.navigation.nextEl = nextRef.current;
//                                     swiper.navigation.init();
//                                     swiper.navigation.update();
//                                 }
//                             }}
//                             modules={[Navigation, Autoplay]} // Ensure modules are passed correctly
//                             className="swiper-container1"
//                             breakpoints={{
//                                 320: { slidesPerView: 1, spaceBetween: 10 },
//                                 600: { slidesPerView: 2, spaceBetween: 15 },
//                                 1000: { slidesPerView: 4, spaceBetween: 20 },
//                                 1200: { slidesPerView: 5, spaceBetween: 20 },
//                             }}
//                         >
//                             {[...Array(6)].map((_, index) => (
//                                 <SwiperSlide key={index}>
//                                     <div className="seller-cln">
//                                         <div className="seller-img">
//                                             <img src="assets1/images/best1.png" alt="Category 1" />
//                                         </div>
//                                         <div className="seller-detail">
//                                             <div className="name">
//                                                 <h4>Red Georgette Croptop</h4>
//                                             </div>
//                                             <div className="price">
//                                                 <h4>13,999</h4>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Bestsellers;

