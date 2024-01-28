import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
 return (
  <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
   <div className="sb-sidenav-menu">
    <div className="nav">
     <div className="sb-sidenav-menu-heading">MAIN</div>
     <Link to="/admin/dashboard" className="nav-link">
      <div className="sb-nav-link-icon">
       <i className="fas fa-tachometer-alt"></i>
      </div>
      Dashboard
     </Link>
     <Link to="/admin/profile" className="nav-link">
      <div className="sb-nav-link-icon">
       <i className="fas fa-user"></i>
      </div>
      Profile
     </Link>
     <div className="sb-sidenav-menu-heading">PAGES</div>
     <Link
      to="#"
      className="nav-link collapsed"
      data-bs-toggle="collapse"
      data-bs-target="#collapseCategory"
      aria-expanded="false"
      aria-controls="collapseCategory"
     >
      <div className="sb-nav-link-icon">
       <i className="fas fa-columns"></i>
      </div>
      Category
      <div className="sb-sidenav-collapse-arrow">
       <i className="fas fa-angle-down"></i>
      </div>
     </Link>
     <div
      className="collapse"
      id="collapseCategory"
      aria-labelledby="headingOne"
      data-bs-parent="#sidenavAccordion"
     >
      <nav className="sb-sidenav-menu-nested nav">
       <Link to="/admin/category" className="nav-link">
        View Category
       </Link>
       <Link to="/admin/category/add" className="nav-link">
        Add Category
       </Link>
      </nav>
     </div>
     <Link
      to="#"
      className="nav-link collapsed"
      data-bs-toggle="collapse"
      data-bs-target="#collapseProducts"
      aria-expanded="false"
      aria-controls="collapseProducts"
     >
      <div className="sb-nav-link-icon">
       <i className="fas fa-table"></i>
      </div>
      Products
      <div className="sb-sidenav-collapse-arrow">
       <i className="fas fa-angle-down"></i>
      </div>
     </Link>
     <div
      className="collapse"
      id="collapseProducts"
      aria-labelledby="headingOne"
      data-bs-parent="#sidenavAccordion"
     >
      <nav className="sb-sidenav-menu-nested nav">
       <Link to="/admin/products" className="nav-link">
        View Products
       </Link>
       <Link to="/admin/product/add" className="nav-link">
        Add Product
       </Link>
      </nav>
     </div>
     <Link
      to="#"
      className="nav-link collapsed"
      data-bs-toggle="collapse"
      data-bs-target="#collapseOrders"
      aria-expanded="false"
      aria-controls="collapseOrders"
     >
      <div className="sb-nav-link-icon">
       <i className="fas fa-cart-shopping"></i>
      </div>
      Orders
      <div className="sb-sidenav-collapse-arrow">
       <i className="fas fa-angle-down"></i>
      </div>
     </Link>
     <div
      className="collapse"
      id="collapseOrders"
      aria-labelledby="headingOne"
      data-bs-parent="#sidenavAccordion"
     >
      <nav className="sb-sidenav-menu-nested nav">
       <Link to="/admin/orders" className="nav-link">
        View Orders
       </Link>
      </nav>
     </div>
     <div className="sb-sidenav-menu-heading">Additions</div>
     <Link href="/admin/dashboard" className="nav-link">
      <div className="sb-nav-link-icon">
       <i className="fas fa-gear"></i>
      </div>
      Settings
     </Link>
    </div>
   </div>
  </nav>
 );
}

export default Sidebar;
