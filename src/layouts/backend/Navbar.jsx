import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/AuthContext";
import axios from "axios";
import swal from "sweetalert";

function Navbar() {
 const { setToken, setUserName } = useStateContext();
 const navigate = useNavigate();
 var { search } = useParams();
 const [searchInput, setSearchInput] = useState(search);
 const onSearchFunc = () => {
  navigate(`/admin/products/${searchInput}`);
 };
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
  <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
   <Link to="/admin/dashboard" className="navbar-brand ps-3">
    Ecom Dashboard
   </Link>
   <button
    className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 sidebarToggle"
    id="sidebarToggle"
    type="button"
   >
    <i className="fas fa-bars"></i>
   </button>
   <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
    <div className="input-group">
     <input
      className="form-control"
      type="text"
      placeholder="Search for..."
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      aria-label="Search for..."
      aria-describedby="btnNavbarSearch"
     />
     <button onClick={onSearchFunc} className="btn btn-primary">
      <i className="fa fa-search"></i>
     </button>
    </div>
   </form>
   <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
    <li className="nav-item dropdown">
     <Link
      to="#"
      className="nav-link dropdown-toggle"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
     >
      <i className="fas fa-user fa-fw"></i>
     </Link>
     <ul
      className="dropdown-menu dropdown-menu-end"
      aria-labelledby="navbarDropdown"
     >
      <li>
       <Link className="dropdown-item" to="#">
        Settings
       </Link>
      </li>
      <li>
       <Link className="dropdown-item" to="/admin/profile">
        Profile
       </Link>
      </li>
      <li>
       <hr className="dropdown-divider" />
      </li>
      <li>
       <Link className="dropdown-item" to="#" onClick={logoutFunc}>
        Logout
       </Link>
      </li>
     </ul>
    </li>
   </ul>
  </nav>
 );
}

export default Navbar;
