import React, { useState, useEffect } from "react";
import axios from "axios";
import Resourcepost from "./Resourcepost"; // Import your single post component
import "./Resources.css"; // Adjust CSS as needed
import { URL } from "../../url"; // Update with your API base URL

const Resources = () => {
  const [resoPosts, setResoPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all resources on component mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`${URL}/api/resoposts`, {
          withCredentials: true,
        });
        setResoPosts(response.data); // Assuming the API returns an array of posts
        setLoading(false);
      } catch (err) {
        setError("Failed to load resources. Please try again later.");
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) return <div className="loading">Loading resources...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="resources-container">
      <h1>Resources</h1>
      <div className="reso-posts-list">
        {resoPosts.length > 0 ? (
          resoPosts.map((resoPost) => (
            <Resourcepost key={resoPost._id} resoPost={resoPost} />
          ))
        ) : (
          <p>No resources found.</p>
        )}
      </div>
    </div>
  );
};

export default Resources;
