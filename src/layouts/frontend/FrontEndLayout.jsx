import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../frontend/Navbar";
import axios from "axios";
import Footer from "./Footer";
import swal from "sweetalert";

function FrontEndLayout() {
 const [loading, setLoading] = useState(true);
 const [collections, setCollections] = useState([]);
 const navigate = useNavigate();
 const getCollections = () => {
  setLoading(true);
  axios
   .get("/api/front-get-categories")
   .then((res) => {
    if (res.data.status === 200) {
     setCollections(res.data.categories);
     setLoading(false);
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 useEffect(() => {
  getCollections();
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
  <div>
   <Navbar />
   <div>
    <Outlet />
   </div>
   {!loading && <Footer categories={collections} />}
  </div>
 );
}

export default FrontEndLayout;
