import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const sizesArr = ["XS", "S", "M", "L", "XL", "XXL"];

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const isNew = useRef();

  const [checkedSizes, setCheckedSizes] = useState([]);
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/getproduct/${id}`);
        if (response.data.status === "done") {
          const product = response.data.data;
          name.current.value = product.name || "";
          price.current.value = product.price || "";
          detail.current.value = product.detail || "";
          brand.current.value = product.brand || "";
          discount.current.value = product.discount || "";
          color.current.value = product.color || "";
          isNew.current.checked = product.isnew === "yes" || product.isnew === true;
          setCheckedSizes(Array.isArray(product.productsize) ? product.productsize : []);
          setIsAutoFilled(true);
        }
      } catch (err) {
        toast.error("Failed to fetch product data");
      }
    };
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setCheckedSizes((prev) =>
      prev.includes(value)
        ? prev.filter((size) => size !== value)
        : [...prev, value]
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const params = new FormData();
    params.set("name", name.current.value);
    params.set("price", price.current.value);
    params.set("detail", detail.current.value);
    params.set("brand", brand.current.value);
    params.set("discount", discount.current.value);
    params.set("color", color.current.value);
    params.set("isnew", isNew.current.checked ? "yes" : "no");
    params.set("productsize", JSON.stringify(checkedSizes));
    if (img.current.files[0]) params.set("img", img.current.files[0]);
    if (subimg1.current.files[0]) params.set("subimg1", subimg1.current.files[0]);
    if (subimg2.current.files[0]) params.set("subimg2", subimg2.current.files[0]);
    if (subimg3.current.files[0]) params.set("subimg3", subimg3.current.files[0]);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/updateproduct/${id}`,
        params,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.status === "done") {
        toast.success("Product updated successfully");
        setTimeout(() => navigate("/allproducts"), 1000);
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-main">
        <div className="container">
          <h1>Update Product</h1>
          <form onSubmit={handleUpdate}>
            <label>Product Name:</label>
            <input type="text" ref={name} required />

            <label>Price:</label>
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
              {sizesArr.map((size) => (
                <label key={size} style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    name="productsize"
                    value={size}
                    checked={checkedSizes.includes(size)}
                    onChange={handleSizeChange}
                  />
                  {size}
                </label>
              ))}
            </div>

            <label>Main Image:</label>
            <input type="file" ref={img} />

            <label>Sub Image 1:</label>
            <input type="file" ref={subimg1} />

            <label>Sub Image 2:</label>
            <input type="file" ref={subimg2} />

            <label>Sub Image 3:</label>
            <input type="file" ref={subimg3} />

            <label>Is New:</label>
            <input type="checkbox" ref={isNew} />

            <button type="submit" style={{ marginTop: "10px", display: "block", height: "40px", width: "100%", backgroundColor: "#C2A67D", color: "#fff", border: "none", borderRadius: "5px" }}>
              {isAutoFilled ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;