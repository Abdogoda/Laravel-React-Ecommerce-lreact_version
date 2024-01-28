import React from "react";
import { Link } from "react-router-dom";
import a1 from "../../assets/frontend/img/about/a1.png";
import a2 from "../../assets/frontend/img/about/a2.png";
import a3 from "../../assets/frontend/img/about/a3.jpg";
import a4 from "../../assets/frontend/img/about/a4.jpg";

function About() {
 return (
  <div className="py-5 container ">
   <div className="section-header">
    <h1>About Us</h1>
   </div>
   <div className="row">
    <div className="col-md-6">
     <h3 className="text-dark">
      <b>
       About <span className="logo">ECOMMERCE</span>
      </b>
     </h3>
     <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi animi vero
      corrupti architecto. Autem eius quos optio. Dolore odio placeat, saepe
      quos vero voluptate a recusandae eum, asperiores, obcaecati nesciunt!
     </p>
     <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi animi vero
      corrupti architecto. Autem eius quos optio. Dolore odio placeat, saepe
      quos vero voluptate a recusandae eum, asperiores, obcaecati nesciunt!
     </p>
     <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi animi vero
      corrupti architecto. Autem eius quos optio. Dolore odio placeat, saepe
      quos vero voluptate a recusandae eum, asperiores, obcaecati nesciunt!
     </p>
     <div className="d-flex gap-2 product-links">
      <Link to={`/shop`} className="btn btn-dark ">
       Shop Now
      </Link>
      <Link to={`/contact`} className="btn btn-dark ">
       Contact Us
      </Link>
     </div>
    </div>
    <div className="col-md-6 p-3 ">
     <div className="row about-images">
      <div className="col-6 p-2">
       <img src={a1} alt="a1" className="border shadow" />
      </div>
      <div className="col-6 p-2">
       <img src={a2} alt="a2" className="border shadow" />
      </div>
      <div className="col-6 p-2">
       <img src={a3} alt="a3" className="border shadow" />
      </div>
      <div className="col-6 p-2">
       <img src={a4} alt="a4" className="border shadow" />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

export default About;
