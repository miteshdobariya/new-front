// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';

// const Address = () => {
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   const email = localStorage.getItem("email");

//   useEffect(() => {
//     // Get saved addresses
//     axios.get(`${process.env.REACT_APP_API}/address/${email}`).then((res) => {
//       if (res.data.status === 'done') {
//         setAddresses(res.data.data);
//         setSelectedAddressId(res.data.data[0]?._id);
//       }
//     }).catch(() => toast.error("Failed to load addresses"));

//     // Get cart
//     axios.get(`${process.env.REACT_APP_API}/cartget/${email}`).then((res) => {
//       if (res.data.status === 'done') {
//         setCart(res.data.data);
//       }
//     }).catch(() => toast.error("Failed to load cart"));
//   }, [email]);

//   const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
//   const discount = subtotal * 0.1;
//   const tax = (subtotal - discount) * 0.13;
//   const total = subtotal - discount + tax;

//   const placeOrder = async () => {
//     if (!selectedAddressId) return toast.warn("Select an address first");

//     const confirm = window.confirm("Are you sure you want to place the order?");
//     if (!confirm) return;

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API}/final`, {
//         data: cart,
//         email,
//         addressId: selectedAddressId,
//         paymentMode: "COD", // for now
//       });

//       if (response.data.status === "done") {
//         toast.success("Order placed successfully");
//         navigate("/");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Order failed");
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <ToastContainer />
//       <div className="checkout-content">
//         <div className="address-section">
//           <h2>Delivery Address</h2>
//           {addresses.map(addr => (
//             <div key={addr._id}>
//               <input
//                 type="radio"
//                 checked={selectedAddressId === addr._id}
//                 onChange={() => setSelectedAddressId(addr._id)}
//               />
//               <label>
//                 <strong>{addr.name}</strong>, {addr.address}, {addr.city}, {addr.pincode}, {addr.mobile}
//               </label>
//             </div>
//           ))}
//           <button onClick={() => navigate("/add-address")}>Add New Address</button>
//         </div>

//         <div className="order-summary">
//           <h2>Order Summary</h2>
//           {cart.map(item => (
//             <div key={item._id} className="summary-item">
//                 <div className="image"> <img
//                                         src={`${process.env.REACT_APP_API}/images/${item.img}`}
//                                         alt={item.name}
//                                         className="cart-item-image"
//                                     /></div>
//               <p>{item.name} × {item.qty}</p>
//               <span>₹{item.price * item.qty}</span>
//             </div>
//           ))}
//           <hr />
//           <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
//           <p>Discount: -₹{discount.toFixed(2)}</p>
//           <p>Tax: ₹{tax.toFixed(2)}</p>
//           <h3>Total: ₹{total.toFixed(2)}</h3>
//           <button onClick={placeOrder}>Place Order (COD)</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Address;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [cart, setCart] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    mobile: ''
  });

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    // axios.get(`${process.env.REACT_APP_API}/address/${email}`).then((res) => {
    //   if (res.data.status === 'done') {
    //     setAddresses(res.data.data);
    //     setSelectedAddressId(res.data.data[0]?._id);
    //   }
    // });

    axios.get(`${process.env.REACT_APP_API}/cartget/${email}`).then((res) => {
      if (res.data.status === 'done') {
        setCart(res.data.data);
      }
    });
  }, [email]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = subtotal * 0.1;
  const tax = (subtotal - discount) * 0.13;
  const total = subtotal - discount + tax;

  const placeOrder = async () => {
    if (!selectedAddressId) return toast.warn("Select an address");

    const confirm = window.confirm("Place order with this address?");
    if (!confirm) return;

    // try {
    //   const res = await axios.post('${process.env.REACT_APP_API}/final', {
    //     data: cart,
    //     email,
    //     addressId: selectedAddressId,
    //     paymentMode: "COD"
    //   });

    //   if (res.data.status === "done") {
    //     toast.success("Order placed!");
    //     navigate("/");
    //   }
    // } catch {
    //   toast.error("Order failed");
    // }
  };

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/address`, {
        ...newAddress,
        email
      });

      if (res.data.status === "done") {
        setAddresses([...addresses, res.data.data]);
        setSelectedAddressId(res.data.data._id);
        toast.success("Address added!");
        setNewAddress({
          name: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          mobile: ''
        });
      }
    } catch {
      toast.error("Could not add address");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="checkout-content">
        {/* Left side: Address and form */}
        <div className="left-section">
          <h2>Delivery</h2>
          {addresses.map((addr) => (
            <label className="address-option" key={addr._id}>
              <input
                type="radio"
                name="address"
                checked={selectedAddressId === addr._id}
                onChange={() => setSelectedAddressId(addr._id)}
              />
              <div>
                <strong>{addr.name}</strong>, {addr.address}, {addr.city}, {addr.pincode}, {addr.mobile}
              </div>
            </label>
          ))}

          <h3>Add New Address</h3>
          <div className="address-form">
            <input name="name" value={newAddress.name} onChange={handleInputChange} placeholder="Name" />
            <input name="address" value={newAddress.address} onChange={handleInputChange} placeholder="Full Address" />
            <input name="city" value={newAddress.city} onChange={handleInputChange} placeholder="City" />
            <input name="state" value={newAddress.state} onChange={handleInputChange} placeholder="State" />
            <input name="pincode" value={newAddress.pincode} onChange={handleInputChange} placeholder="PIN Code" />
            <input name="mobile" value={newAddress.mobile} onChange={handleInputChange} placeholder="Phone Number" />
            <button onClick={handleAddAddress}>Save Address</button>
          </div>
        </div>

        {/* Right side: Order summary */}
        <div className="right-section">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item._id} className="summary-item">
              <img /*src={`${process.env.REACT_APP_API}/images/${item.img}`}*/ src={item.img} alt={item.name} />
              <div>
                <p>{item.name} × {item.qty}</p>
                <span>₹{item.price * item.qty}</span>
              </div>
            </div>
          ))}
          <hr />
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Discount: -₹{discount.toFixed(2)}</p>
          <p>Tax: ₹{tax.toFixed(2)}</p>
          <h3>Total: ₹{total.toFixed(2)}</h3>
          <button onClick={placeOrder}>Place Order (COD)</button>
        </div>
      </div>
    </div>
  );
};

export default Address;
