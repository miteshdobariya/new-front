






import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Yourorder = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newSize, setNewSize] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            const email = localStorage.getItem("email");
            if (!email) {
                console.error("No user found");
                return;
            }
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}user-orders/${email}`);
                setOrders(res.data);
            } catch (err) {
                console.error('Failed to fetch orders', err);
            }
        };
        fetchOrders();
    }, []);

    const handleExchange = (orderId, productId) => {
        setSelectedOrder(orderId);
        setSelectedProduct(productId);
    };

    const submitExchange = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API}/exchange-request`, {
                orderId: selectedOrder,
                productId: selectedProduct,
                newSize,
            });
            alert("Exchange request submitted");
            setSelectedOrder(null);
            setSelectedProduct(null);
            setNewSize("");
        } catch (err) {
            console.error("Exchange failed", err);
        }
    };

    return (
        <div className="order">
            <div className="order-main">
                <div className="container">
                    <div className="order-title">
                        <h2>My Orders</h2>
                    </div>
                    <div className="order-inner">
                        {orders.map((order, i) => (
                            <div key={i} className="order-box">
                                <p>{order._id}</p>
                                {order.items.map((item, idx) => (
                                    <div className="order-row-main">
                                        <div key={idx} className="order-row">
                                            <div className="product-detail">
                                                <div className="image">
                                                    <img src={`${process.env.REACT_APP_API}/images/${item.img}`} alt="Product" />
                                                </div>
                                                <div className="name">
                                                    <h3>{item.name}</h3>
                                                    <div className="small-detail">
                                                        <h4>size: {item.size}</h4>
                                                        <h4>qty: {item.qty}</h4>
                                                        <h4>Rs: {item.price}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="payment-method">
                                                <h4>Payment: <span>{order.paymentmethod}</span></h4>
                                                <h4>Order date: <span>{new Date(order.orderDate).toLocaleDateString()}</span></h4>
                                                <h4>Status: <span>{item.status}</span></h4>

                                            </div>
                                            {/* <div className="status">
                                                <div>Status: {item.status}</div>
                                                {item.status === "Delivered" && (
                                                    <button onClick={() => handleExchange(order._id, item.productid)}>Exchange</button>
                                                )}

                                               
                                            </div> */}
                                        </div>

                                        {item.status === "Completed" && (new Date() - new Date(order.orderDate)) <= 24 * 60 * 60 * 1000 && (
                                            <div className="exchange-line">
                                                <a onClick={() => handleExchange(order._id, item.productid)}>You want to exchange your this product?</a>
                                                {selectedOrder === order._id && selectedProduct === item.productid && (

                                                    <div className="model" style={{ marginTop: "10px" }}>
                                                        <div className="model-main">
                                                            <h3>Select New Size</h3>
                                                            <select value={newSize} onChange={(e) => setNewSize(e.target.value)}>
                                                                <option value="">Select size</option>
                                                                <option>S</option>
                                                                <option>M</option>
                                                                <option>L</option>
                                                                <option>XL</option>
                                                            </select>
                                                            <div className="modal-actions">
                                                                <button onClick={submitExchange} className="confirm-btn">Confirm Exchange</button>
                                                                <button onClick={() => setSelectedOrder(null)} className="cancel-btn">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )}
                                            </div>
                                        )}

                                    </div>
                                ))}


                            </div>




                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Yourorder;


