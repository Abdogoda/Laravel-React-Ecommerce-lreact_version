import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function ViewOrder() {
 const { id } = useParams();
 const [loading, setLoading] = useState(true);
 const [order, setOrder] = useState({
  id: 0,
 });
 var totalCartPrice = 0;
 const navigate = useNavigate();
 const getOrderDetails = (id) => {
  setLoading(true);
  axios
   .get("/api/get-order-details/" + id)
   .then((res) => {
    if (res.data.status === 404) {
     swal("Error 404", res.data.message, "error");
     navigate("/admin/orders");
    } else if (res.data.status === 200) {
     setOrder(res.data.order);
     setLoading(false);
     console.log(res.data.order);
    }
   })
   .catch((err) => console.error(err));
 };
 useEffect(() => {
  if (id) {
   getOrderDetails(id);
  }
 }, []);
 return (
  <div className="container-fluid px-4">
   <h1 className="mt-4">Veiw Orders</h1>
   <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item">
     <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
      Dashboard
     </Link>
    </li>
    <li className="breadcrumb-item">
     <Link to="/admin/orders" style={{ textDecoration: "none" }}>
      Orders
     </Link>
    </li>
    <li className="breadcrumb-item active">{order.id}</li>
   </ol>

   <div className="card">
    <div className="card-header d-flex justify-content-between">
     <h3>Order ({order.id})</h3>
    </div>
    <div className="card-body">
     {loading && <p>Loading...</p>}
     {!loading && (
      <div className="row">
       <div className="col-12">
        <p>
         Name: {order.first_name} {order.last_name}
        </p>
        <p>Email: {order.email}</p>
        <p>Phone: {order.phone}</p>
        <p>Address: {order.address}</p>
        <p>City: {order.city}</p>
        <p>State: {order.state}</p>
        <p>ZipCode: {order.zipcode}</p>
        <p>Payment Method: {order.payment_mode}</p>
        <p>Tracking No: {order.tracking_no}</p>
       </div>
       <div className="col-12 mt-3">
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
           {order.order_items &&
            order.order_items.map((product, index) => {
             totalCartPrice += product.qty * product.price;
             return (
              <tr key={index}>
               <td>{product.product && product.product.name}</td>
               <td>${product.price}</td>
               <td>{product.qty}</td>
               <td>${product.qty * product.price}</td>
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
    </div>
   </div>
  </div>
 );
}

export default ViewOrder;
