import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DashboardBox from "../../components/backend/DashboardBox";

function Dashborad() {
 const [loading, setLoading] = useState(false);
 const [data, setData] = useState({});
 const getDashboardData = () => {
  setLoading(true);
  axios
   .get("/api/get-dashboard-data")
   .then((res) => {
    if (res.data.status === 200) {
     setData(res.data.data);
     setLoading(false);
     console.log(res.data.data);
    } else {
     swal("Error", res.data.message, "error");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 useEffect(() => {
  getDashboardData();
 }, []);
 return (
  <div className="container-fluid px-4">
   <h1 className="mt-4">Dashboard</h1>
   <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item active">Admin Dashboard</li>
   </ol>

   <div>
    {loading && <h3 className="text-center">Loading...</h3>}
    {!loading && (
     <>
      {data.statistics && (
       <div className="row">
        <DashboardBox
         color={"danger"}
         name={"Clients"}
         count={data.statistics.users}
         icon={"users"}
        />
        <DashboardBox
         color={"success"}
         name={"Collections"}
         count={data.statistics.categories}
         icon={"list"}
        />
        <DashboardBox
         color={"primary"}
         name={"Products"}
         count={data.statistics.products}
         icon={"table"}
        />
        <DashboardBox
         color={"secondary"}
         name={"Orders"}
         count={data.statistics.orders}
         icon={"sack-dollar"}
        />
       </div>
      )}
     </>
    )}
   </div>
  </div>
 );
}

export default Dashborad;
