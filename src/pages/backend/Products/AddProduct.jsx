import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

function AddProduct() {
 const { productId } = useParams();
 const [categories, setCategories] = useState([]);
 const [errors, setErrors] = useState([]);
 const [data, setData] = useState({
  category_id: 1,
  name: "",
  slug: "",
  description: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  brand: "",
  selling_price: 0,
  original_price: 0,
  qty: 1,
  featured: false,
  popular: false,
  status: false,
 });
 const [image, setImage] = useState({ image: "" });
 const handleInputs = (ev) => {
  setData({ ...data, [ev.target.name]: ev.target.value });
 };
 const handleImage = (ev) => {
  setImage({ file: ev.target.files[0] });
 };
 const getCategories = () => {
  axios
   .get("/api/get-categories")
   .then((res) => {
    if (res.data.status === 200) {
     setCategories(res.data.categories);
    } else {
     swal("Error", "Something went wrong!", "danger");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 const getProduct = (id) => {
  axios
   .get(`/api/get-product/${id}`)
   .then((res) => {
    if (res.data.status === 200) {
     var product = res.data.product;
     setData({
      category_id: product.category_id,
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      meta_title: product.meta_title,
      meta_description: product.meta_description || "",
      meta_keywords: product.meta_keywords || "",
      brand: product.brand,
      selling_price: product.selling_price,
      original_price: product.original_price,
      qty: product.qty,
      featured: product.featured === 0 ? false : true,
      popular: product.popular === 0 ? false : true,
      status: product.status === 0 ? false : true,
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
  getCategories();
  if (productId) {
   getProduct(productId);
  }
 }, []);
 const onSubmitFunc = (ev) => {
  ev.preventDefault();
  var url = "/api/add-product";
  if (productId) {
   url = `/api/update-product/${productId}`;
  }
  const config = {
   headers: {
    "content-type": "multipart/form-data",
   },
  };
  const formData = new FormData();
  if (image.file) {
   formData.append("image", image.file);
  }
  formData.append("slug", data.slug);
  formData.append("name", data.name);
  formData.append("category_id", data.category_id);
  formData.append("description", data.description);
  formData.append("meta_title", data.meta_title);
  formData.append("meta_keywords", data.meta_keywords);
  formData.append("meta_description", data.meta_description);
  formData.append("brand", data.brand);
  formData.append("qty", data.qty);
  formData.append("selling_price", data.selling_price);
  formData.append("original_price", data.original_price);
  formData.append("featured", data.featured ? 1 : 0);
  formData.append("popular", data.popular ? 1 : 0);
  formData.append("status", data.status ? 1 : 0);
  axios
   .post(url, formData, config)
   .then((res) => {
    if (res.data.status === 200) {
     swal("Success", res.data.message, "success");
     setErrors({});
     if (productId) {
      getProduct(productId);
     } else {
      setData({
       category_id: 1,
       name: "",
       slug: "",
       description: "",
       meta_title: "",
       meta_description: "",
       meta_keywords: "",
       brand: "",
       selling_price: 0,
       original_price: 0,
       qty: 1,
       featured: false,
       popular: false,
       status: false,
      });
      setImage({ file: "" });
     }
    } else if (res.data.status === 422) {
     setErrors({ ...res.data.errors });
     swal("Warning", "Please Fill All Required Fields!", "warning");
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 return (
  <div className="container-fluid px-4">
   <h1 className="mt-4">Add Products</h1>
   <ol className="breadcrumb mb-4">
    <li className="breadcrumb-item">
     <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
      Dashboard
     </Link>
    </li>
    <li className="breadcrumb-item">
     <Link to="/admin/products" style={{ textDecoration: "none" }}>
      Products
     </Link>
    </li>
    <li className="breadcrumb-item active">{productId ? data.slug : "Add"}</li>
   </ol>

   <div className="card">
    <div className="card-header d-flex justify-content-between">
     <h3>Add New Product</h3>
     <Link to={"/admin/products"} className="btn btn-sm btn-primary">
      View Product
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
      <li className="nav-item">
       <a className="nav-link" data-bs-toggle="tab" href="#other_details_tab">
        Other Details
       </a>
      </li>
     </ul>

     <form
      className="border rounded-bottom pt-3"
      onSubmit={onSubmitFunc}
      encType="multipart/form-data"
     >
      <div className="tab-content">
       <div className="tab-pane container active" id="home_tab">
        <div className="form-group mb-3">
         <label htmlFor="category_id">Product Category</label>
         <select
          name="category_id"
          id="category_id"
          className="form-control"
          onChange={handleInputs}
         >
          <option value="" disabled>
           Select Category
          </option>
          {categories &&
           categories.map((category, index) => {
            return (
             <option
              key={index}
              selected={category.id === data.category_id ? "selected" : ""}
              value={category.id}
             >
              {category.name}
             </option>
            );
           })}
         </select>
         {errors.category_id && (
          <span className="text-danger">{errors.category_id}</span>
         )}
        </div>
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
       <div className="tab-pane container fade" id="other_details_tab">
        <div className="row">
         <div className="col-md-4 form-group mb-3">
          <label htmlFor="selling_price">Selling Price</label>
          <input
           type="text"
           name="selling_price"
           id="selling_price"
           value={data.selling_price}
           onChange={handleInputs}
           className="form-control"
          />
         </div>
         <div className="col-md-4 form-group mb-3">
          <label htmlFor="original_price">Original Price</label>
          <input
           type="text"
           id="original_price"
           name="original_price"
           value={data.original_price}
           onChange={handleInputs}
           className="form-control"
          />
          {errors.original_price && (
           <span className="text-danger">{errors.original_price}</span>
          )}
         </div>
         <div className="col-md-4 form-group mb-3">
          <label htmlFor="qty">Quantity</label>
          <input
           type="number"
           id="qty"
           name="qty"
           min={1}
           value={data.qty}
           onChange={handleInputs}
           className="form-control"
          />
          {errors.quantity && (
           <span className="text-danger">{errors.quantity}</span>
          )}
         </div>
         <div className="col-md-4 form-group mb-3">
          <label htmlFor="brand">Brand</label>
          <input
           type="text"
           name="brand"
           value={data.brand}
           onChange={handleInputs}
           className="form-control"
          />
          {errors.brand && <span className="text-danger">{errors.brand}</span>}
         </div>
         <div className="col-md-8 form-group mb-3">
          <label htmlFor="image">Upload Image</label>
          <input
           type="file"
           name="image"
           onChange={handleImage}
           accept="image/png, image/jpeg"
           className="form-control"
          />
          {errors.image && <span className="text-danger">{errors.image}</span>}
         </div>
         <div className="col-md-4 mb-3 d-flex gap-2 align-items-center">
          <label htmlFor="status">Status (Show | Hidden)</label>
          <input
           type="checkbox"
           name="status"
           id="status"
           checked={data.status ? "checked" : ""}
           onChange={(e) => setData({ ...data, status: e.target.checked })}
          />
         </div>
         <div className="col-md-4 mb-3 d-flex gap-2 align-items-center">
          <label htmlFor="featured">Featured (Show | Hidden)</label>
          <input
           type="checkbox"
           name="featured"
           id="featured"
           checked={data.featured ? "checked" : ""}
           onChange={(e) => setData({ ...data, featured: e.target.checked })}
          />
         </div>
         <div className="col-md-4 mb-3 d-flex gap-2 align-items-center">
          <label htmlFor="popular">popular (Show | Hidden)</label>
          <input
           type="checkbox"
           name="popular"
           id="popular"
           checked={data.popular ? "checked" : ""}
           onChange={(e) => setData({ ...data, popular: e.target.checked })}
          />
         </div>
        </div>
       </div>
       <button type="submit" className="btn btn-primary px-4 m-4">
        {productId && "Update Product"}
        {!productId && "Add Product"}
       </button>
      </div>
     </form>
    </div>
   </div>
  </div>
 );
}

export default AddProduct;
