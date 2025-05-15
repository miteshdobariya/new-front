import React, { useEffect, useState } from "react";
import axios from "axios";

const Adminallorder = () => {
  const [orders, setOrders] = useState([]);
  const [zoomImg, setZoomImg] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get(`${process.env.REACT_APP_API}/admin-all-orders`)
      .then((res) => {
        if (res.data.status === "success") {
          setOrders(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      });
  };

  const updateOrderStatus = (orderId, itemId, status) => {
    axios.patch(`${process.env.REACT_APP_API}/update-order-status`, { orderId, itemId, status })
      .then(() => {
        setOrders(prevOrders => prevOrders.map(order => 
          order._id === orderId ? {
            ...order,
            items: order.items.map(item => 
              item._id === itemId ? { ...item, status } : item
            )
          } : order
        ));
      })
      .catch(err => console.error("Failed to update order status:", err));
  };

  return (
    <div className="admin-orders-container">
      <h2>All Orders</h2>

      {orders.map((order, index) => (
        <div key={index} className="order-info-section">
          <h4>Order #{index + 1}</h4>
          <p><strong>Order-Data:</strong> {order.orderDate}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.pincode}</p>
          <p><strong>Mobile:</strong> {order.mobile}</p>
          <p><strong>Payment:</strong> {order.paymentmethod}</p>
          <p><strong>Total:</strong> ₹{order.total}</p>

          <table className="orders-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Size</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td><img src={`${process.env.REACT_APP_API}/images/${item.img}`} alt={item.name} className="item-image" onClick={() => setZoomImg(`${process.env.REACT_APP_API}/images/${item.img}`)} style={{ cursor: "pointer" }} /></td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>₹{item.price}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.subtotal}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={() => updateOrderStatus(order._id, item._id, "Dispatched")}>Dispatch</button>
                    <button onClick={() => updateOrderStatus(order._id, item._id, "Completed")}>Complete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {zoomImg && (
        <div className="zoom-overlay" onClick={() => setZoomImg(null)}>
          <img src={zoomImg} alt="Zoomed" className="zoom-image" />
        </div>
      )}
    </div>
  );
};

export default Adminallorder;








// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Adminallorder = () => {
//   const [orders, setOrders] = useState([]);
//   const [zoomImg, setZoomImg] = useState(null);

//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API}/admin-all-orders`)
//       .then((res) => {
//         if (res.data.status === "success") {
//           setOrders(res.data.data);
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to fetch orders:", err);
//       });
//   }, []);

//   return (
//     <div className="admin-orders-container">
//       <h2>All Orders</h2>

//       {orders.map((order, index) => (
//         <div key={index} className="order-info-section">
//           <h4>Order #{index + 1}</h4>
//           <p><strong>Email:</strong> {order.email}</p>
//           <p><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.pincode}</p>
//           <p><strong>Mobile:</strong> {order.mobile}</p>
//           <p><strong>Payment:</strong> {order.paymentmethod}</p>
//           <p><strong>Total:</strong> ₹{order.total}</p>
//           <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
//           <p><strong>Coupon Used:</strong> {order.couponCode || "None"}</p>

//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Product</th>
//                 <th>Size</th>
//                 <th>Price</th>
//                 <th>Qty</th>
//                 <th>Subtotal</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {order.items.map((item, idx) => (
//                 <tr key={idx}>
//                   <td>
//                     <img
//                       src={`${process.env.REACT_APP_API}/images/${item.img}`}
//                       alt={item.name}
//                       className="item-image"
//                       onClick={() => setZoomImg(`${process.env.REACT_APP_API}/images/${item.img}`)}
//                       style={{ cursor: "pointer" }}
//                     />
//                   </td>
//                   <td>{item.name}</td>
//                   <td>{item.size}</td>
//                   <td>₹{item.price}</td>
//                   <td>{item.qty}</td>
//                   <td>₹{item.subtotal}</td>
//                   <td>{item.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}

//       {zoomImg && (
//         <div className="zoom-overlay" onClick={() => setZoomImg(null)}>
//           <img src={zoomImg} alt="Zoomed" className="zoom-image" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Adminallorder;

