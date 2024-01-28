import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

function Product() {
 const [loading, setLoading] = useState(false);
 const [products, setProducts] = useState([]);
 const { search } = useParams();
 const getProducts = (search = null) => {
  setLoading(true);
  var url = "/api/get-products";
  if (search) {
   url = `/api/get-search-products/${search}`;
  }
  axios
   .get(url)
   .then((res) => {
    if (res.data.status === 200) {
     setProducts(res.data.products);
     setLoading(false);
    } else {
     swal("Error 404", "Something went wrong!", "error");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 useEffect(() => {
  if (search !== "" && search !== null) {
   getProducts(search);
  } else {
   getProducts();
  }
 }, []);
 const onDeleteFunc = (id) => {
  axios.post(`/api/delete-product/${id}`).then((res) => {
   if (res.data.status === 200) {
    swal("Success", res.data.message, "success");
    getProducts();
   }
  });
 };
 return (
  <div className="container-fluid px-4">
   <h1 className="mt-4">Veiw Products</h1>
   <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item">
     <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
      Dashboard
     </Link>
    </li>
    <li className="breadcrumb-item active">Products</li>
   </ol>

   <div className="card">
    <div className="card-header d-flex justify-content-between">
     <h3>All Products</h3>
     <Link to={"/admin/product/add"} className="btn btn-sm btn-primary">
      Add Product <i className="fa fa-plus"></i>
     </Link>
    </div>
    <div className="card-body">
     {loading && <p>Loading...</p>}
     {!loading && (
      <div className="table-responsive">
       <table className="table table-bordered text-nowrap">
        <thead>
         <tr>
          <td>Id</td>
          <td>Image</td>
          <td>Name</td>
          <td>Category</td>
          <td>Brand</td>
          <td>Status</td>
          <td>SellingPrice</td>
          <td>Operations</td>
         </tr>
        </thead>
        <tbody>
         {products.length === 0 && (
          <tr>
           <td colSpan={7} className="text-center text-muted">
            No Products Available!
           </td>
          </tr>
         )}
         {products.length > 0 &&
          products.map((product, index) => {
           return (
            <tr key={index}>
             <td>#{product.id}</td>
             <td>
              <img
               src={`http://localhost:8000${product.image}`}
               alt={`p-${index}-img`}
               width="50px"
               className="p-1 border"
              />
             </td>
             <td>{product.name}</td>
             <td>{product.category.name}</td>
             <td>{product.brand}</td>
             <td>
              {product.status == 0 ? (
               <span className="badge bg-success">Show</span>
              ) : (
               <span className="badge bg-danger">Hidden</span>
              )}
             </td>
             <td>{product.selling_price}$</td>
             <td className="d-flex flex-wrap align-items-center gap-2">
              <Link
               to={`/admin/product/${product.id}`}
               className="btn btn-primary btn-sm"
              >
               Edit <i className="fa fa-edit"></i>
              </Link>
              <button
               type="button"
               onClick={() => onDeleteFunc(product.id)}
               className="btn btn-danger btn-sm"
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

export default Product;
