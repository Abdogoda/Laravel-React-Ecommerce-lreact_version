import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ProductBox from "../../../components/frontend/ProductBox";

function Products() {
 const [loading, setLoading] = useState(false);
 const [products, setProducts] = useState([]);
 const getProducts = () => {
  setLoading(true);
  axios
   .get("/api/front-get-products")
   .then((res) => {
    if (res.data.status === 200) {
     setProducts(res.data.products);
     setLoading(false);
    } else {
     swal("Error 404", "Something Went Wrong!", "error");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 useEffect(() => {
  getProducts();
 }, []);
 return (
  <div className="py-3 pt-5 container">
   <div className="section-header">
    <h1>All Products</h1>
   </div>
   {loading && <h5>Loading...</h5>}
   {!loading && (
    <div className="row">
     {products.map((product, index) => {
      return <ProductBox key={index} product={product} />;
     })}
    </div>
   )}
  </div>
 );
}

export default Products;
