import axios from "axios";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Productinsert = () => {
  const name = useRef();
  const price = useRef();
  const detail = useRef();
  const brand = useRef();
  const discount = useRef();
  const color = useRef();
  const img = useRef();
  const subimg1 = useRef();
  const subimg2 = useRef();
  const subimg3 = useRef();
  const new1 = useRef();

  const [suggestions, setSuggestions] = useState([]); // State for product name suggestions
  const [isAutoFilled, setIsAutoFilled] = useState(false); // Track if the form is auto-filled

  // Fetch product suggestions based on user input
  const fetchProductSuggestions = async (query) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/search?q=${query}`);
      if (response.data.products) {
        setSuggestions(response.data.products); // Set product suggestions
      }
    } catch (error) {
      console.error("Error fetching product suggestions:", error.message);
    }
  };

  // Fetch product details by name and auto-fill the form
  const fetchProductDetails = async (productName) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/productdetails?name=${productName}`);
      if (response.data.status === "done") {
        const product = response.data.product;
        // Auto-fill the form fields
        price.current.value = product.price;
        detail.current.value = product.detail;
        brand.current.value = product.brand;
        discount.current.value = product.discount;
        color.current.value = product.color;
        setIsAutoFilled(true); // Mark the form as auto-filled
        toast.success("Form auto-filled with existing product details.");
      } else {
        setIsAutoFilled(false); // Reset auto-fill state
        toast.info("No matching product found. You can create a new product.");
      }
    } catch (error) {
      console.error("Error fetching product details:", error.message);
      toast.error("Failed to fetch product details.");
    }
  };

  // Handle product name input change
  const handleNameChange = (e) => {
    const productName = e.target.value;
    if (productName) {
      fetchProductSuggestions(productName); // Fetch suggestions as user types
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (productName) => {
    name.current.value = productName; // Set the clicked suggestion as the product name
    setSuggestions([]); // Clear suggestions
    fetchProductDetails(productName); // Fetch and auto-fill product details
  };


  const register = async (e) => {
    e.preventDefault();
    const params = new FormData();
    const newValue = document.querySelector('input[name="isNew"]:checked')?.value || "no";

    const selectedSizes = [];
    document.querySelectorAll('input[name="productsize"]:checked').forEach((input) => {
      selectedSizes.push(input.value);
    });

    params.set("name", name.current.value);
    params.set("price", price.current.value);
    params.set("detail", detail.current.value);
    params.set("brand", brand.current.value);
    params.set("discount", discount.current.value);
    params.set("color", color.current.value);
    params.set("img", img.current.files[0]);
    params.set("subimg1", subimg1.current.files[0]);
    params.set("subimg2", subimg2.current.files[0]);
    params.set("subimg3", subimg3.current.files[0]);
    params.set("new", newValue);
    params.set("productsize", JSON.stringify(selectedSizes)); // Add sizes to the request

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/productinsert`, params);
      if (response.data.status === "done") {
        toast.success("Product successfully inserted/updated.");
      } else {
        toast.error("Failed to insert/update product.");
      }
    } catch (error) {
      console.error("Error during product insertion:", error.message);
      toast.error("Failed to insert/update product.");
    }
  };






// const uploadToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "mitesh"); // ✅ Your actual preset

//   const res = await axios.post(
//     "https://api.cloudinary.com/v1_1/dp4wlbryu/image/upload", // ✅ Your actual cloud name
//     formData
//   );
//   return res.data.secure_url;
// };


// const register = async (e) => {
//   e.preventDefault();
//   try {
//     const imgMainUrl = img.current.files[0] && await uploadToCloudinary(img.current.files[0]);
//     const subImg1Url = subimg1.current.files[0] && await uploadToCloudinary(subimg1.current.files[0]);
//     const subImg2Url = subimg2.current.files[0] && await uploadToCloudinary(subimg2.current.files[0]);
//     const subImg3Url = subimg3.current.files[0] && await uploadToCloudinary(subimg3.current.files[0]);

//     const payload = {
//       name: name.current.value,
//       price: price.current.value,
//       detail: detail.current.value,
//       brand: brand.current.value,
//       discount: discount.current.value,
//       color: color.current.value,
//       isnew: document.querySelector('input[name="isNew"]:checked')?.value || "no",
//       productsize: Array.from(document.querySelectorAll('input[name="productsize"]:checked')).map(i => i.value),
//       img: imgMainUrl,
//       subimg1: subImg1Url,
//       subimg2: subImg2Url,
//       subimg3: subImg3Url,
//     };

//     await axios.post(`${process.env.REACT_APP_API}/productinsert`, payload);
//     toast.success("Product successfully inserted!");
//   } catch (err) {
//     toast.error("Error during product insertion");
//     console.error(err);
//   }
// };






  return (
    <>
      <ToastContainer />
      <div className="signup-main">
        <div className="container">
          <h1>Insert Product</h1>
          <form onSubmit={register}>
            <label>Product Name:</label>
            <input
              type="text"
              ref={name}
              onChange={handleNameChange} // Trigger suggestions on name change
              required
            />
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((product) => (
                  <li
                    key={product._id}
                    onClick={() => handleSuggestionClick(product.name)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}

            <label htmlFor="username">Price:</label>
            <input type="text" ref={price} required />

            <label>Detail:</label>
            <input type="text" ref={detail} required />

            <label>Brand:</label>
            <input type="text" ref={brand} required />

            <label>Discount (%):</label>
            <input type="text" ref={discount} />

            <label>Color:</label>
            <input type="text" ref={color} required />

            <label>Sizes:</label>
            <div>
              <input type="checkbox" name="productsize" value="XS" /> XS
              <input type="checkbox" name="productsize" value="S" /> S
              <input type="checkbox" name="productsize" value="M" /> M
              <input type="checkbox" name="productsize" value="L" /> L
              <input type="checkbox" name="productsize" value="XL" /> XL
              <input type="checkbox" name="productsize" value="XXL" /> XXL
            </div>

            <label>Main Image:</label>
            <input type="file" ref={img} />

            <label>Sub Image 1:</label>
            <input type="file" ref={subimg1} />

            <label>Sub Image 2:</label>
            <input type="file" ref={subimg2} />

            <label>Sub Image 3:</label>
            <input type="file" ref={subimg3} />

            <div className="radio-group">
              <label>
                <input type="checkbox" name="isNew" value="yes" ref={new1} />
                Yes
              </label>

            </div>

            <button type="submit">
              {isAutoFilled ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Productinsert;