

// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';
// import { useContext } from 'react';
// import { CartContext } from './CartContext';


// const Cart = () => {

//     const payment1=useRef();
//     const [data, setData] = useState([]);
//     const navigate=useNavigate();
//       const name = useRef()




//     const payment = async (e) => {
//         navigate('/address');
//         e.preventDefault();
//         const selectedPayment = document.querySelector('input[name="payment"]:checked')?.value;

//         if (!selectedPayment) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Select a Payment Method",
//                 text: "Please choose Cash on Delivery or Online Payment before placing your order.",
//             });
//             return;
//         }

//         if (selectedPayment === "cod") {
//             alert("Order placed with Cash on Delivery");
//             axios.post('${process.env.REACT_APP_API}/final', {
//                 data,  // array of products
//                 paymentMode: "COD",
//               } )
//             .then(function (response) {
//                 if (response.data.status == "done") {
//                     toast.success("Success Register");

//                 }
//             })
//             .catch(function (error) {

//                 toast("error");
//             })

//             console.log(data);
//             // navigate('/');
//         } else {
//             alert("Proceeding with Online Payment");

//             // Dynamically load Razorpay script
//             const script = document.createElement('script');
//             script.src = "https://checkout.razorpay.com/v1/checkout.js";
//             script.async = true;

//             script.onload = async () => {
//                 try {
//                     const response = await axios.post("${process.env.REACT_APP_API}/order", {
//                         amount: name.current.value,
//                     });

//                     const options = {
//                         key: "rzp_test_II6PHCN89mTaTQ",
//                         amount: name.current.value * 100,
//                         currency: "INR",
//                         order_id: response.data.orderid,
//                         handler: function (res) {
//                             alert("Payment successful!");
//                             navigate('/');
//                         },
//                         theme: {
//                             color: "#3399cc"
//                         }
//                     };

//                     const rzp = new window.Razorpay(options);
//                     rzp.open();

//                     rzp.on("payment.failed", function (res) {
//                         alert("Payment failed");
//                     });

//                 } catch (err) {
//                     console.error("Payment error:", err);
//                     toast.error("Something went wrong with payment.");
//                 }
//             };

//             script.onerror = () => {
//                 toast.error("Failed to load Razorpay. Check your internet connection.");
//             };

//             document.body.appendChild(script);
//         }
//     };



//     useEffect(() => {

//         const email = localStorage.getItem("email");
//         axios.get(`${process.env.REACT_APP_API}/cartget/${email}`)
//             .then((response) => {
//                 if (response.data.status === "done") {
//                     setData(response.data.data);
//                 } else {
//                     toast.error("Error fetching cart data");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Fetch error:", error);
//                 toast.error("Failed to load cart.");
//             });
//     }, []);



//     const deleteproduct=(e)=>{
//         e.preventDefault();

//         var id=e.currentTarget.getAttribute("data_id");
//         // alert(id);
//         axios.delete(`${process.env.REACT_APP_API}/deletecart/${id}`)
//         .then(function (response) {
//             if(response.data.status=="done"){
//                 console.log("done");
//                 setData((prevData) => prevData.filter((item) => item._id !== id));
//             }


//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })

//     }




//     const FREE_SHIPPING_THRESHOLD = 50000;
//     const SHIPPING_CHARGE = 100;

//     const calculateSubtotal = () => {
//         return data.reduce((total, item) => total + item.price * item.qty, 0);
//     };

//     const calculateDiscount = (subtotal) => subtotal * 0.1;
//     const calculateTax = (subtotal) => subtotal * 0.13;

//     const subtotal = calculateSubtotal();
//     const discount = calculateDiscount(subtotal);
//     const tax = calculateTax(subtotal - discount);
//     const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
//     const total = subtotal - discount + tax + shipping;
//     const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
//     const progressPercentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

//     const handleQuantityChange = (productid, delta) => {
//         setData(prev =>
//             prev.map(item =>
//                 item.productid === productid
//                     ? { ...item, qty: Math.max(1, item.qty + delta) }
//                     : item
//             )
//         );

