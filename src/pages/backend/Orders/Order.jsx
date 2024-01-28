import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Order() {
 const [loading, setLoading] = useState(false);
 const [orders, setOrders] = useState([]);
 const getOrders = () => {
  setLoading(true);
  axios
   .get("/api/get-orders")
   .then((res) => {
    console.log(res);
    if (res.data.status === 200) {
     setOrders(res.data.orders);
     setLoading(false);
    } else {
     swal("Error 404", "Something went wrong!", "error");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 useEffect(() => {
  getOrders();
 }, []);
 const onDeleteFunc = (id) => {
  axios.post(`/api/delete-order/${id}`).then((res) => {
   if (res.data.status === 200) {
    swal("Success", res.data.message, "success");
    getOrders();
   }
  });
 };
 return (
  <div className="container-fluid px-4">
   <h1 className="mt-4">Veiw Orders</h1>
   <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item">
     <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
      Dashboard
     </Link>
    </li>
    <li className="breadcrumb-item active">Orders</li>
   </ol>

   <div className="card">
    <div className="card-header d-flex justify-content-between">
     <h3>All Orders</h3>
    </div>
    <div className="card-body">
     {loading && <p>Loading...</p>}
     {!loading && (
      <div className="table-responsive">
       <table className="table table-bordered text-nowrap">
        <thead>
         <tr>
          <td>Id</td>
          <td>Tracking No</td>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
          <td>Action</td>
         </tr>
        </thead>
        <tbody>
         {orders.length === 0 && (
          <tr>
           <td colSpan={6} className="text-center text-muted">
            No Orders Available!
           </td>
          </tr>
         )}
         {orders.length > 0 &&
          orders.map((order, index) => {
           return (
            <tr key={index}>
             <td>
              <Link
               to={`/admin/orders/${order.id}`}
               style={{ textDecoration: "none" }}
              >
               #{order.id}
              </Link>
             </td>
             <td>{order.tracking_no}</td>
             <td>{order.first_name + " " + order.last_name}</td>
             <td>{order.email}</td>
             <td>{order.phone}</td>
             <td className="d-flex flex-wrap align-items-center gap-2">
              <Link
               to={`/admin/orders/${order.id}`}
               className="btn btn-success btn-sm"
              >
               View <i className="fa fa-eye"></i>
              </Link>
              <button
               type="button"
               onClick={() => onDeleteFunc(order.id)}
               className="btn btn-danger btn-sm"
              >
               Delete <i className="fa fa-trash"></i>
              </button>
             </td>
            </tr>
           );
          })}
        </tbody>
       </table>
      </div>
     )}
    </div>
   </div>
  </div>
 );
}

export default Order;
