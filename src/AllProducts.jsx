import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/getallproduct`);
      if (response.data.status === "done") {
        setProducts(response.data.data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("Something went wrong while fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/deleteproduct/${id}`);
      if (response.data.status === "done") {
        setProducts(products.filter((prod) => prod._id !== id));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      alert("Error deleting product");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateproduct/${id}`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="all-products">
      <h1>All Products</h1>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Detail</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Is New</th>
            <th>Color</th>
            <th>Sizes</th>
            <th>Main Image</th>
            {/* <th>Sub Image 1</th>
            <th>Sub Image 2</th>
            <th>Sub Image 3</th> */}
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod._id}</td>
              <td>{prod.name}</td>
              <td>{prod.brand}</td>
              <td>{prod.detail}</td>
              <td>₹{prod.price.toLocaleString()}</td>
              <td>{prod.discount}</td>
              <td>{prod.isnew ? "Yes" : "No"}</td>
              <td>{prod.color}</td>
              <td>
                {Array.isArray(prod.productsize)
                  ? prod.productsize.join(", ")
                  : prod.productsize}
              </td>
              <td>
                {prod.img && (
                  <img
                    src={`${process.env.REACT_APP_API}/images/${prod.img}`}
                    alt={prod.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                )}
              </td>
              {/* <td>
                {prod.subimg1 && (
                  <img
                    src={`${process.env.REACT_APP_API}/images/${prod.subimg1}`}
                    alt="subimg1"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                )}
              </td>
              <td>
                {prod.subimg2 && (
                  <img
                    src={`${process.env.REACT_APP_API}/images/${prod.subimg2}`}
                    alt="subimg2"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                )}
              </td>
              <td>
                {prod.subimg3 && (
                  <img
                    src={`${process.env.REACT_APP_API}/images/${prod.subimg3}`}
                    alt="subimg3"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                )}
              </td> */}
              <td>
                <button onClick={() => handleUpdate(prod._id)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDelete(prod._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;