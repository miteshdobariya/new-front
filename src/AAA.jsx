// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-cards';

// // import './styles.css';

// // import required modules
// import { EffectCards } from 'swiper/modules';

// export default function App() {
//     return (
//         <>
//            <div className="app">
//            <Swiper
//                 effect={'cards'}
//                 grabCursor={true}
//                 modules={[EffectCards]}
//                 className="mySwiper"
//             >
//                 <SwiperSlide>
//                     <img src="assets1/images/best1.png" alt="Look 1" />
//                     <button className="view-more">View More</button>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src="assets1/images/best1.png" alt="Look 1" />
//                     <button className="view-more">View More</button>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src="assets1/images/best1.png" alt="Look 1" />
//                     <button className="view-more">View More</button>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src="assets1/images/best1.png" alt="Look 1" />
//                     <button className="view-more">View More</button>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src="assets1/images/best1.png" alt="Look 1" />
//                     <button className="view-more">View More</button>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src="assets1/images/best1.png" alt="Look 1" />
//                     <button className="view-more">View More</button>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src="assets1/images/best1.png" alt="Look 1" />
//                     <button className="view-more">View More</button>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src="assets1/images/best1.png" alt="Look 1" />
//                     <button className="view-more">View More</button>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src="assets1/images/best1.png" alt="Look 1" />
//                     <button className="view-more">View More</button>
//                 </SwiperSlide>
//                 <SwiperSlide>
//                     <img src="assets1/images/best1.png" alt="Look 1" />
//                     <button className="view-more">View More</button>
//                 </SwiperSlide>

//             </Swiper>
//            </div>
//         </>
//     );
// }


// import React, { useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectCards, Navigation } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/effect-cards';
// import 'swiper/css/navigation';

// export default function TrendingLooks() {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   return (
//     <div className="slider-wrapper">
//       <h2 className="slider-heading">Trending Looks To Watch</h2>

//       <Swiper
//         effect="cards"
//         grabCursor
//         modules={[EffectCards, Navigation, Autoplay]}
//         slidesPerView={1}
//         autoplay={{
//             delay: 1000, // Time in ms between each slide change
//             disableOnInteraction: false, // Continue autoplay after interaction
//           }}
       
//         className="mySwiper"
//       >
//         {Array.from({ length: 10 }).map((_, i) => (
//           <SwiperSlide key={i}>
//             <img src="assets1/images/best1.png" alt={`Look ${i + 1}`} />
//             <button className="view-more">View More</button>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* place these anywhere inside slider-wrapper */}
     
//     </div>
//   );
// }





import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCards, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom'

export default function TrendingLooks() {
  const [products, setProducts] = useState([])
  const swiperRef = useRef(null)
  const navigate = useNavigate();
  // Fetch data on mount
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/getallproduct`)
      .then((res) => {
        setProducts(res.data.data || []);
        console.log(res.data.data,"oooooooo")
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.result || err.response.data.message)
        } else {
          toast.error('Something went wrong!')
        }
        console.error(err)
      })
  }, [])

  const product = (e) => {
    var id = e.currentTarget.getAttribute("data-id");
    navigate("/productinner/" + id);
  }

  return (
    <>
      <ToastContainer />

      <div className="slider-wrapper">
        <h2 className="slider-heading">Trending Looks To Watch</h2>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[EffectCards, Navigation, Autoplay]}
          effect="cards"
          grabCursor
          slidesPerView={1}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          
          className="mySwiper"
        >
          {products.slice(0,15).map((prod) => (
            <SwiperSlide key={prod.id}>
              <img src={`${process.env.REACT_APP_API}/images/${prod.img}`} alt={prod.title} />
              <button className="view-more" data-id={prod._id} onClick={product}>View More</button>
            </SwiperSlide>
          ))}

          {products.length === 0 && (
            <SwiperSlide>
              <div className="loading-slide">Loading...</div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </>
  )
}
