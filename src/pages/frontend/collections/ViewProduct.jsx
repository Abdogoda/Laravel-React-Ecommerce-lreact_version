import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import ProductBox from "../../../components/frontend/ProductBox";

function ViewProduct() {
 const [loading, setLoading] = useState(false);
 const [category, setCategory] = useState({ name: "" });
 const [products, setProducts] = useState([]);
 const { categorySlug } = useParams();
 const navigate = useNavigate();
 const getProducts = () => {
  setLoading(true);
  axios
   .get(`/api/front-get-category-products/${categorySlug}`)
   .then((res) => {
    if (res.data.status === 200) {
     setCategory(res.data.category);
     setProducts(res.data.products);
     setLoading(false);
    } else {
     if (res.data.status === 404) {
      swal("Error 404", res.data.message, "error");
      navigate("/collections");
     } else {
      swal("Error", "Something Went Wrong!", "error");
     }
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
    <h1>
     <span className="text-muted">Collections</span> / {category.name}
    </h1>
   </div>
   {loading && <h5>Loading...</h5>}
   {!loading && (
    <div className="row justify-content-center">
     {products.length === 0 && (
      <div className="col-md-12">
       <div className="card text-center text-muted">
        No Products Available For This Category!
       </div>
      </div>
     )}
     {products.length > 0 &&
      products.map((product, index) => {
       return <ProductBox key={index} product={product} />;
      })}
    </div>
   )}
  </div>
 );
}

export default ViewProduct;