//         // Optional: send PATCH to backend here to persist change
//     };

//     const handleRemoveItem = (productid) => {
//         setData(prev => prev.filter(item => item.productid !== productid));

//         // Optional: send DELETE to backend here
//     };
//     const keepshopping = () =>{
//         navigate('/ourcatagory')
//     }

//     return (
//         <>
//             <div className="cart-outer">
//                 <div className="container">
//                     <div className="cart-inner">
//                         <div className="cart-items">
//                             <h2>Your Cart</h2>
//                             <span>{data.length} item(s) ships at checkout</span>

//                             <div className="free-shipping-bar">
//                                 <p>
//                                     {remainingForFreeShipping > 0 ? (
//                                         <>You're ₹{remainingForFreeShipping.toLocaleString()} away from FREE SHIPPING!</>
//                                     ) : (
//                                         "Congratulations! You have FREE SHIPPING!"
//                                     )}
//                                 </p>

//                                 <div className="progress-bar">
//                                     <div
//                                         className="progress"
//                                         style={{ width: `${progressPercentage}%` }}
//                                     ></div>
//                                 </div>

//                                 <button className="keep-shopping-button" onClick={keepshopping}>Keep Shopping</button>
//                             </div>

//                             <hr color='#CFCFCF' className='line' />

//                             {data.map((item) => (
//                                 <div key={item.productid} className="cart-item">
//                                     <img
//                                         src={`${process.env.REACT_APP_API}/images/${item.img}`}
//                                         alt={item.name}
//                                         className="cart-item-image"
//                                     />
//                                     <div className="cart-item-details">
//                                         <h3>{item.name}</h3>
//                                         <p>Size: {item.size}</p>
//                                         <span>M.R.P ₹ {item.price.toLocaleString()}</span>
//                                         <p>Inclusive of all taxes</p>
//                                     </div>
//                                     <div className="cart-item-quantity">
//                                         <button onClick={() => handleQuantityChange(item.productid, -1)}>-</button>
//                                         <span>{item.qty}</span>
//                                         <button onClick={() => handleQuantityChange(item.productid, 1)}>+</button>
//                                     </div>
//                                     <button className="remove-item" onClick={deleteproduct} data_id={item._id}>×</button>
//                                     {/* onClick={() => handleRemoveItem(item.productid)} */}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="cart-summary">
//                             <h2>Summary</h2>
//                             <p>Subtotal ({data.length} Items):<strong> ₹ {subtotal.toLocaleString()}</strong></p>
//                             <p>Discount (10%):<strong> - ₹ {discount.toLocaleString()}</strong></p>
//                             <p>Shipping:<strong> ₹ {shipping.toLocaleString()}</strong></p>
//                             <p>Tax (13%):<strong> ₹ {tax.toLocaleString()}</strong></p>
//                             <h3>Total:<strong> ₹ {total.toLocaleString()}</strong></h3>
//                             <form onSubmit={payment} className='payment-form'>
//                                <div className='payment'>
//                                <input type='radio' name='payment' value='cod' ref={payment1} /> Cash on Delivery
//                                </div>
//                                 <div className='payment'>
//                                 <input type='radio' name='payment' value='online' /> Online Payment
//                                 </div>
//                                 <input type="text" ref={name} />
//                                 <button className="checkout-button">Order Checkout</button>
//                             </form>
//                             {/* <button className="checkout-button">Order Checkout</button> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </>
//     );
// };

// export default Cart;




