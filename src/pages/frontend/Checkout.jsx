import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Checkout() {
 const [loading, setLoading] = useState(false);
 const [products, setProducts] = useState([]);
 const [errors, setErrors] = useState([]);
 const [data, setData] = useState({
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zipcode: "",
 });
 const handleInputs = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
 };
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
 const onOrderFunc = (e, mode) => {
  e.preventDefault();
  var postData = {
   first_name: data.first_name,
   last_name: data.last_name,
   email: data.email,
   phone: data.phone,
   address: data.address,
   city: data.city,
   state: data.state,
   zipcode: data.zipcode,
   payment_mode: mode,
  };
  swal({
   title: "Are you sure you want to order?",
   icon: "warning",
   buttons: true,
   dangerMode: true,
  }).then((willDelete) => {
   if (willDelete) {
    if (mode === "COD") {
     axios
      .post("/api/front-place-order", postData)
      .then((res) => {
       if (res.data.status === 200) {
        swal("Order Placed Successfully", res.data.message, "success");
        navigate("/thanks");
       } else if (res.data.status === 422) {
        setErrors(res.data.errors);
        swal("Warning", res.data.message, "warning");
       } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "warning");
       } else if (res.data.status === 401) {
        swal("Unuatharized", res.data.message, "error");
        navigate("/login");
       } else {
        swal("Warning", "Something Went Wrong!", "warning");
       }
      })
      .catch((err) => {
       console.error(err);
      });
    } else if (mode === "RAZORPAY") {
     axios
      .post("/api/front-validate-order", postData)
      .then((res) => {
       if (res.data.status === 200) {
        setErrors([]);
       } else if (res.data.status === 422) {
        setErrors(res.data.errors);
        swal("Warning", res.data.message, "warning");
       } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "warning");
       } else if (res.data.status === 401) {
        swal("Unuatharized", res.data.message, "error");
        navigate("/login");
       } else {
        swal("Warning", "Something Went Wrong!", "warning");
       }
      })
      .catch((err) => {
       console.error(err);
      });
    }
   } else {
    swal("Warning", "Your Order Not Completed!", "warning");
   }
  });
 };
 return (
  <div className="py-3 pt-5 container">
   <div className="section-header">
    <h1>
     <Link className="text-muted" to={"/"}>
      Home
     </Link>{" "}
     / Checkout Page
    </h1>
   </div>
   {loading && <h3>Loading...</h3>}
   {!loading && (
    <>
     {products.length === 0 && (
      <div>
       <h2 className="text-center">
        You Have No Products In Cart! <br />{" "}
        <Link to={"/collections"}>Back To Shop</Link>
       </h2>
      </div>
     )}
     {products.length > 0 && (
      <div className="row">
       <div className="col-md-7">
        <div className="card">
         <div className="card-header">
          <h4>Basic Information</h4>
         </div>
         <div className="card-body">
          <div className="row">
           <div className="col-md-6">
            <div className="form-group mb-3">
             <label>First Name</label>
             <input
              type="text"
              name="first_name"
              className="form-control"
              value={data.first_name}
              onChange={handleInputs}
             />
            </div>
           </div>
           <div className="col-md-6">
            <div className="form-group mb-3">
             <label>Last Name</label>
             <input
              type="text"
              name="last_name"
              className="form-control"
              value={data.last_name}
              onChange={handleInputs}
             />
             {errors.name && (
              <span className="text-danger">*{errors.name}</span>
             )}
            </div>
           </div>
           <div className="col-md-6">
            <div className="form-group mb-3">
             <label>Phone Number</label>
             <input
              type="text"
              name="phone"
              className="form-control"
              value={data.phone}
              onChange={handleInputs}
             />
             {errors.phone && (
              <span className="text-danger">*{errors.phone}</span>
             )}
            </div>
           </div>
           <div className="col-md-6">
            <div className="form-group mb-3">
             <label>Email Address</label>
             <input
              type="email"
              name="email"
              className="form-control"
              value={data.email}
              onChange={handleInputs}
             />
             {errors.email && (
              <span className="text-danger">*{errors.email}</span>
             )}
            </div>
           </div>
           <div className="col-md-12">
            <div className="form-group mb-3">
             <label>Full Address</label>
             <textarea
              name="address"
              className="form-control"
              value={data.address}
              onChange={handleInputs}
             >
              {data.address}
             </textarea>
             {errors.address && (
              <span className="text-danger">*{errors.address}</span>
             )}
            </div>
           </div>
           <div className="col-md-4">
            <div className="form-group mb-3">
             <label>City</label>
             <input
              type="text"
              name="city"
              className="form-control"
              value={data.city}
              onChange={handleInputs}
             />
             {errors.city && (
              <span className="text-danger">*{errors.city}</span>
             )}
            </div>
           </div>
           <div className="col-md-4">
            <div className="form-group mb-3">
             <label>State</label>
             <input
              type="text"
              name="state"
              className="form-control"
              value={data.state}
              onChange={handleInputs}
             />
             {errors.state && (
              <span className="text-danger">*{errors.state}</span>
             )}
            </div>
           </div>
           <div className="col-md-4">
            <div className="form-group mb-3">
             <label>Zip Code</label>
             <input
              type="text"
              name="zipcode"
              className="form-control"
              value={data.zipcode}
              onChange={handleInputs}
             />
             {errors.zipcode && (
              <span className="text-danger">*{errors.phone}</span>
             )}
            </div>
           </div>
           <div className="col-md-12">
            <div className="form-group mb-3">
             <button
              type="button"
              className="btn btn-primary m-1"
              onClick={(e) => onOrderFunc(e, "COD")}
             >
              Place Order
             </button>
             <button
              type="button"
              className="btn btn-success m-1"
              onClick={(e) => onOrderFunc(e, "RAZORPAY")}
             >
              Pay Online
             </button>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
       <div className="col-md-5 mt-3 mt-md-0">
        <div className="table-responsive">
         <table className="table table-striped table-bordered">
          <thead>
           <tr>
            <th width="50%">Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
           </tr>
          </thead>
          <tbody>
           {products.length > 0 &&
            products.map((product, index) => {
             totalCartPrice +=
              product.product.selling_price * product.product_qty;
             return (
              <tr key={index}>
               <td>{product.product.name}</td>
               <td>${product.product.selling_price}</td>
               <td>{product.product_qty}</td>
               <td>${product.product_qty * product.product.selling_price}</td>
              </tr>
             );
            })}
           <tr className="table-dark">
            <td colSpan={"2"} className="text-end fw-bold">
             Grand Total
            </td>
            <td colSpan={"2"} className="text-end fw-bold">
             ${totalCartPrice}
            </td>
           </tr>
          </tbody>
         </table>
        </div>
       </div>
      </div>
     )}
    </>
   )}
  </div>
 );
}

export default Checkout;
