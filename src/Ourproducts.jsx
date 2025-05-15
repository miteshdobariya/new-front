






import axios from "axios";
import heartback from './assets/Backgroungimg/heartback.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Ourproducts = () => {
    const navigate = useNavigate();
    const [likedItems, setLikedItems] = useState([]);
    const [data, setdata] = useState([]);
    const { catname } = useParams();
    const register = (e) => {
        e.preventDefault();
        var id = e.currentTarget.getAttribute("data-id");
        // alert(id);
        navigate("/productinner/" + id);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/mainfilter/${catname.toLowerCase()}`)
            .then(function (response) {
                setdata(response.data.result); // <-- important fix here
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.result || error.response.data.message);
                } else {
                    toast.error("Something went wrong!");
                }
                console.log(error);
            });
    }, [catname]);

    const toggleLike = (index) => {
        if (likedItems.includes(index)) {
            setLikedItems(likedItems.filter((item) => item !== index));
        } else {
            setLikedItems([...likedItems, index]);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="product-main">
                <div className="container">
                    <div className="product-inner">
                        <div className="title-section">
                            <div className="product-title">
                                <h3>Our products</h3>
                                <h4>Weaving Elegance, One Thread at a Time.</h4>
                            </div>
                            <div className="product-filter">
                                <select>
                                    <option value="" defaultValue>Filter</option>
                                    <option value="">Price</option>
                                </select>
                            </div>
                        </div>
                        <div className="detail-section">
                        {data.map((i, index) => (
                                <div className="cln" key={i._id} onClick={register}  data-id={i._id}>
                                    <div className="product-img">
                                        <img src={`${process.env.REACT_APP_API}/images/${i.img}`} alt="products" />
                                        <div className="heart" onClick={() => toggleLike(index)}>
                                            {likedItems.includes(index) ? (
                                                <FaHeart color="#C2A67D" size={22} />
                                            ) : (
                                                <CiHeart size={22} />
                                            )}
                                        </div>
                                        <div className="back">
                                            {/* <img src="../assets/Backgroungimg/heartback.png" alt="back-like" /> */}
                                            <img src={heartback} alt="back-like" />

                                        </div>
                                    </div>
                                    <div className="product-detail">
                                        <div className="name">
                                            <h5>{i.name}</h5>
                                        </div>
                                        <div className="price">
                                            <h5>₹ {i.price.toLocaleString()}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ourproducts;
