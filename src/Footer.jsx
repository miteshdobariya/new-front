import React from 'react'
import { FaCcVisa } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcDiscover } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa";
import logo from './assets/Backgroungimg/logo.png';
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <div className="footer-outer">
                <div className="container">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <h1>THE CLUB OF WHITE</h1>
                    </div>
                    <div className="footer-inner">
                        <div className="rows">
                            <div className="row-title">
                                DESIGNER WEAR
                            </div>
                            <div className="row-data">
                                <li>Salwar Kameez</li>
                                <li>Sarees</li>
                                <li>Lehngas</li>
                                <li>Gawns</li>
                                <li>Kurtis</li>
                                <li>Indowestern Style</li>
                                <li>Celebrity Wear</li>
                                <li>Bridal Wedding Dress</li>
                            </div>
                        </div>
                        <div className="rows">
                            <div className="row-title">
                                ABOUT US
                            </div>
                            <div className="row-data">
                                <li><a href="/">About Us</a></li>
                                <li><a href="/">Contact Us </a></li>
                                <li><a href="/">Blog </a></li>
                                <li><a href="/">Web Stories</a></li>
                                <li><a href="/">Testimonial</a></li>
                                <li><a href="/">Press</a></li>
                                <li><a href="/">Careers</a></li>
                            </div>
                        </div>
                        <div className="rows">
                            <div className="row-title">
                                POLICIES
                            </div>
                            <div className="row-data">
                                <li><a href="/">Terms & Conditions</a></li>
                                <li><a href="/">Shipping</a></li>
                                <li><a href="/">Returns</a></li>
                                <li><a href="/">Privacy Policy</a></li>
                                <li><a href="/">Payment Policy</a></li>
                                <li><a href="/">FAQ's</a></li>
                                <li><a href="/">Customisation Charge</a></li>
                            </div>
                        </div>
                        <div className="rows">
                            <div className="row-title">
                                MY ACCOUNT
                            </div>
                            <div className="row-data">
                                <li><Link to={"/cart"}>Shopping Bag</Link></li>
                                <li><a href="/">Wishlist</a></li>
                                <li><Link to={"/yourorder"}>Order History</Link></li>
                                <li><a href="/">Order Tracking</a></li>
                            </div>
                        </div>
                        <div className="rows">
                            <div className="row-title">
                                SAFE & SECURE PAYMENT
                            </div>
                            <div className="row-data method">
                                <div className='method'>
                                    <li><FaCcVisa /></li>
                                    <li><FaCcPaypal /></li>
                                    <li><FaCcDiscover /></li><br />
                                    <li><FaCcMastercard /></li>
                                    <li><SiPaytm /></li>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Footer;
