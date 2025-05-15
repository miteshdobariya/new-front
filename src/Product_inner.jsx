import React, { useEffect, useRef, useState } from 'react';
import { PiTruckTrailerThin } from "react-icons/pi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Product_inner = () => {
    const navigate = useNavigate();
    const [mainImage, setMainImage] = useState("");
    const [originalImage, setOriginalImage] = useState("");

    const size = useRef("");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [selectedSize, setSelectedSize] = useState("");
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const [sizes1, setsizes1] = useState([])
    const [selectedColor, setSelectedColor] = useState(""); // State for selected color
    const [colors, setColors] = useState([]); // Available colors fetched from the backend
    const [quantity, setQuantity] = useState(1);
    const [openIndex, setOpenIndex] = useState(null);

    const [data1, setdata1] = useState({});
    const { id } = useParams();

    // Fetch product details, including all colors
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/productinner/${id}`)
            .then(function (response) {
                if (response.data.status === "done") {
                    const product = response.data.data;
                    const relatedColors = response.data.relatedColors;

                    setdata1(product); // Set the main product details
                    // Check if the product has color variations
                    setMainImage(product.img);
                    setOriginalImage(product.img);


                    setsizes1(response.data.data.productsize)
                    if (relatedColors.length > 0) {
                        setColors([product.color, ...relatedColors.map(item => item.color)]); // Include all colors
                    } else {
                        setColors([product.color]); // Only the main product's color
                    }
                    setSelectedColor(product.color); // Set the default selected color
                } else {
                    toast.error("Product not found.");
                }
            })
            .catch(function (error) {
                console.error("Error fetching product details:", error);
                toast.error("Failed to fetch product details.");
            });
    }, [id]);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        // Fetch product details for the selected color
        axios.get(`${process.env.REACT_APP_API}/productinnerbycolor?name=${data1.name}&color=${color}`)
            .then(function (response) {
                if (response.data.status === "done") {
                    setdata1(response.data.data); // Update product details for the selected color
                    setMainImage(response.data.data.img);
                    setOriginalImage(response.data.data.img);
                    setsizes1(response.data.data.productsize)

                } else {
                    toast.error("Failed to fetch product details for the selected color.");
                }
            })
            .catch(function (error) {
                console.error("Error fetching product details for the selected color:", error);
                toast.error("Failed to fetch product details for the selected color.");
            });
    };

    const sections = [
        { title: "Product Details", content: data1.detail },
        { title: "Style and Fit Tips", content: "Guidance on styling and fitting the product." },
        { title: "Shipping and Return", content: "Information on shipping and return policies." },
        { title: "FAQ's", content: "Frequently asked questions about the product." }
    ];

    const addcart = (e) => {
        var id = e.currentTarget.getAttribute("data_id");
        alert(id);

        const user = localStorage.getItem("email");
        if (!user) {
            console.error("User not logged in.");
            navigate('/login');
            toast.error("Please log in to add items to the cart.");
            return;
        }

        if (!selectedSize) {
            toast.error("Please select a size before adding to cart.");
            return;
        }

        if (!selectedColor) {
            toast.error("Please select a color before adding to cart.");
            return;
        }

        const obj = {
            email: user,
            name: data1.name,
            img: data1.img,
            price: data1.price,
            qty: quantity,
            size: selectedSize,
            color: selectedColor, // Add selected color to the cart object
            subtotal: data1.price * quantity,
            productid: id,
        };
        axios.post(`${process.env.REACT_APP_API}/cartadd`, obj)
            .then(function (response) {
                if (response.data.status === "done") {
                    toast(response.data.message);
                    setTimeout(() => {
                        navigate('/cart');
                    }, 1000);
                } else {
                    toast.error(response.data.message || "Error adding item to cart.");
                }
            })
            .catch(function (error) {
                console.log(error);
                toast("error");
            });
    };



    return (
        <>
            <ToastContainer />
            <div className="aaiouter">
                <div className="container">
                    <div className="aaiinner">
                        <div className="items aai">
                            <div className="item_img">
                                <img src={`${process.env.REACT_APP_API}/images/${mainImage}`} alt="Product" onClick={() => setMainImage(originalImage)}
                                    style={{ cursor: mainImage !== originalImage ? "pointer" : "default" }} />
                                <Swiper
                                    modules={[Autoplay, Navigation]}
                                    loop={true}
                                    autoplay={{ delay: 2000 }}
                                    slidesPerView={3}
                                    spaceBetween={10}
                                    className='custom_swiper'
                                >
                                    <SwiperSlide><li><img src={`${process.env.REACT_APP_API}/images/${data1.subimg1}`} alt="Related Product 1" onClick={() => setMainImage(data1.subimg1)}
                                        style={{ cursor: "pointer" }} /></li></SwiperSlide>
                                    <SwiperSlide><li><img src={`${process.env.REACT_APP_API}/images/${data1.subimg2}`} alt="Related Product 2" onClick={() => setMainImage(data1.subimg2)}
                                        style={{ cursor: "pointer" }} /></li></SwiperSlide>
                                    <SwiperSlide><li><img src={`${process.env.REACT_APP_API}/images/${data1.subimg3}`} alt="Related Product 3" onClick={() => setMainImage(data1.subimg3)}
                                        style={{ cursor: "pointer" }} /></li></SwiperSlide>
                                </Swiper>
                            </div>
                            <div className="item_disc">
                                <h1>{data1.name}</h1>
                                <div className='style'>Style No SG221580</div>
                                <span className='price'>M.R.P ₹ {data1.price}</span>
                                <div className='txt'>Inclusive of all taxes</div>

                                <div className="color-selector">
                                    <label>Select Color:</label>
                                    <div className="color-options">
                                        {colors.length > 0 ? (
                                            colors.map((color, index) => (
                                                <button
                                                    key={index}
                                                    className={`color-btn ${selectedColor === color ? "selected" : ""}`}
                                                    onClick={() => handleColorChange(color)}
                                                    style={{
                                                        backgroundColor: typeof color === 'string' ? color.toLowerCase() : '#FFF',
                                                        border: selectedColor === color ? "2px solid black" : "1px solid #ccc",
                                                        borderRadius: "50%",
                                                        width: "20px",
                                                        height: "20px",
                                                        margin: "5px",
                                                        cursor: "pointer",
                                                    }}
                                                ></button>
                                            ))
                                        ) : (
                                            <span>No color variations available</span>
                                        )}

                                    </div>
                                </div>
                                <hr color='#EEEEEE' />

                                <div className="size-selector">
                                    <label>Select Size:</label>
                                    <div className="size-options">
                                        {sizes1.map((size) => (
                                            <button
                                                key={size}
                                                className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <hr color='#EEEEEE' />

                                <div className="quantity-container">
                                    <label>Quantity :</label>
                                    <div className="quantity-selector">
                                        <button className="qty-btn" onClick={decreaseQuantity}>−</button>
                                        <span className="qty-value">{quantity}</span>
                                        <button className="qty-btn" onClick={increaseQuantity}>+</button>
                                    </div>
                                </div>
                                <hr color='#EEEEEE' />

                                <div className="button-group">
                                    <button className="btn add-to-cart" data_id={data1._id} onClick={addcart}>ADD TO CART</button>
                                    <button className="btn buy-now">BUY NOW</button>
                                </div>

                                <div className="purchase-protection">
                                    <div className="protection-item">
                                        <span className="icon">%</span>
                                        <span>100% Purchase Protection</span>
                                    </div>
                                    <div className="protection-item">
                                        <span className="icon">⏳</span>
                                        <span>7 Days Easy Return</span>
                                    </div>
                                    <div className="protection-item">
                                        <span className="icon">📦</span>
                                        <span>Free Shipping</span>
                                    </div>
                                    <div className="protection-item">
                                        <span className="icon">⭐</span>
                                        <span>Assured Quality</span>
                                    </div>
                                </div>

                                <div className="accordion">
                                    {sections.map((section, index) => (
                                        <div key={index} className="accordion-item">
                                            <button className="accordion-header" onClick={() => toggleAccordion(index)}>
                                                {section.title}
                                                <span className={`icon ${openIndex === index ? "open" : ""}`}>+</span>
                                            </button>
                                            <div className={`accordion-content ${openIndex === index ? "show" : ""}`}>
                                                {section.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product_inner;