import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Category() {
 const [loading, setLoading] = useState(true);
 const [categories, setCategories] = useState([]);
 const getCategories = () => {
  axios
   .get("/api/get-categories")
   .then((res) => {
    if (res.data.status === 200) {
     setCategories(res.data.categories);
     setLoading(false);
    } else {
     swal("Error", "Something went wrong!", "danger");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 useEffect(() => {
  getCategories();
 }, []);
 const onDeleteFunc = (id) => {
  swal({
   title: "Warning",
   text: "Are you sure you want to delete this category?",
   icon: "warning",
   buttons: true,
   dangerMode: true,
  }).then((willDelete) => {
   if (willDelete) {
    axios
     .post(`/api/delete-category/${id}`)
     .then((res) => {
      if ((res.data.status = 200)) {
       swal("Success", res.data.message, "success");
       getCategories();
      } else {
       swal("Error", "Something Went Wrong!", "error");
      }
     })
     .catch((err) => {
      console.error(err);
     });
   }
  });
 };
 return (
  <div className="container-fluid px-4">
   <h1 className="mt-4">Veiw Categories</h1>
   <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item">
     <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
      Dashboard
     </Link>
    </li>
    <li className="breadcrumb-item active">Categories</li>
   </ol>

   <div className="card">
    <div className="card-header d-flex justify-content-between">
     <h3>All Categories</h3>
     <Link to={"/admin/category/add"} className="btn btn-sm btn-primary">
      Add Gategory <i className="fa fa-plus"></i>
     </Link>
    </div>
    <div className="card-body">
     {loading && <p>Loading...</p>}
     {!loading && (
      <div className="table-responsive">
       <table className="table table-bordered table-striped ">
        <thead>
         <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Slug</th>
          <th>Status</th>
          <th>Operation</th>
         </tr>
        </thead>
        <tbody>
         {categories.length == 0 && (
          <tr>
           <td colSpan={5} className="text-muted text-center">
            No Categories Found!
           </td>
          </tr>
         )}
         {categories.length > 0 &&
          categories.map((c, index) => {
           return (
            <tr key={index}>
             <td>#{c.id}</td>
             <td>{c.name}</td>
             <td>{c.slug}</td>
             <td>
              {c.status === 0 ? (
               <span className="badge bg-success">Show</span>
              ) : (
               <span className="badge bg-danger">Hidden</span>
              )}
             </td>
             <td className="d-flex gap-3 flex-wrap">
              <Link
               to={`/admin/category/${c.id}`}
               className="btn btn-sm btn-primary"
              >
               Edit <i className="fa fa-edit"></i>
              </Link>
              <button
               onClick={() => onDeleteFunc(c.id)}
               className="btn btn-sm btn-danger"
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

export default Category;
