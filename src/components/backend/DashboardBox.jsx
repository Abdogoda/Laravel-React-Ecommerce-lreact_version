import React from "react";

function DashboardBox({ color, name, count, icon }) {
 return (
  <div className={`col-md-4 col-lg-3 mb-2`}>
   <div className={`rounded p-3 bg-${color} shadow`}>
    <div className="d-flex justify-content-between mb-2">
     <h1 className="text-white">{count}</h1>
     <i className={`fa fa-${icon} fa-3x text-white`}></i>
    </div>
    <div className="text-end text-white">{name}</div>
   </div>
  </div>
 );
}

export default DashboardBox;