import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const Cart = () => {
    const payment1 = useRef();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const name = useRef();

    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [mobile, setMobile] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [fullname, setFullname] = useState("");
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [step, setStep] = useState(1); // 1 = Address, 2 = Payment


    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);



    const payment = async () => {
        // e.preventDefault();
        console.log("Payment started");
        const selectedPayment = document.querySelector('input[name="payment"]:checked')?.value;
        var email = localStorage.getItem("email");
        if (!selectedPayment) {
            Swal.fire({
                icon: "warning",
                title: "Select a Payment Method",
                text: "Please choose a payment method before proceeding.",
            });
            return;
        }


        const finalData = {
            email,
            address,
            city,
            state,
            pincode,
            mobile,
            paymentMode: selectedPayment.toUpperCase(),
            total,
            couponCode,
            items: data.map(item => ({
                productid: item.productid,
                name: item.name,
                img: item.img,
                price: item.price,
                qty: item.qty,
                size: item.size,
                color: item.color, // Added color field
                subtotal: item.price * item.qty,
            }))
        };

        if (selectedPayment === "cod") {
            alert("Order placed with Cash on Delivery");
            try {
                const response = await axios.post(`${process.env.REACT_APP_API}/final`, { data: finalData });
                if (response.data.status === "done") {
                    toast.success("Order placed successfully");
                    // ✅ Clear cart items
                    await axios.delete(`${process.env.REACT_APP_API}/clearcart/${email}`);
                    setShowModal(false);
                    navigate('/');
                }
            } catch (error) {
                console.log("Error details:", error.response?.data || error.message);
                toast.error("Something went wrong");
            }
        } else {
            alert("Proceeding with Online Payment");

            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;

            script.onload = async () => {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_API}/order`, {
                        amount: total,
                    });

                    const options = {
                        key: "rzp_test_II6PHCN89mTaTQ",
                        amount: total * 100,
                        currency: "INR",
                        order_id: response.data.orderid,
                        handler: async function () {
                            alert("Payment successful!");

                            try {
                                const res = await axios.post(`${process.env.REACT_APP_API}/final`, { data: finalData });
                                if (res.data.status === "done") {
                                    toast.success("Order placed successfully");
                                    // ✅ Clear cart items
                                    await axios.delete(`${process.env.REACT_APP_API}/clearcart/${email}`);
                                    setShowModal(false);
                                    navigate('/');
                                }
                            } catch (error) {
                                toast.error("Something went wrong");
                            }
                        },
                        theme: {
                            color: "#3399cc"
                        }
                    };

                    const rzp = new window.Razorpay(options);
                    rzp.open();

                    rzp.on("payment.failed", function () {
                        alert("Payment failed");
                    });

                } catch (err) {
                    console.error("Payment error:", err);
                    toast.error("Something went wrong with payment.");
                }
            };

            script.onerror = () => {
                toast.error("Failed to load Razorpay");
            };

            document.body.appendChild(script);
        }
    };


    useEffect(() => {
        const email = localStorage.getItem("email");
        axios.get(`${process.env.REACT_APP_API}/cartget/${email}`)
            .then((response) => {
                if (response.data.status === "done") {
                    setData(response.data.data);
                } else {
                    toast.error("Error fetching cart data");
                }
                console.log(fullname, "full name");

            })
            .catch((error) => {
                console.error("Fetch error:", error);
                toast.error("Failed to load cart.");
            });

        axios.get(`${process.env.REACT_APP_API}/getAddress/${email}`)
            .then((res) => {
                if (res.data.status === "success" && res.data.address) {
                    const { username, address, city, state, pincode, mobile } = res.data.address;
                    setFullname(username || "");
                    setAddress(address || "");
                    setCity(city || "");
                    setState(state || "");
                    setPincode(pincode || "");
                    setMobile(mobile || "");
                }
            })
            .catch((err) => {
                console.error("Address fetch error:", err);
                toast.warn("Could not fetch saved address.");
            });

    }, []);


    // -------------------------  Adress get start ------------------




    // ------------------------------- END------------------------------

    const deleteproduct = (e) => {
        e.preventDefault();
        const id = e.currentTarget.getAttribute("data_id");
        axios.delete(`${process.env.REACT_APP_API}/deletecart/${id}`)
            .then(function (response) {
                if (response.data.status === "done") {
                    setData((prevData) => prevData.filter((item) => item._id !== id));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const FREE_SHIPPING_THRESHOLD = 1000;
    const SHIPPING_CHARGE = 100;

    const [couponCode, setCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const applyCoupon = async () => {
        alert(couponCode)
        if (!couponCode.trim()) {
            toast.warn("Enter a coupon code");
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/validate-coupon`, { coupancode: couponCode });
            if (res.data.status === "success") {
                setCouponDiscount(res.data.discount);
                toast.success(`Coupon applied! ${res.data.discount}% off`);
            } else {
                toast.error("Invalid coupon code");
            }
        } catch (err) {
            toast.error("Error validating coupon");
        }
    };



    const calculateSubtotal = () => {
        return data.reduce((total, item) => total + item.price * item.qty, 0);
    };
    const calculateDiscount = (subtotal) => subtotal * (couponDiscount / 100);


    // const calculateDiscount = (subtotal) => subtotal * 0.1;
    // const calculateTax = (subtotal) => subtotal * 0.13;

    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    // const discount = calculateDiscount(subtotal);
    // const tax = calculateTax(subtotal - discount);
    const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
    // const total = subtotal - discount + shipping;
    const total = subtotal - discount + shipping;

    const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const progressPercentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

    const handleQuantityChange = (productid, delta) => {
        setData(prev =>
            prev.map(item =>
                item.productid === productid
                    ? { ...item, qty: Math.max(1, item.qty + delta) }
                    : item
            )
        );
    };

    const keepshopping = () => {
        navigate('/ourcatagory');
    };

    // const addressform = async () => {
    //     // e.preventDefault();
    //     if (!fullname || !address || !city || !state || !pincode || !mobile) {
    //         toast.warn("Please fill in all fields");
    //         return;
    //     }

    //     const email = localStorage.getItem("email");
    //     const addressobj = {
    //         fullname,
    //         address,
    //         city,
    //         state,
    //         pincode,
    //         mobile,
    //         email,
    //     };

    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_API}/saveAddress`, addressobj);
    //         console.log("Address Save Response:", response.data); // ✅ Debug line

    //         if (response.data.status === "success") {
    //             toast.success("Address saved successfully");
    //             setStep(2);
    //         } else {
    //             toast.error("Address save failed: " + response.data.message);
    //         }
    //     } catch (error) {
    //         console.error("Error saving address:", error); // ✅ Debug line
    //         toast.error("Something went wrong while saving address.");
    //     }
    // };


const addressform = async () => {
  if (!fullname || !address || !city || !state || !pincode || !mobile) {
    toast.warn("Please fill in all fields");
    return false;  // return false if validation fails
  }

  const email = localStorage.getItem("email");
  const addressobj = {
    fullname,
    address,
    city,
    state,
    pincode,
    mobile,
    email,
  };

  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/saveAddress`, addressobj);
    console.log("Address Save Response:", response.data);

    if (response.data.status === "success") {
      toast.success("Address saved successfully");
      setStep(2);
      return true;  // Return true on success
    } else {
      toast.error("Address save failed: " + response.data.message);
      return false;
    }
  } catch (error) {
    console.error("Error saving address:", error);
    toast.error("Something went wrong while saving address.");
    return false;
  }
};



    return (
        <>
            <ToastContainer />
            <div className="cart">
                <div className="cart-outer">
                    <div className="container">
                        <div className="cart-inner">
                            <div className="cart-items">
                                <h2>Your Cart</h2>
                                <span>{data.length} item(s) ships at checkout</span>

                                <div className="free-shipping-bar">
                                    <p>
                                        {remainingForFreeShipping > 0 ? (
                                            <>You're ₹{remainingForFreeShipping.toLocaleString()} away from FREE SHIPPING!</>
                                        ) : (
                                            "Congratulations! You have FREE SHIPPING!"
                                        )}
                                    </p>

                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                                    </div>

                                    <button className="keep-shopping-button" onClick={keepshopping}>Keep Shopping</button>
                                </div>

                                <hr color='#CFCFCF' className='line' />

                                {data.map((item) => (
                                    <div key={item.productid} className="cart-item">
                                        <img
                                           /* src={`${process.env.REACT_APP_API}/images/${item.img}`}*/ src={item.img}
                                            alt={item.name}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-details">
                                            <h3>{item.name}</h3>
                                            <p>Size: {item.size}</p>
                                            <p>Color: {item.color}</p> {/* Display the selected color */}
                                            <span>M.R.P ₹ {item.price.toLocaleString()}</span>
                                            <p>Inclusive of all taxes</p>
                                        </div>
                                        <div className="cart-item-quantity">
                                            <button onClick={() => handleQuantityChange(item.productid, -1)}>-</button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => handleQuantityChange(item.productid, 1)}>+</button>
                                        </div>
                                        <button className="remove-item" onClick={deleteproduct} data_id={item._id}>×</button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <h2>Summary</h2>
                                <p>Subtotal ({data.length} Items):<strong> ₹ {subtotal.toLocaleString()}</strong></p>
                                {/* <p>Discount (10%):<strong> - ₹ {discount.toLocaleString()}</strong></p> */}

                                <div className="coupon-section">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter Coupon Code"
                                    />
                                    <button onClick={applyCoupon}>Apply</button>
                                </div>
                                <p>
                                    Coupon Discount ({couponDiscount}%): <strong>- ₹ {discount.toLocaleString()}</strong>
                                </p>

                                <p>Shipping:<strong> ₹ {shipping.toLocaleString()}</strong></p>
                                {/*  <p>Tax (13%):<strong> ₹ {tax.toLocaleString()}</strong></p>*/}
                                <h3>Total:<strong> ₹ {total.toLocaleString()}</strong></h3>
                                <button className="checkout-button" onClick={() => setShowModal(true)}>
                                    Order Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            



            {showModal && (
                <div className="modal-overlay">
                    <div className="modal combined-modal">

                        {/* Close Icon */}
                        <button
                            className="close-modal-icon"
                            onClick={() => setShowModal(false)}
                            aria-label="Close modal"
                        >
                            &times;
                        </button>

                        <h2>Checkout</h2>

                        {/* Scrollable Content */}
                        <div className="modal-content">

                            {/* Address Section */}
                            <div className="section">
                                <h3 className='section1'>Shipping Address</h3>
                                <form className="address-form">
                                    <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    <div className="two-column">
                                        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                                        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                                    </div>
                                    <div className="two-column">
                                        <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                        <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                    </div>
                                </form>
                            </div>

                            {/* Payment Section */}
                            <div className="section">
                                <h3>Payment Method</h3>
                                <div className="payment-methods">
                                    <label><input type="radio" name="payment" value="cod" ref={payment1} /> Cash on Delivery</label>
                                    <label><input type="radio" name="payment" value="online" /> Online Payment</label>
                                </div>
                                {/* <input type="text" placeholder="Enter Amount" ref={name} className="amount-input" /> */}
                            </div>

                            {/* Order Summary */}
                            <div className="section order-summary">
                                <h3>Order Summary</h3>

                                {/* Product List */}
                                {data.map((item, idx) => (
                                    <div key={idx} className="order-item">
                                        <img /*src={`${process.env.REACT_APP_API}/images/${item.img}`}*/ src={item.img} alt={item.name} className="item-image" />
                                        <div className="item-details">
                                            <div className="item-name">{item.name}</div>
                                            <div className="item-variant">{item.color} / {item.size}</div>
                                        </div>
                                        <div className="item-price">₹{item.price.toLocaleString()}</div>
                                    </div>
                                ))}

                                {/* Pricing Summary */}
                                <div className="pricing-summary">
                                    <div className="line"><span>Subtotal · {data.length} items</span><span>₹{subtotal.toLocaleString()}</span></div>
                                    <div className="line"><span>Shipping</span><span className="free">FREE</span></div>
                                    <div className="total">
                                        <span>Total</span>
                                        <span className="amount">INR ₹{total.toLocaleString()}</span>
                                    </div>
                                    {/* Optional Tax Info */}
                                    {/* <div className="tax-note">Including ₹{tax.toLocaleString()} in taxes</div> */}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="modal-buttons">
                            <button
                                onClick={async () => {
                                    const addressSaved = await addressform();
                                    if (addressSaved) {
                                       await payment();
                                    }
                                }}
                                className="place-order-button"
                            >Place Order</button>
                            <button onClick={() => setShowModal(false)} className="cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </>
    );
};

export default Cart;








