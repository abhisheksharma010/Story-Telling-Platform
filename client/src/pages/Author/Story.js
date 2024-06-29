import React, { useState, useEffect } from 'react';
import Layout from '../../componenets/layout/Layout';
import AdminMenu from '../../componenets/layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import './StoryCard.css';

const Stories = () => {
  const [stories, setStories] = useState([]);

  // get all stories
  const getAllStories = async () => {
    try {
      const baseURL = 'http://localhost:8000/api';
      const api = axios.create({
        baseURL
      });
      const { data } = await api.get('/writer');
      console.log(data);
      setStories(data.stories);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllStories();
  }, []);

  return (
    <Layout>
      <div className="mt-5 row dashboard" style={{ alignItems: 'flex-start' }}>
        <div className="col-md-3 mt-5">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Stories List</h1>
          <div className="d-flex flex-wrap">
            {stories?.map((story) => (
              <div className="card m-2" style={{ width: '18rem', border: '1px solid lightgrey' }} key={story._id}>
                <img
                  src={story.images[0]}
                  className="card-img-top"
                  alt={story.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{story.name}</h5>
                  <p className="card-text">{story.content.substring(0, 100)}...</p>
                  <button className="btn btn-outline" onClick={() => { window.location.href = `/dashboard/author/story/${story._id}` }}>Update</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stories;
