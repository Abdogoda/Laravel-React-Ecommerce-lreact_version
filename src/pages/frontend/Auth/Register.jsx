import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useStateContext } from "../../../context/AuthContext";

function Register() {
 const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate();
 const [data, setData] = useState({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
 });
 const [errors, setErrors] = useState([]);
 const { setUserName, setToken, token, username } = useStateContext();
 useEffect(() => {
  if (token !== "" || username !== "") {
   navigate("/");
  }
 }, [token, username]);
 const handleInputs = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
 };
 const registerFunc = (ev) => {
  ev.preventDefault();
  axios.get("/sanctum/csrf-cookie").then((res) => {
   axios
    .post("/api/register", data)
    .then((res) => {
     if (res.data.validation_errors) {
      setErrors(res.data.validation_errors);
     } else if (res.data.status === 200) {
      setToken(res.data.token);
      setUserName(res.data.username);
      swal("Success", res.data.message, "success");
      navigate("/");
     } else {
      console.log(res);
     }
    })
    .catch((err) => {
     swal("Error", err.message, "error");
     console.error(err);
    });
  });
 };
 return (
  <div className="container py-5">
   <div className="row justify-content-center">
    <div className="col-md-6">
     <div className="card">
      <div className="card-header">
       <h4>SignUp Form</h4>
      </div>
      <div className="card-body">
       <form action="" onSubmit={registerFunc}>
        <div className="form-group mb-3">
         <label htmlFor="name">Full Name</label>
         <input
          type="text"
          id="name"
          className="form-control"
          name="name"
          value={data.name}
          onChange={handleInputs}
         />
         {errors.name && <span className="text-danger">*{errors.name}</span>}
        </div>
        <div className="form-group mb-3">
         <label htmlFor="email">Email Address</label>
         <input
          type="email"
          id="email"
          className="form-control"
          name="email"
          value={data.email}
          onChange={handleInputs}
         />
         {errors.email && <span className="text-danger">*{errors.email}</span>}
        </div>
        <div className="form-group mb-3">
         <label htmlFor="password">Password</label>
         <input
          type="text"
          id="password"
          className="form-control"
          name="password"
          value={data.password}
          onChange={handleInputs}
         />
         {errors.password && (
          <span className="text-danger">*{errors.password}</span>
         )}
        </div>
        <div className="form-group mb-3">
         <label htmlFor="password_confirmation">Password Confirmation</label>
         <input
          type="text"
          id="password_confirmation"
          className="form-control"
          name="password_confirmation"
          value={data.password_confirmation}
          onChange={handleInputs}
         />
        </div>
        <div className="form-group mb-3">
         <button type="submit" className="btn btn-primary">
          Register
         </button>
        </div>
        <p>
         Already Have An Account? <Link to={"/login"}>Login Now</Link>
        </p>
       </form>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

export default Register;
