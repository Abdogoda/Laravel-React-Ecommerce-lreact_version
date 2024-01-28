import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/AuthContext";
import axios from "axios";
import swal from "sweetalert";
function Navbar() {
 const { setToken, setUserName, username, token } = useStateContext();
 const [products, setProducts] = useState([]);
 const navigate = useNavigate();
 const getCartProducts = () => {
  axios.get(`/api/front-get-cart-products`).then((res) => {
   if (res.data.status === 200) {
    setProducts(res.data.cart_products);
   } else if (res.data.status === 401) {
    swal("Error", res.data.message, "error");
    navigate("/login");
   }
  });
 };
 useEffect(() => {
  if (token !== "") {
   //  getCartProducts();
  }
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
       navigate("/");
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
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-md sticky-top">
   <div className="container">
    <div className="logo">
     <Link to="/" className="navbar-brand">
      <i className="fa fa-shopping-cart"></i> Ecommerce
     </Link>
    </div>
    <button
     className="navbar-toggler"
     type="button"
     data-bs-toggle="collapse"
     data-bs-target="#navbarSupportedContent"
     aria-controls="navbarSupportedContent"
     aria-expanded="false"
     aria-label="Toggle navigation"
    >
     <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
       <Link className="nav-link " aria-current="page" to="/">
        Home
       </Link>
      </li>
      <li className="nav-item">
       <Link className="nav-link" aria-current="page" to="/shop">
        Shop
       </Link>
      </li>
      <li className="nav-item">
       <Link className="nav-link" aria-current="page" to="/about">
        About
       </Link>
      </li>
      <li className="nav-item">
       <Link className="nav-link" aria-current="page" to="/contact">
        Contact
       </Link>
      </li>
      {token !== "" && (
       <li className="nav-item">
        <Link className="nav-link p-relative" to="/cart">
         <i className="fa fa-shopping-cart"></i>
         {products.length > 0 && (
          <span className="badge badge-sm bg-danger">{products.length}</span>
         )}
        </Link>
       </li>
      )}
      <li className="nav-item dropdown">
       <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
       >
        <i className="fa fa-user"></i> {token !== "" && username}
       </a>
       <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        {token === "" && (
         <>
          <li>
           <Link className="dropdown-item" to="/register">
            Register
           </Link>
          </li>
          <li>
           <Link className="dropdown-item" to="/login">
            Login
           </Link>
          </li>
         </>
        )}
        {token !== "" && (
         <>
          <li>
           <Link className="dropdown-item" to="/profile">
            Profile
           </Link>
          </li>
          <li className="px-2">
           <button
            type="button"
            className="btn btn-danger w-100"
            onClick={logoutFunc}
           >
            Logout
           </button>
          </li>
         </>
        )}
       </ul>
      </li>
     </ul>
    </div>
   </div>
  </nav>
 );
}

export default Navbar;
