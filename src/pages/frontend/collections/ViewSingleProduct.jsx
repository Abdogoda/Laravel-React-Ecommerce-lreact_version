import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function ViewSingleProduct() {
 const { categorySlug, productSlug } = useParams();
 const [loading, setLoading] = useState(true);
 const [category, setCategory] = useState({ name: "" });
 const [product, setProduct] = useState({ name: "" });
 const [quantity, setQuantity] = useState(1);
 const navigate = useNavigate();
 const getProduct = () => {
  setLoading(true);
  axios
   .get(`/api/front-get-product/${categorySlug}/${productSlug}`)
   .then((res) => {
    if (res.data.status === 200) {
     setProduct(res.data.product);
     setCategory(res.data.category);
     setLoading(false);
    } else if (res.data.status === 404) {
     swal("Error 404", res.data.message, "error");
     navigate(`/collections/${categorySlug}`);
    } else {
     swal("Error 404", "Something Went Wrong", "error");
     navigate(`/collections/${categorySlug}`);
    }
   });
 };
 useEffect(() => {
  getProduct();
 }, []);
 const addToCartFunc = (e) => {
  if (quantity > 0) {
   e.preventDefault();
   const data = {
    product_id: product.id,
    product_qty: quantity,
   };
   axios
    .post(`/api/front-add-to-cart`, data)
    .then((res) => {
     if (res.data.status === 200) {
      swal("Success", res.data.message, "success");
     } else if (res.data.status === 409) {
      swal("Success", res.data.message, "success");
     } else if (res.data.status === 404) {
      swal("Error 404", res.data.message, "erro");
      navigate("/login");
     } else if (res.data.status === 401) {
      swal("Error", res.data.message, "error");
      navigate("/login");
     }
    })
    .catch((err) => {
     console.error(err);
    });
  } else {
   swal("Warning", "You Must Select Quantity", "warning");
  }
 };
 return (
  <div className="py-3 pt-5 container">
   <div className="section-header">
    <h1>
     <Link to={`/collections/${categorySlug}`} className="text-muted">
      {category.name}
     </Link>{" "}
     / {product.name}
    </h1>
   </div>
   {loading && <h3>Loading...</h3>}
   {!loading && (
    <div className="card">
     <div className="card-body">
      {product && (
       <div className="row">
        <div className="col-md-4 border-end">
         <img
          src={`http://localhost:8000${product.image}`}
          alt={`p-${product.id}-img`}
          style={{ maxWidth: "100%" }}
         />
        </div>
        <div className="col-md-8">
         <h4>
          {product.name}{" "}
          <span className="float-end badge badge-sm bg-secondary badge-pil">
           {product.brand}
          </span>
         </h4>
         <p>{product.description}</p>
         <h4 className="mb-1">
          RS: {product.selling_price}{" "}
          <s className="ms-2"> Rs: {product.original_price}</s>
         </h4>
         <div>
          <label
           className={`badge bg-${
            product.qty > 0 ? "success" : "danger"
           } px-4 mt-2`}
          >
           {product.qty > 0 ? "In " : "Out Of "}Stock
          </label>
          {product.qty > 0 && (
           <div className="row">
            <div className="col-md-6 col-lg-3 mt-3">
             <div className="input-group">
              <button
               type="button"
               onClick={() =>
                setQuantity((prev) => (prev > 0 ? prev - 1 : prev))
               }
               className="input-group-text"
              >
               -
              </button>
              <input
               type="number"
               value={quantity}
               readOnly
               className="form-control text-center"
              />
              <button
               type="button"
               onClick={() =>
                setQuantity((prev) => (prev < product.qty ? prev + 1 : prev))
               }
               className="input-group-text"
              >
               +
              </button>
             </div>
            </div>
            <div className="col-md-6 col-lg-3 mt-3">
             <button
              type="button"
              className="btn btn-primary w-100"
              onClick={addToCartFunc}
             >
              Add To Cart <i className="fa fa-shopping-cart"></i>
             </button>
            </div>
           </div>
          )}
          <div>
           <button type="button" className="btn btn-info text-white mt-3">
            Add To Wishlist
           </button>
          </div>
         </div>
        </div>
       </div>
      )}
     </div>
    </div>
   )}
  </div>
 );
}

export default ViewSingleProduct;
