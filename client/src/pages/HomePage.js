import React, { useState, useEffect } from "react";
import Layout from "../componenets/layout/Layout";
import { useNavigate, Link } from "react-router-dom";
import "../styles/HomePage.css"
import axios from "axios";
import car from "../assets/car.png";
import money from "../assets/money.png";
import card from "../assets/card.png";
import call from "../assets/call.png";
import { Checkbox, Radio } from "antd";
import { Image, Collapse, Button } from 'react-bootstrap';

import { Prices } from "../componenets/Prices";
import Banner from "../componenets/Banner";
import BannerData from "../Object/BannerData";
const HomePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const handleSortChange = (value) => {
    setSortOrder(value);
    // Additional logic based on the selected sorting option
  };
  //get products
  const getAllProducts = async () => {
    try {
      const baseURL = 'http://localhost:8000/api';
      const api = axios.create({
        baseURL
      });
      const { data } = await api.get('/writer');
      console.log(data);
      setProducts(data.stories);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const clearFilters = () => {
    setChecked([]);
    setRadio([]);
    setOpen(false);
  }
  const handleFilter = (value, id) => {
    if (id == null) {

      setChecked([]);
    }
    else {
      let all = [id];

      setChecked(all);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const [currentIndexb, setCurrentIndexvb] = useState(0);

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "10vw",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "10vw",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndexb === 0;
    const newIndex = isFirstSlide ? BannerData.length - 1 : currentIndexb - 1;
    setCurrentIndexvb(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndexb === BannerData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndexb + 1;
    setCurrentIndexvb(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndexvb(slideIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNext, 2000); // Change image every 3 seconds
    return () => clearInterval(intervalId);
  }, [currentIndexb]);


  return (
    <>

      {/* <Image src="/images/homebg.jpg" width={100} height={200} fluid rounded /> */}


      <Layout title={"ALl Story - Best stories "}>
        <div className="banners">
          <div onClick={goToPrevious} style={leftArrowStyles}>
            ❰
          </div>
          <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div>
          {BannerData.map((banner, index) => (
            <div key={banner.id} style={{ display: index === currentIndexb ? "block" : "none" }}>
              {/* Render your banner content here */}
              <div className="banner-content">
                <div className="banner-text">
                  <h2>{banner.title}</h2>
                  <p>{banner.details}</p>
                </div>
                <img src={banner.bannerImage} alt={banner.title} />

              </div>

            </div>

          ))}
        </div>







        <div>


          {/* <div className=" col-md-9"> */}
          {/* <h1 className="text-center">All Products</h1> */}
          <div className="d-flex flex-wrap products-section">

            {products?.map((story) => (
              <div className="card m-2" style={{ width: '18rem', border: '1px solid lightgrey' }} key={story._id}>
                <img
                  src={story.images[0]}
                  className="card-img-top"
                  alt={story.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{story.name}</h5>
                  <p className="card-text">{story.content.substring(0, 100)}...</p>
                  <button className="btn btn-outline" onClick={() => { window.location.href = `/dashboard/author/story/${story._id}` }}>View</button>
                </div>
              </div>
            ))}
          </div>
          <div className="loadmore-section p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>

          {/* </div> */}

        </div >



      </Layout >
    </>
  );
};

export default HomePage;
// import React from 'react'

// const HomePage = () => {
//   return (
//     <div>HomePage</div>
//   )
// }

// export default HomePage
