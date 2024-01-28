import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

function AddCategory() {
 const { categoryId } = useParams();
 const [data, setData] = useState({
  slug: "",
  name: "",
  description: "",
  status: "off",
  meta_description: "",
  meta_title: "",
  meta_keywords: "",
 });
 const getCategory = (id) => {
  axios
   .get(`/api/get-category/${categoryId}`)
   .then((res) => {
    if (res.data.status === 200) {
     var category = res.data.category;

     setData({
      slug: category.slug,
      name: category.name,
      description: category.description || "",
      status: category.status === 0 ? false : true,
      meta_description: category.meta_description || "",
      meta_title: category.meta_title,
      meta_keywords: category.meta_keywords || "",
     });
    } else {
     swal("Error", "Something went wrong!", "danger");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 useEffect(() => {
  if (categoryId) {
   getCategory(categoryId);
  }
 }, []);
 const [errors, setErrors] = useState({});
 const handleInputs = (ev) => {
  setData({ ...data, [ev.target.name]: ev.target.value });
 };
 const onSubmitFunc = (ev) => {
  ev.preventDefault();
  var url = "/api/add-category";
  if (categoryId) {
   url = `/api/update-category/${categoryId}`;
  }
  axios
   .post(url, data)
   .then((res) => {
    if (res.data.status === 200) {
     swal("Success", res.data.message, "success");
     setErrors({});
     if (categoryId) {
      getCategory(categoryId);
     } else {
      setData({
       slug: "",
       name: "",
       description: "",
       status: "off",
       meta_description: "",
       meta_title: "",
       meta_keywords: "",
      });
     }
    } else if (res.data.status === 400) {
     setErrors({ ...res.data.errors });
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 return (
  <div className="container-fluid px-4">
   <h1 className="mt-4">Add Category</h1>
   <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item">
     <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
      Dashboard
     </Link>
    </li>
    <li className="breadcrumb-item">
     <Link to="/admin/category" style={{ textDecoration: "none" }}>
      Categories
     </Link>
    </li>
    <li className="breadcrumb-item active">{categoryId ? data.slug : "Add"}</li>
   </ol>

   <div className="card">
    <div className="card-header d-flex justify-content-between">
     <h3>Add New Category</h3>
     <Link to={"/admin/category"} className="btn btn-sm btn-primary">
      View Categories
     </Link>
    </div>
    <div className="card-body">
     <ul className="nav nav-tabs border-bottom-0">
      <li className="nav-item">
       <a className="nav-link active" data-bs-toggle="tab" href="#home_tab">
        Home
       </a>
      </li>
      <li className="nav-item">
       <a className="nav-link" data-bs-toggle="tab" href="#seo_tags_tab">
        SEO Tags
       </a>
      </li>
     </ul>

     <form className="border rounded-bottom  pt-3" onSubmit={onSubmitFunc}>
      <div className="tab-content">
       <div className="tab-pane container active" id="home_tab">
        <div className="form-group mb-3">
         <label htmlFor="slug">Slug</label>
         <input
          type="text"
          name="slug"
          value={data.slug}
          onChange={handleInputs}
          className="form-control"
         />
         {errors.slug && <span className="text-danger">{errors.slug}</span>}
        </div>
        <div className="form-group mb-3">
         <label htmlFor="name">Name</label>
         <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleInputs}
          className="form-control"
         />
         {errors.name && <span className="text-danger">{errors.name}</span>}
        </div>
        <div className="form-group mb-3">
         <label htmlFor="description">Description</label>
         <textarea
          name="description"
          value={data.description}
          onChange={handleInputs}
          className="form-control"
         >
          {data.description}
         </textarea>
         {errors.description && (
          <span className="text-danger">{errors.description}</span>
         )}
        </div>
        <div className="form-group mb-3">
         <label htmlFor="status">Status (Show | Hidden)</label>
         <input
          type="checkbox"
          name="status"
          checked={data.status ? "checked" : ""}
          onChange={(e) => setData({ ...data, status: e.target.checked })}
         />
        </div>
       </div>
       <div className="tab-pane container fade" id="seo_tags_tab">
        <div className="form-group mb-3">
         <label htmlFor="meta_title">Meta Title</label>
         <input
          type="text"
          name="meta_title"
          value={data.meta_title}
          onChange={handleInputs}
          className="form-control"
         />
         {errors.meta_title && (
          <span className="text-danger">{errors.meta_title}</span>
         )}
        </div>
        <div className="form-group mb-3">
         <label htmlFor="meta_keywords">Meta Keywords</label>
         <textarea
          name="meta_keywords"
          value={data.meta_keywords}
          onChange={handleInputs}
          className="form-control"
         >
          {data.meta_keywords}
         </textarea>
         {errors.meta_keywords && (
          <span className="text-danger">{errors.meta_keywords}</span>
         )}
        </div>
        <div className="form-group mb-3">
         <label htmlFor="meta_description">Meta Description</label>
         <textarea
          name="meta_description"
          value={data.meta_description}
          onChange={handleInputs}
          className="form-control"
         >
          {data.meta_description}
         </textarea>
         {errors.meta_description && (
          <span className="text-danger">{errors.meta_description}</span>
         )}
        </div>
       </div>
       <button type="submit" className="btn btn-primary px-4 m-4">
        {categoryId && "Update Category"}
        {!categoryId && "Add Category"}
       </button>
      </div>
     </form>
    </div>
   </div>
  </div>
 );
}

export default AddCategory;
