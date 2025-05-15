import React from "react";
import { useNavigate } from "react-router-dom";
const Admin = () => {

    const navigate = useNavigate();
    const addproduct = () => {
        navigate("/addproduct")
    }
    const addcat = () => {
        navigate("/addcat")
    }

    const addcoupan = () => {
        navigate("/coupan")
    }
    const adminallorder = () => {
        navigate("/adminallorder")

    }
    const allcategory = () => {
        navigate("/allcategory")
    }
    const allproducts = () => {
        navigate("/allproducts")
    }
    return (
        <>
            <div className="admin-main">
                <button onClick={addproduct}>Add-Product</button>

                <button onClick={addcat}>Add-Category</button>

                <button onClick={addcoupan}>Add-Coupan</button>
                <button onClick={adminallorder}>Show all order</button>
                <button onClick={allcategory}>All category</button>
                <button onClick={allproducts}>All products</button>
            </div>
        </>
    )
}
export default Admin;