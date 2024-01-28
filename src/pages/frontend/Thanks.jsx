import React from "react";
import { Link } from "react-router-dom";

function Thanks() {
 return (
  <div className="py-3 container">
   <div className="card">
    <div className="card-header bg-dark text-white">
     <h5>
      <Link className="text-light" style={{ textDecoration: "none" }} to={"/"}>
       Home
      </Link>{" "}
      / Thanks Page
     </h5>
    </div>
    <div className="card-body">
     <h3 className="text-center">
      Thank You For Shoppping From Our Website😍🥰
     </h3>
    </div>
   </div>
  </div>
 );
}

export default Thanks;
