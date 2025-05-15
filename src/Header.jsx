// import React, { useContext } from "react";
// import { IoSearchOutline } from "react-icons/io5";
// import { BsCart2 } from "react-icons/bs";
// import { HiOutlineTruck } from "react-icons/hi2";
// import { IoIosHeartEmpty } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";
// import { IoLogOut } from "react-icons/io5";
// import logo from './assets/Backgroungimg/logo1.png';
// const Header = () => {
//     const { isLoggedIn, logout, login } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         logout();
//         localStorage.clear();
//         navigate("/login");
//     };

//     const addproduct = () =>{
//         navigate("/admin")
//     }
//     return (
//         <>
//             <div className="header-main">
//                 <div className="container">
//                     <div className="header-inner">
//                         <div className="cln">
//                             <div className="logo">
//                                 <img src={logo} alt="logo" />
//                             </div>
//                             <div className="title">
//                                 <h2>the club of white</h2>
//                             </div>
//                         </div>
//                         <div className="admin">
//                             {localStorage.getItem("email") === "demo@gmail.com" ? (
//                                 <button onClick={addproduct}>Admin</button>
//                             ) : null}


//                         </div>
//                         <div className="cln">
//                             <div className="icon">
//                                 <IoSearchOutline className="icon1" />
//                             </div>
//                             <div className="icon">
//                             <Link to={"/yourorder"}> <HiOutlineTruck className="icon1" /></Link>
//                             </div>
//                             <div className="icon">
//                                 <IoIosHeartEmpty className="icon1" />
//                             </div>
//                             <div className="icon">
//                                 <Link to={"/cart"}><BsCart2 className="icon1" /></Link>
//                             </div>

                           
                               
//                                 <div className="icon">


//                                     {
//                                         localStorage.getItem("loginnn") &&

//                                         <Link onClick={handleLogout}><IoLogOut className="icon1" /></Link>

//                                     }
//                                     {
//                                         !localStorage.getItem("loginnn") &&

//                                         <Link to={"/login"} ><CgProfile className="icon1" /></Link>

//                                     }


//                                 </div>
                            


//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default Header;












// "use client"

// import { Search, ShoppingCart, Truck, Heart, User } from "lucide-react"
// import { Link, useNavigate } from "react-router-dom";
// import { useState, useContext} from "react";
// import logo from './assets/Backgroungimg/logo1.png';
//  import { AuthContext } from "./AuthContext";
//  import { IoLogOut } from "react-icons/io5";

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen)
//   }
//   const addproduct = () => {
//     navigate("/admin");
//  };
 
//  const handleLogout = () => {
//     logout();
//     localStorage.clear();
//     navigate("/login");
// };


//   return (
//     <header className="header-main">
//       <div className="container">
//         <div className="header-inner">
//           {/* Logo and Title */}
//           <div className="left">
//             <div className="logo">
//               <span className="logo-text">  <img src={logo} alt="logo" /></span>
//             </div>
//             <div className="title">
//               <h2>THE CLUB OF WHITE</h2>
//             </div>
//             {localStorage.getItem("email") === "demo@gmail.com" && (
//                            <button className="admin-btn" onClick={addproduct}>Admin</button>
// )}

//           </div>

//           {/* Icons */}
//           <div className="right">
//             <div className="icon">
//               <Search className="icon-item" />
//             </div>
//             <div className="icon">
//               <Link to="/cart">
//                 <ShoppingCart className="icon-item" />
//               </Link>
//             </div>
//             <div className="icon">
//               <Link to="/yourorder">
//                 <Truck className="icon-item" />
//               </Link>
//             </div>
//             <div className="icon">
//               <Link href="/wishlist">
//                 <Heart className="icon-item" />
//               </Link>
//             </div>
//             <div className="icon">
//             {localStorage.getItem("loginnn") ? (
//                        <Link onClick={handleLogout}><IoLogOut className="icon-item" /></Link>
//                    ) : (
//                        <Link to={"/login"}><User className="icon-item" /></Link>
//                   )}
              
//             </div>

//             {/* Hamburger Menu for Mobile */}
//             <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
//               <span></span>
//               <span></span>
//               <span></span>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
//           <Link to="/yourorder" className="mobile-menu-item">
//             <Truck className="mobile-icon" />
//             <span>Your Orders</span>
//           </Link>
//           <Link to="/wishlist" className="mobile-menu-item">
//             <Heart className="mobile-icon" />
//             <span>Wishlist</span>
//           </Link>

    
//   {localStorage.getItem("loginnn") ? (
//                        <Link onClick={handleLogout} className="mobile-menu-item"><IoLogOut className="mobile-icon"/> <span>Logout</span></Link>
//                    ) : (
//                     <Link to="/login" className="mobile-menu-item">
//                     <User className="mobile-icon" />
//                     <span>Login</span>
//                   </Link>
//                   )}


         

