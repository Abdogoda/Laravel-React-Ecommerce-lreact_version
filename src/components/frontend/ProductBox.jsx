import React from "react";
import { Link } from "react-router-dom";

function ProductBox({ product }) {
 return (
  <div className="product-box col-md-6 col-lg-4 mb-3">
   <div className="card shadow">
    <div className="product-tumb rounded">
     <img
      src={`http://localhost:8000${product.image}`}
      alt={`product-${product.id}-image`}
     />
    </div>
    <div className="product-details">
     <h4>
      <Link to={`/collections/${product.category.slug}/${product.slug}`}>
       {product.name}
      </Link>
     </h4>
     <Link
      to={`/collections/${product.category.slug}`}
      className="product-catagory"
     >
      {product.category.name}
     </Link>
     <div className="product-bottom-details">
      <div className="product-price">
       <small>${product.original_price}</small>${product.selling_price}
      </div>
      <div className="product-links">
       <Link
        to={`/collections/${product.category.slug}/${product.slug}`}
        className="btn btn-dark"
       >
        View Details
       </Link>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

export default ProductBox;
