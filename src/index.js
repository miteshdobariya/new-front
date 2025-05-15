import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './Header';
import './assets/css/main.css';
import Main from './Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ourproducts from './Ourproducts';
import Ourcatagory from './Ourcatagory';
import Cart from './Cart';
import Footer from './Footer';
import Login from './Login';
import New_Account from './New_Account';
import Forget_Password from './Forget_Password';
import Enter_OTP from './Enter_OTP';
import New_Password from './New_Password';
import Product_inner from './Product_inner';
import AuthProvider from './AuthContext';
import Productinsert from './Productinsert';
import Categoryinsert from './Categoryinsert';
import Admin from './Admin';
import { CartProvider } from './CartContext';
import Address from './Address';
import Coupaninsert from './Coupaninsert';
import Yourorder from './Yourorder';
import Adminallorder from './Adminallorder';
import AllCategory from './AllCategory';
import AllProducts from './AllProducts';
import UpdateProduct from './UpdateProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
  <AuthProvider>
    <CartProvider>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:catname" element={<Ourproducts />} />
        <Route path="/productinner/:id" element={<Product_inner />} />
        <Route path="/ourcatagory" element={<Ourcatagory />} />
        <Route path="/addcat" element={<Categoryinsert />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<New_Account />} />
        <Route path="/forgot" element={<Forget_Password />} />
        <Route path="/otp" element={<Enter_OTP />} />
        <Route path="/forgot" element={<New_Password />} />
        <Route path="/addproduct" element={<Productinsert/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/cart/:id" element={<Cart/>} />
        <Route path="/address" element={<Address/>} />
        <Route path="/coupan" element={<Coupaninsert/>} />
        <Route path="/yourorder" element={<Yourorder/>} />
        <Route path="/adminallorder" element={<Adminallorder/>} />
        <Route path="/allcategory" element={<AllCategory/>} />
        <Route path="/allproducts" element={<AllProducts/>} />
        <Route path="/updateproduct/:id" element={<UpdateProduct/>} />
      </Routes>
      <Footer />

    </BrowserRouter>
    </CartProvider>
  </AuthProvider>
  </>

);


