import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useStateContext } from "../../context/AuthContext";

function UserProfile() {
 const [loading, setLoading] = useState(false);
 const [userInfo, setUserInfo] = useState({});
 const [userOrdres, setUserOrders] = useState({});
 const { setToken, setUserName } = useStateContext();
 const navigate = useNavigate();
 const getUserInfo = () => {
  setLoading(true);
  axios
   .get("/api/get-user-info")
   .then((res) => {
    if (res.data.status === 401) {
     swal("Unauthorized", res.data.message, "error");
     navigate("/login");
    } else if (res.data.status === 200) {
     setUserInfo(res.data.user);
     setUserOrders(res.data.orders);
     setLoading(false);
     console.log(res.data);
    } else {
     swal("Error", res.data.message, "error");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 useEffect(() => {
  getUserInfo();
 }, []);
 const logoutFunc = () => {
  swal({
   title: "Are you sure you want to logout?",
   text:
    "Once logged out, you will not be able to recover your data and operations!",
   icon: "warning",
   buttons: true,
   dangerMode: true,
  }).then((willDelete) => {
   if (willDelete) {
    axios
     .post("/api/logout")
     .then((res) => {
      if (res.data.status === 200) {
       setToken("");
       setUserName("");
       swal("Success", res.data.message, "success");
       navigate("/login");
      }
      console.log(res);
     })
     .catch((err) => {
      if (err.response.status === 401) {
       setToken("");
       setUserName("");
       swal("Success", "You Have Been Logged Out Successfully!", "success");
      } else {
       console.error(err.response);
      }
     });
   }
  });
 };
 return (
  <div className="py-3 pt-5 container">
   <div className="section-header">
    <h1>My Profile</h1>
   </div>
   {loading && <h5>Loading...</h5>}
   {!loading && (
    <div className="row">
     <div className="card">
      <div className="card-header d-flex justify-content-between">
       <h3>Personal Information</h3>
      </div>
      <div className="card-body">
       {loading && <h3>loading...</h3>}
       {!loading && (
        <>
         <div className="d-flex align-items-center gap-2">
          <div
           style={{ width: "100px", height: "100px" }}
           className="rounded-circle d-flex align-items-center justify-content-center border"
          >
           <i className="fa fa-user fa-3x"></i>
          </div>
          <div>
           <span>
            <b>Name</b>: {userInfo.name}
           </span>{" "}
           <br />
           <span>
            <b>Email</b>: {userInfo.email}
           </span>{" "}
           <br />
           <button className="btn btn-danger mt-2" onClick={logoutFunc}>
            Logout
           </button>
          </div>
         </div>
        </>
       )}
      </div>
     </div>
     <div className="card mt-5">
      <div className="card-header d-flex justify-content-between">
       <h3>Your Orders</h3>
      </div>
      <div className="card-body">
       {loading && <h3>loading...</h3>}
       {!loading && (
        <>
         <div className="table-responsive">
          <table className="table table-bordered text-nowrap">
           <thead>
            <tr>
             <td>Id</td>
             <td>Tracking No</td>
             <td>Payment Method</td>
             <td>Total</td>
            </tr>
           </thead>
           <tbody>
            {userOrdres.length == 0 && (
             <tr>
              <td colSpan={4} className="text-muted text-center">
               There Is No Orders Yet! <Link to={"/shop"}>Shop Now</Link>
              </td>
             </tr>
            )}
            {userOrdres.length > 0 &&
             userOrdres.map((order, index) => {
              return (
               <tr key={index}>
                <td>#{order.id}</td>
                <td>{order.tracking_no}</td>
                <td>{order.payment_mode}</td>
                <td>${order.total_order_products}</td>
               </tr>
              );
             })}
           </tbody>
          </table>
         </div>
        </>
       )}
      </div>
     </div>
    </div>
   )}
  </div>
 );
}

export default UserProfile;
