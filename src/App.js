import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
 const token = localStorage.getItem("AUTH_TOKEN");
 config.headers.Authorization = token ? `Bearer ${token}` : "";
 return config;
});
function App() {
 return (
  <div className="App">
   <React.StrictMode>
    <AuthContext>
     <RouterProvider router={routes} />
    </AuthContext>
   </React.StrictMode>
  </div>
 );
}

export default App;