// {localStorage.getItem("email") === "demo@gmail.com" ? (
//                                 <button onClick={addproduct} className="mobile-menu-item mobile-admin ">Admin</button>
//                             ) : null}   

         
//         </div>
//       </div>
//     </header>
//   )
// }




// "use client";

// import { Search, ShoppingCart, Truck, Heart, User } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useState, useContext, useRef, useEffect } from "react";
// import logo from "./assets/Backgroungimg/logo1.png";
// import { AuthContext } from "./AuthContext";
// import { IoLogOut } from "react-icons/io5";
// import axios from "axios";

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const searchInputRef = useRef(null);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const toggleSearch = () => {
//     setSearchOpen(!searchOpen);
//     if (!searchOpen) {
//       setTimeout(() => {
//         searchInputRef.current?.focus();
//       }, 100);
//     }
//   };

//   const addproduct = () => {
//     navigate("/admin");
//   };

//   const handleLogout = () => {
//     logout();
//     localStorage.clear();
//     navigate("/login");
//   };

//   const fetchSuggestions = async (value) => {
//     if (!value) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API}/api/searchpc?q=${value}`);
//       const productResults = res.data.products.map((p) => ({
//         type: "product",
//         name: p.name,
//         id: p._id,
//       }));
//       const categoryResults = res.data.categories.map((c) => ({
//         type: "category",
//         name: c.name,
//       }));
//       setSuggestions([...productResults, ...categoryResults]);
//     } catch (err) {
//       console.error("Search error", err);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     fetchSuggestions(value);
//   };

//   const handleSelect = (item) => {
//     if (item.type === "product") {
//       navigate(`/productinner/${item.id}`);
//     } else {
//       navigate(`/products/${item.name}`);
//     }
//     setSearchTerm("");
//     setSuggestions([]);
//     setSearchOpen(false);
//   };

//   // Close search when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         searchOpen &&
//         searchInputRef.current &&
//         !searchInputRef.current.contains(event.target) &&
//         !event.target.closest(".search-icon")
//       ) {
//         setSearchOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [searchOpen]);

//   return (
//     <header className="header-main">
//       <div className="container">
//         <div className="header-inner">
//           {/* Logo and Title */}
//           <div className="left">
//             <div className="logo">
//               <span className="logo-text">
//                 <img src={logo || "/placeholder.svg"} alt="logo" />
//               </span>
//             </div>
//             <div className="title">
//               <h2>THE CLUB OF WHITE</h2>
//             </div>
//             {localStorage.getItem("email") === "demo@gmail.com" && (
//               <button className="admin-btn" onClick={addproduct}>
//                 Admin
//               </button>
//             )}
//           </div>

//           {/* Icons */}
//           <div className="right">
//             <div className="icon search-icon" onClick={toggleSearch}>
//               <Search className="icon-item" />
//               {searchOpen && (
//                 <div className="search-bar" style={{ position: "relative" }}>
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     placeholder="Search products or categories..."
//                     className="search-input"
//                   />
//                   {suggestions.length > 0 && (
//                     <ul
//                       className="suggestion-list"
//                       style={{
//                         position: "absolute",
//                         top: "17px",
//                         left: "-20px",
//                         right: 0,
//                         background: "#fff",
//                         zIndex: 1000,
//                         listStyle: "none",
//                         padding: "0.5rem",
//                       }}
//                     >
//                       {suggestions.map((item, index) => (
//                         <li
//                           key={index}
//                           onClick={() => handleSelect(item)}
//                           style={{ padding: "0.3rem", cursor: "pointer" }}
//                         >
//                           {item.name}{" "}
//                           <small style={{ color: "#888" }}>({item.type})</small>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}
//             </div>
//             <div className="icon">
//               <Link to="/cart">
//                 <ShoppingCart className="icon-item" />
//               </Link>
//             </div>
//             <div className="icon">
//               <Link to="/yourorder">
//                 <Truck className="icon-item" />
//               </Link>
//             </div>
//             <div className="icon">
//               <Link to="/wishlist">
//                 <Heart className="icon-item" />
//               </Link>
//             </div>
//             <div className="icon">
//               {localStorage.getItem("loginnn") ? (
//                 <Link onClick={handleLogout}>
//                   <IoLogOut className="icon-item" />
//                 </Link>
//               ) : (
//                 <Link to={"/login"}>
//                   <User className="icon-item" />
//                 </Link>
//               )}
//             </div>

//             {/* Hamburger Menu for Mobile */}
//             <div
//               className={`hamburger ${menuOpen ? "active" : ""}`}
//               onClick={toggleMenu}
//             >
//               <span></span>
//               <span></span>
//               <span></span>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
//           <Link to="/yourorder" className="mobile-menu-item">
//             <Truck className="mobile-icon" />
//             <span>Your Orders</span>
//           </Link>
//           <Link to="/wishlist" className="mobile-menu-item">
//             <Heart className="mobile-icon" />
//             <span>Wishlist</span>
//           </Link>

//           {localStorage.getItem("loginnn") ? (
//             <Link onClick={handleLogout} className="mobile-menu-item">
//               <IoLogOut className="mobile-icon" />
//               <span>Logout</span>
//             </Link>
//           ) : (
//             <Link to="/login" className="mobile-menu-item">
//               <User className="mobile-icon" />
//               <span>Login</span>
//             </Link>
//           )}

//           {localStorage.getItem("email") === "demo@gmail.com" ? (
//             <button onClick={addproduct} className="mobile-menu-item mobile-admin">
//               Admin
//             </button>
//           ) : null}
//         </div>
//       </div>
//     </header>
//   );
// }









"use client"

import { Search, ShoppingCart, Truck, Heart, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext, useRef, useEffect } from "react"
import logo from "./assets/Backgroungimg/logo1.png"
import { AuthContext } from "./AuthContext"
import { IoLogOut } from "react-icons/io5"
import axios from "axios"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const searchInputRef = useRef(null)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (!searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }

  const addproduct = () => {
    navigate("/admin")
  }

  const handleLogout = () => {
    logout()
    localStorage.clear()
    navigate("/login")
  }

  const fetchSuggestions = async (value) => {
    if (!value) {
      setSuggestions([])
      return
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/searchpc?q=${value}`)
      const productResults = res.data.products.map((p) => ({
        type: "product",
        name: p.name,
        id: p._id,
      }))
      const categoryResults = res.data.categories.map((c) => ({
        type: "category",
        name: c.name,
      }))
      setSuggestions([...productResults, ...categoryResults])
    } catch (err) {
      console.error("Search error", err)
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    fetchSuggestions(value)
  }

  const handleSelect = (item) => {
    if (item.type === "product") {
      navigate(`/productinner/${item.id}`)
    } else {
      navigate(`/products/${item.name}`)
    }
    setSearchTerm("")
    setSuggestions([])
    setSearchOpen(false)
  }

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if the click is outside both the search icon and the search input
      if (searchOpen) {
        const isClickInsideSearchIcon = event.target.closest(".search-icon")
        const isClickInsideSearchInput = searchInputRef.current && searchInputRef.current.contains(event.target)

        // If the click is neither inside the search icon nor inside the search input, close the search
        if (!isClickInsideSearchIcon && !isClickInsideSearchInput) {
          setSearchOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchOpen])

  return (
    <header className="header-main">
      <div className="container">
        <div className="header-inner">
          {/* Logo and Title */}
          <div className="left">
            <div className="logo">
              <span className="logo-text">
                <img src={logo || "/placeholder.svg"} alt="logo" />
              </span>
            </div>
            <div className="title">
              <h2>THE CLUB OF WHITE</h2>
            </div>
            {localStorage.getItem("email") === "demo@gmail.com" && (
              <button className="admin-btn" onClick={addproduct}>
                Admin
              </button>
            )}
          </div>

          {/* Icons */}
          <div className="right">
            <div className={`icon search-icon ${searchOpen ? "active" : ""}`} onClick={toggleSearch}>
              <Search className="icon-item" />
              {searchOpen && (
                <div className="search-input-container open">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search products or categories..."
                    className="search-input"
                  />
                  {suggestions.length > 0 && (
                    <ul className="suggestion-list">
                      {suggestions.map((item, index) => (
                        <li key={index} onClick={() => handleSelect(item)} className="suggestion-item">
                          {item.name} <span className="suggestion-type">({item.type})</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <div className="icon">
              <Link to="/cart">
                <ShoppingCart className="icon-item" />
              </Link>
            </div>
            <div className="icon">
              <Link to="/yourorder">
                <Truck className="icon-item" />
              </Link>
            </div>
            <div className="icon">
              <Link to="/wishlist">
                <Heart className="icon-item" />
              </Link>
            </div>
            <div className="icon">
              {localStorage.getItem("loginnn") ? (
                <Link onClick={handleLogout}>
                  <IoLogOut className="icon-item" />
                </Link>
              ) : (
                <Link to={"/login"}>
                  <User className="icon-item" />
                </Link>
              )}
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
          <Link to="/yourorder" className="mobile-menu-item">
            <Truck className="mobile-icon" />
            <span>Your Orders</span>
          </Link>
          <Link to="/wishlist" className="mobile-menu-item">
            <Heart className="mobile-icon" />
            <span>Wishlist</span>
          </Link>

          {localStorage.getItem("loginnn") ? (
            <Link onClick={handleLogout} className="mobile-menu-item">
              <IoLogOut className="mobile-icon" />
              <span>Logout</span>
            </Link>
          ) : (
            <Link to="/login" className="mobile-menu-item">
              <User className="mobile-icon" />
              <span>Login</span>
            </Link>
          )}

          {localStorage.getItem("email") === "demo@gmail.com" ? (
            <button onClick={addproduct} className="mobile-menu-item mobile-admin">
              Admin
            </button>
          ) : null}
        </div>
      </div>
    </header>
  )
}
