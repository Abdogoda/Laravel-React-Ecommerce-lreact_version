import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/AuthContext";
import swal from "sweetalert";

function Profile() {
 const { setToken, setUserName } = useStateContext();
 const [loading, setLoading] = useState(false);
 const [adminInfo, setAdminInfo] = useState({});
 const navigate = useNavigate();
 const getAdminInfo = () => {
  setLoading(true);
  axios
   .get("/api/get-user-info")
   .then((res) => {
    if (res.data.status === 401) {
     swal("Unauthorized", res.data.message, "error");
     navigate("/login");
    } else if (res.data.status === 200) {
     setAdminInfo(res.data.user);
     setLoading(false);
    } else {
     swal("Error", res.data.message, "error");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 useEffect(() => {
  getAdminInfo();
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
      } else {
       console.log(res);
      }
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
  <div className="container-fluid px-4">
   <h1 className="mt-4">Profile</h1>
   <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item">
     <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
      Dashboard
     </Link>
    </li>
    <li className="breadcrumb-item active">Profile</li>
   </ol>
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
          <b>Name</b>: {adminInfo.name}
         </span>{" "}
         <br />
         <span>
          <b>Email</b>: {adminInfo.email}
         </span>{" "}
         <br />
         <button className="btn btn-danger" onClick={logoutFunc}>
          Logout
         </button>
        </div>
       </div>
      </>
     )}
    </div>
   </div>
  </div>
 );
}

export default Profile;
