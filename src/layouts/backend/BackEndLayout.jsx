import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../../assets/backend/css/styles.css";
import "../../assets/backend/js/scripts";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function BackEndLayout() {
 const [isAuth, setIsAuth] = useState(false);
 const navigate = useNavigate();
 useEffect(() => {
  axios
   .get("/api/checkAuth")
   .then((res) => {
    if (res.status === 200) {
     setIsAuth(true);
    } else if (res.status === 403) {
     swal("Forbidden", res.data.message, "error");
     console.log(res);
    }
   })
   .catch((err) => {
    if (err.status === 403) {
     swal("Forbidden", err.response.message, "error");
     console.error(err);
    }
   });
  axios.interceptors.response.use(undefined, function (err) {
   if (err.response) {
    if (err.response.status === 401) {
     swal("Unauthorized", err.response.data.message, "error");
     navigate("/login");
    } else if (err.response.status === 403) {
     swal("Forbidden", err.response.data.message, "error");
     navigate("/");
    } else if (err.response.status === 404) {
     swal("404 Error", "Page Not Found", "error");
     navigate("/");
    }
   }
  });
 }, []);
 return (
  <div className="sb-nav-fixed">
   <Navbar />
   <div id="layoutSidenav">
    <div id="layoutSidenav_nav">
     <Sidebar />
    </div>
    <div id="layoutSidenav_content">
     <main>
      {!isAuth && <p>Loading...</p>}
      {isAuth && <Outlet />}
     </main>
    </div>
   </div>
  </div>
 );
}

export default BackEndLayout;
