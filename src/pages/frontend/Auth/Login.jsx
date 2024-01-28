import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useStateContext } from "../../../context/AuthContext";

function Login() {
 const navigate = useNavigate();
 const [errors, setErrors] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [data, setData] = useState({
  email: "",
  password: "",
 });
 const { setUserName, setToken, token, username } = useStateContext();
 useEffect(() => {
  if (token !== "" || username !== "") {
   navigate("/");
  }
 }, [token, username]);
 const handleInputs = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
 };
 const loginFunc = (ev) => {
  ev.preventDefault();
  axios.get("/sanctum/csrf-cookie").then((res) => {
   axios
    .post("/api/login", data)
    .then((res) => {
     if (res.data.validation_errors) {
      setErrors(res.data.validation_errors);
     } else if (res.data.status === 401) {
      swal("Danger", res.data.message, "error");
     } else if (res.data.status === 200) {
      setToken(res.data.token);
      setUserName(res.data.username);
      swal("Success", res.data.message, "success");
      if (res.data.role_as === 0) {
       navigate("/");
      } else {
       navigate("/admin/dashboard");
      }
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
       <h4>SignIn Form</h4>
      </div>
      <div className="card-body">
       <form action="" onSubmit={loginFunc}>
        <div className="form-group mb-3">
         <label htmlFor="email">Email Address</label>
         <input
          type="text"
          id="email"
          className="form-control"
          name="email"
          onChange={handleInputs}
          value={data.email}
         />
         {errors.email && <span className="text-danger">*{errors.email}</span>}
        </div>
        <div className="form-group mb-3">
         <label htmlFor="password">Password</label>
         <input
          type="password"
          id="password"
          className="form-control"
          name="password"
          onChange={handleInputs}
          value={data.password}
         />
         {errors.password && (
          <span className="text-danger">*{errors.password}</span>
         )}
        </div>
        <div className="form-group mb-3">
         <button type="submit" className="btn btn-primary">
          Login
         </button>
        </div>
        <p>
         Don't Have An Account? <Link to={"/register"}>Register Now</Link>
        </p>
       </form>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

export default Login;
