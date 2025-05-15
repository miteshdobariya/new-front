import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const Review = () => {
    useEffect(() => {
        setTimeout(() => {
            const prevButton = document.querySelector(".swiper-button-prevseller1");
            const nextButton = document.querySelector(".swiper-button-nextseller1");

            if (prevButton && nextButton) {
                prevButton.style.display = "flex";
                nextButton.style.display = "flex";
            }
        }, 500); // Delay ensures elements are rendered before targeting them
    }, []);
    return (
        <>
            <div className="review-main">
                <div className="container">
                    <div className="seller-title">
                        <h3>Customer Stories</h3>
                    </div>
                    <div className="swiper-button-prevseller1">&lt;</div>
                    <div className="swiper-button-nextseller1">&gt;</div>

                    {/* ---------- SWIPER START ------------ */}


                    <Swiper
                        slidesPerView={2}
                        loop={true}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={20}
                        navigation={{ nextEl: ".swiper-button-nextseller1", prevEl: ".swiper-button-prevseller1" }}

                        modules={[Navigation]} // Include Navigation and Autoplay modules
                        className="swiper-container11"
                        breakpoints={{
                            // When window width is >= 320px
                            320: { slidesPerView: 1, spaceBetween: 0 },
                            // When window width is >= 600px
                            600: { slidesPerView: 2, spaceBetween: 10 },
                            // When window width is >= 1000px
                            1000: { slidesPerView: 2, spaceBetween: 20 },
                            // When window width is >= 1200px
                            1200: { slidesPerView: 2, spaceBetween: 10 },
                        }}
                    >
                        <div className="review-inner">
                            <SwiperSlide>

                                <div className="review-cln">
                                    <div className="r-img">
                                        <img src="assets1/images/client1.png" />
                                    </div>
                                    <div className="r-detail">
                                        <div className="story">
                                            <h5>
                                                "“I find the design supremely unique and the feels is so comfortable after wearing them. I can vouch that there were plenty of folks reaching out to me in all the events just to ask who am i wearing!”"
                                            </h5>
                                        </div>
                                        <div className="r-title">
                                            <div className="name">
                                                Abhinav Singh Raghav
                                            </div>
                                            <div className="location">
                                                Hyderabad, Telangana
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>

                                <div className="review-cln">
                                    <div className="r-img">
                                        <img src="assets1/images/client2.png" />
                                    </div>
                                    <div className="r-detail">
                                        <div className="story">
                                            <h5>
                                                “I find the design supremely unique and the feels is so comfortable after wearing them. I can vouch that there were plenty of folks reaching out to me in all the events just to ask who am i wearing!”
                                            </h5>
                                        </div>
                                        <div className="r-title">
                                            <div className="name">
                                                Abhinav Singh Raghav
                                            </div>
                                            <div className="location">
                                                Hyderabad, Telangana
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>

                                <div className="review-cln">
                                    <div className="r-img">
                                        <img src="assets1/images/client2.png" />
                                    </div>
                                    <div className="r-detail">
                                        <div className="story">
                                            <h5>
                                                “I find the design supremely unique and the feels is so comfortable after wearing them. I can vouch that there were plenty of folks reaching out to me in all the events just to ask who am i wearing!”
                                            </h5>
                                        </div>
                                        <div className="r-title">
                                            <div className="name">
                                                Abhinav Singh Raghav
                                            </div>
                                            <div className="location">
                                                Hyderabad, Telangana
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </div>



                    </Swiper>

                </div>


            </div>
        </>
    )
}
export default Review;