import React, { useState } from 'react';
import Layout from '../../componenets/layout/Layout';
import AdminMenu from '../../componenets/layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateStory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [contributors, setContributors] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  //create story function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const storyData = {
        name,
        content,
        contributors,
        images: imageUrls,
      };

      const baseURL = 'http://localhost:8000/api';
      const api = axios.create({
        baseURL
      });
      const { data } = await api.post(
        "/api/v1/story/create-story",
        storyData
      );
      if (data?.success) {
        toast.success("Story Created Successfully");
        navigate("/dashboard/admin/stories");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrl) {
      setImageUrls([...imageUrls, imageUrl]);
      setImageUrl("");
    }
  };

  const handleRemoveImageUrl = (index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  return (
    <Layout title={"Dashboard - Create Story"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3" style={{ alignItems: 'flex-start' }}>
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Story</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Story name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={content}
                  placeholder="Story content"
                  className="form-control"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  mode="tags"
                  placeholder="Add Contributors (Usernames)"
                  className="form-select mb-3"
                  onChange={(value) => setContributors(value)}
                >
                  {/* Options can be dynamically generated or left empty for user input */}
                </Select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={imageUrl}
                  placeholder="Image URL"
                  className="form-control"
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <button className="btn btn-outline-secondary mt-2" onClick={handleAddImageUrl}>
                  Add Image URL
                </button>
              </div>
              <div className="mb-3">
                {imageUrls.length > 0 && (
                  <div className="text-center">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="mb-2">
                        <img
                          src={url}
                          alt={`story_image_${index}`}
                          height={"200px"}
                          className="img img-responsive m-2"
                        />
                        <button className="btn btn-danger" onClick={() => handleRemoveImageUrl(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE STORY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateStory;
