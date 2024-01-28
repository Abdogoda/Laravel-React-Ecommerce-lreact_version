import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer({ categories }) {
 const [collections, setCollections] = useState([]);
 useEffect(() => {
  setCollections(categories);
 }, [categories]);
 return (
  <footer className="bg-dark p-3">
   <div className="container">
    <div className="mb-4">
     <h3 className="logo">
      <Link to={`/`}>
       <i className="fa fa-shopping-cart"></i> ECOMMERCE
      </Link>
     </h3>
    </div>
    <div className="row">
     <div className="col-md-6 col-lg-3">
      <h5 className="text-white">Solution</h5>
      <ul>
       <li>
        <a href="">
         <span>Interprise App Development</span>
        </a>
       </li>
       <li>
        <a href="">
         <span>Android App Development</span>
        </a>
       </li>
       <li>
        <a href="">
         <span>ios App Development</span>
        </a>
       </li>
      </ul>
     </div>
     <div className="col-md-6 col-lg-3">
      <h5 className="text-white">Collections</h5>
      <ul>
       {collections.length > 0 &&
        collections.map((collection, index) => {
         return (
          <li key={index}>
           <Link to={`/collections/${collection.slug}`}>
            <span>{collection.name}</span>
           </Link>
          </li>
         );
        })}
      </ul>
     </div>
     <div className="col-md-6 col-lg-3">
      <h5 className="text-white">Quick Links</h5>
      <ul>
       <li>
        <Link to={`/`}>
         <span>Home</span>
        </Link>
       </li>
       <li>
        <Link to={`/about`}>
         <span>About Us</span>
        </Link>
       </li>
       <li>
        <Link to={`/shop`}>
         <span>Shop Now</span>
        </Link>
       </li>
       <li>
        <Link to={`/contact`}>
         <span>Contact Us</span>
        </Link>
       </li>
      </ul>
     </div>
     <div className="col-md-6 col-lg-3" id="newsletter">
      <h5 className="text-white">Stay Connected</h5>
      <div className="social-links social-2">
       <a href="">
        <i className="fab fa-facebook-f"></i>
       </a>
       <a href="">
        <i className="fab fa-twitter"></i>
       </a>
       <a href="">
        <i className="fab fa-instagram"></i>
       </a>
       <a href="">
        <i className="fab fa-tumblr"></i>
       </a>
       <a href="">
        <i className="fab fa-reddit-alien"></i>
       </a>
      </div>

      <div id="address">
       <h5 className="text-white mt-4">Office Location</h5>
       <ul>
        <li>
         <i className="far fa-building"></i> Los Angeles
         <br />
         Office 9B, Sky High Tower, New A Ring Road, Los Angeles
        </li>
       </ul>
      </div>
     </div>
    </div>
   </div>
  </footer>
 );
}

export default Footer;
