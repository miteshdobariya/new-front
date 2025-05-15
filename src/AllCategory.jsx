import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/getallcategories`);
        if (response.data.status === "done") {
          setCategories(response.data.data); // Set categories in state
        } else {
          setError("Failed to fetch categories");
        }
      } catch (err) {
        console.error("Error fetching categories:", err.message);
        setError("Something went wrong while fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Delete category handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/deletecategory/${id}`);
      if (response.data.status === "done") {
        setCategories(categories.filter((cat) => cat._id !== id));
        alert("Category deleted successfully");
      } else {
        alert("Failed to delete category");
      }
    } catch (err) {
      alert("Error deleting category");
    }
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="all-category">
      <h1>All Categories</h1>
      <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td>
                <img
                  src={`${process.env.REACT_APP_API}/images/${category.img}`}
                  alt={category.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>
                <button onClick={() => handleDelete(category._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCategory;