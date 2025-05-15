import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("loginnn"));

    // 🆕 New: Store individual product details for use across pages
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        // Update total when cart changes
        // const newTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
        // setTotal(newTotal);
        console.log("Updated cart in context:", cart);
    }, [cart]);

    // ✅ Add product to cart
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
        // console.log("Stored in context cart****:", cart);
    };

    // ✅ Store selected product info (image, name, price, etc.)
    const storeProductDetails = (product) => {
        setProductDetails(product);
        console.log("Stored in context:", product);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                total,
                setTotal,
                isLoggedIn,
                setIsLoggedIn,
                addToCart,
                productDetails,
                storeProductDetails,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
