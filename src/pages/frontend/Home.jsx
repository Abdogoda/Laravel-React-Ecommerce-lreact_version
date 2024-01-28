import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/frontend/css/style.css";
import ProductBox from "../../components/frontend/ProductBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Home() {
 const [loading, setLoading] = useState(true);
 const [data, setData] = useState({
  products: [],
  collections: [],
  featured: [],
  pupolar: [],
 });
 const getHomePage = () => {
  setLoading(true);
  axios
   .get("/api/front-homepage")
   .then((res) => {
    if (res.data.status === 200) {
     setData(res.data.data);
     setLoading(false);
    }
    console.log(res.data.data);
   })
   .catch((err) => {
    console.error(err);
   });
 };
 useEffect(() => {
  getHomePage();
 }, []);
 return (
  <>
   {/* hero section */}
   <section className="hero-section w-100">
    <div className="container h-100">
     <div className="row align-items-center h-100">
      <div className="col-md-6">
       <h1 className="logo">ECOMMERCE</h1>
       <p style={{ color: "#ddd" }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit dicta
        velit quia tempora ad pariatur eius suscipit quos facere, voluptate
        doloremque incidunt voluptas distinctio maxime labore architecto totam.
        Facere, aperiam.
       </p>
       <p style={{ color: "#ddd" }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit dicta
        velit quia tempora ad pariatur eius suscipit quos facere, voluptate
        doloremque incidunt voluptas distinctio maxime labore architecto totam.
        Facere, aperiam.
       </p>
       <Link to={"/shop"} className="btn btn-dark">
        Buy Now
       </Link>
      </div>
     </div>
    </div>
   </section>
   {/* collections section */}
   <section className="section">
    <div className="section-header">
     <h1>Our Collections</h1>
    </div>
    <div className="container">
     <div className="row justify-content-center">
      {loading && (
       <div className="col-12 text-center">
        <h1>Loading...</h1>
       </div>
      )}
      <Swiper
       spaceBetween={50}
       slidesPerView={3}
       pagination={{ clickable: true }}
       modules={[Pagination]}
      >
       {!loading &&
        data.collections.map((collection, index) => {
         return (
          <SwiperSlide className="col-md-4 col-lg-3 mb-3 p-3" key={index}>
           <div className="collection-box ">
            <div className="shadow p-3 text-center rounded">
             <Link
              to={`/collections/${collection.slug}`}
              className="fs-5 fw-bold text-dark"
              style={{ textDecoration: "none" }}
             >
              {collection.name}
             </Link>
            </div>
           </div>
          </SwiperSlide>
         );
        })}
      </Swiper>
     </div>
    </div>
   </section>
   {/* banner section */}
   <section className="section banner-section">
    <div className="banner banner-1 p-5 d-flex flex-column text-center align-items-center">
     <h1>Our Vision</h1>
     <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo pariatur
      quam ducimus nam consectetur explicabo velit voluptas eos. Esse libero
      assumenda excepturi eveniet hic commodi enim veniam tenetur expedita!
      Officiis!
     </p>
     <div className="d-flex gap-2">
      <Link to={"/contact"} className="btn btn-dark">
       Contact Us
      </Link>
      <Link to={"/about"} className="btn btn-outline-secondary">
       Know More
      </Link>
     </div>
    </div>
   </section>
   {/* featured section */}
   <section className="section featured-section">
    <div className="section-header">
     <h1>Featured Products</h1>
    </div>
    <div className="container">
     <div className="row justify-content-center">
      {loading && (
       <div className="col-12 text-center">
        <h1>Loading...</h1>
       </div>
      )}
      {!loading &&
       data.featured.map((product, index) => {
        return <ProductBox product={product} key={index} />;
       })}
     </div>
    </div>
   </section>
   {/* banner section */}
   <section className="section banner-section">
    <div className="banner banner-2 p-5 row  align-items-center">
     <div className="col-md-6">
      <h1>Sale 20% Off On Everything</h1>
      <p style={{ width: "100%" }}>
       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo pariatur
       quam ducimus nam consectetur explicabo velit voluptas eos. Esse libero
       assumenda excepturi eveniet hic commodi enim veniam tenetur expedita!
       Officiis!
      </p>
      <div className="d-flex gap-2">
       <Link to={"/shop"} className="btn btn-dark">
        Shop Now
       </Link>
      </div>
     </div>
    </div>
   </section>
   {/* popular section */}
   <section className="section popular-section">
    <div className="section-header">
     <h1>Popular Products</h1>
    </div>
    <div className="container">
     <div className="row justify-content-center">
      {loading && (
       <div className="col-12 text-center">
        <h1>Loading...</h1>
       </div>
      )}
      {!loading &&
       data.popular.map((product, index) => {
        return <ProductBox product={product} key={index} />;
       })}
     </div>
    </div>
   </section>
  </>
 );
}

export default Home;
