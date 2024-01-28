import React, { useState } from "react";
import contact from "../../assets/frontend/img/contact.svg";
import axios from "axios";
import swal from "sweetalert";

function Contact() {
 const [errors, setErrors] = useState({});
 const [data, setData] = useState({
  name: "",
  email: "",
  phone: "",
  message: "",
 });
 const handleInputs = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
 };
 const onSubmitFunc = (e) => {
  e.preventDefault();
  axios
   .post("/api/front-send-message", data)
   .then((res) => {
    if (res.data.status === 422) {
     swal("Warning", "Please Check All Fields!", "warning");
     setErrors(res.data.errors);
    } else if (res.data.status === 200) {
     swal("Success", res.data.message, "success");
     setData({ name: "", email: "", phone: "", message: "" });
    }
   })
   .catch((err) => {
    console.error(err);
   });
 };
 return (
  <div className="py-5 container ">
   <div className="section-header">
    <h1>Contact Us</h1>
   </div>
   <div className="row">
    <div className="col-md-6">
     <h3 className="">Contact Us</h3>
     <p className="mb-3">We Are Happpy To Receive Your Message</p>
     <form action="" onSubmit={onSubmitFunc}>
      <div className="form-group mb-4">
       <label htmlFor="name">Name</label>
       <input
        type="text"
        value={data.name}
        onChange={handleInputs}
        id="name"
        name="name"
        className="form-control"
       />
       {errors.name && <span className="text-danger">*{errors.name}</span>}
      </div>
      <div className="form-group mb-4">
       <label htmlFor="email">Email</label>
       <input
        type="email"
        value={data.email}
        onChange={handleInputs}
        id="email"
        name="email"
        className="form-control"
       />
       {errors.email && <span className="text-danger">*{errors.email}</span>}
      </div>
      <div className="form-group mb-4">
       <label htmlFor="phone">Phone</label>
       <input
        type="text"
        value={data.phone}
        onChange={handleInputs}
        id="phone"
        name="phone"
        className="form-control"
       />
       {errors.phone && <span className="text-danger">*{errors.phone}</span>}
      </div>
      <div className="form-group mb-4">
       <label htmlFor="message">Your Message</label>
       <textarea
        value={data.message}
        onChange={handleInputs}
        id="message"
        name="message"
        className="form-control"
       ></textarea>
       {errors.message && (
        <span className="text-danger">*{errors.message}</span>
       )}
      </div>
      <div className="product-links">
       <button type="submit" className="btn btn-dark">
        Send Message
       </button>
      </div>
     </form>
    </div>
    <div className="col-md-6">
     <img src={contact} alt="contact-image" />
    </div>
   </div>
  </div>
 );
}

export default Contact;
