import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Cart() {
 const [loading, setLoading] = useState(true);
 const [products, setProducts] = useState([]);
 const navigate = useNavigate();
 var totalCartPrice = 0;
 const getCartProducts = () => {
  setLoading(true);
  axios.get(`/api/front-get-cart-products`).then((res) => {
   if (res.data.status === 200) {
    setLoading(false);
    setProducts(res.data.cart_products);
   } else if (res.data.status === 401) {
    swal("Error", res.data.message, "error");
    navigate("/login");
   }
  });
 };
 useEffect(() => {
  getCartProducts();
 }, []);
 const handleIncrement = (id) => {
  setProducts((products) =>
   products.map((item) =>
    item.id === id
     ? {
        ...item,
        product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0),
       }
     : item
   )
  );
  updateCartQuantity(id, "inc");
 };
 const handleDecrement = (id) => {
  setProducts((products) =>
   products.map((item) =>
    item.id === id
     ? {
        ...item,
        product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
       }
     : item
   )
  );
  updateCartQuantity(id, "dec");
 };
 const updateCartQuantity = (id, scope) => {
  axios
   .put(`api/front-update-cart-product-quantity/${id}/${scope}`)
   .then((res) => {
    console.log(res.data.message);
    if (res.data.status === 404) {
     swal("Error 404", res.data.message, "error");
    } else if (res.data.status === 401) {
     swal("Error", res.data.message, "error");
     navigate("/login");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 const removeCartProduct = (e, id) => {
  e.preventDefault();
  axios
   .delete(`api/front-delete-cart-product/${id}`)
   .then((res) => {
    if (res.data.status === 200) {
     swal("Success", res.data.message, "success");
     getCartProducts();
    } else if (res.data.status === 404) {
     swal("Error 404", res.data.message, "error");
    } else if (res.data.status === 401) {
     swal("Error", res.data.message, "error");
     navigate("/login");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 return (
  <div className="py-3 pt-5 container">
   <div className="section-header">
    <h1>
     <Link className="text-muted" to={"/"}>
      Home
     </Link>{" "}
     / Your Cart
    </h1>
   </div>
   {loading && <h3>Loading...</h3>}
   {!loading && (
    <div className="row">
     <div className="col-md-12">
      <div className="table-responsive">
       <table className="table table-bordered text-nowrap">
        <thead>
         <tr>
          <td>Product Id</td>
          <td>Product Name</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Total</td>
          <td>Remove</td>
         </tr>
        </thead>
        <tbody>
         {products.length == 0 && (
          <tr>
           <td colSpan={6} className="text-muted text-center">
            There Is No Products In Your Cart!{" "}
            <Link to={"/shop"}>Shop Now</Link>
           </td>
          </tr>
         )}
         {products.length > 0 &&
          products.map((element, index) => {
           totalCartPrice +=
            element.product.selling_price * element.product_qty;
           return (
            <tr key={index}>
             <td>{element.product_id}</td>
             <td>
              <Link
               to={`/collections/${element.product.category.slug}/${element.product.slug}`}
               className="d-flex gap-2 align-items-center"
               style={{ textDecoration: "none" }}
              >
               <img
                src={`http://localhost:8000${element.product.image}`}
                alt={`p-${index}-img`}
                style={{ width: "50px" }}
               />
               <p className="text-dark">{element.product.name}</p>
              </Link>
             </td>
             <td>{element.product.selling_price}$</td>
             <td>
              <div className="input-group flex-nowrap">
               <button
                type="button"
                className="input-group-text"
                onClick={(e) => handleDecrement(element.id)}
               >
                -
               </button>
               <input
                type="number"
                value={element.product_qty}
                readOnly
                style={{ width: "50px", minWidth: "50px" }}
                className="form-control text-center px-1"
               />
               <button
                type="button"
                className="input-group-text"
                onClick={(e) => handleIncrement(element.id)}
               >
                +
               </button>
              </div>
             </td>
             <td>{element.product_qty * element.product.selling_price}$</td>
             <td>
              <button
               className="btn btn-danger btn-sm"
               onClick={(e) => removeCartProduct(e, element.id)}
              >
               {" "}
               Remove
               <i className="fa fa-trash"></i>
              </button>
             </td>
            </tr>
           );
          })}
        </tbody>
       </table>
      </div>
     </div>
     {products.length > 0 && (
      <>
       <div className="col-md-7"></div>
       <div className="col-md-5">
        <div className="card shadow mt-3">
         <div className="card-body">
          <h5>
           Sub Total: <span className="float-end">{totalCartPrice}$</span>
          </h5>
          <h5>
           Grand Total:{" "}
           <span className="float-end">
            {Math.round(totalCartPrice * 1.1, 2)}$
           </span>
          </h5>
          <hr />
          <Link to={"/checkout"} className="btn btn-success w-100">
           Checkout
          </Link>
         </div>
        </div>
       </div>
      </>
     )}
    </div>
   )}
  </div>
 );
}

export default Cart;
