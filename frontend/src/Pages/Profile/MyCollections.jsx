import React, { useEffect, useState } from "react";
import ResoCard from "./ResoCard/ResoCard";
import PostList from "./ResoCard/PostList";
import axios from "axios";
import { useUsers } from "../../Context/UserContext";
import "./MySaves.css";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";

const MyCollections = () => {
  const [resoPosts, setResoPosts] = useState([]);
  const [showResoGrid, setShowResoGrid] = useState(false);

  const { user } = useUsers();

  useEffect(() => {
    const fetchResoPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/resoposts/user/${user._id}`
        );
        setResoPosts(res.data);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      }
    };
    if (user) {
      fetchResoPosts();
    }
  }, [user]);


  const handleResoDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/resoposts/${postId}`);
      setResoPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting blog post:", err);
    }
  };

  if (!user) {
    return <div>User data not found!</div>;
  }

  const handleToggleResoGrid = () => {
    setShowResoGrid(!showResoGrid);
  };


  return (
    <div className="mySavesBody">

      <div className="UserDetailsDiv">
        <div className="UserInfo">
          {user && (
            <>
              <p className="UserName">{user.username}</p>
              <p className="UserEmail">Email: {user.email}</p>
            </>
          )}
        </div>
        <div className="UserProfilePicture">
          {user && (
            <img
              src={user.profilePicture}
              alt={`${user.username}`}
              className="UserImage"
            />
          )}
        </div>
      </div>

      <hr />
      <div className="mySaveBookMarksresoDiv">
        <div className="mySaveBookMarksresoSubDiv">
          <div className="mySaveTags">
            Resources
            {"   "}
            <button onClick={handleToggleResoGrid} className="toggleButton">
              {showResoGrid ? (
                <CIcon
                  icon={icon.cilCaretTop}
                  size=""
                  style={{ "--ci-primary-color": "black" }}
                  className="dropdownIcon"
                />
              ) : (
                <CIcon
                  icon={icon.cilCaretBottom}
                  size=""
                  style={{ "--ci-primary-color": "black" }}
                  className="dropdownIcon"
                />
              )}
            </button>
          </div>
          <p className="UserCount">
            {" "}
            No of Resources: {"   "} {resoPosts.length}{" "}
          </p>
        </div>

        {resoPosts.length === 0 ? (
          <p>No saved resource posts found.</p>
        ) : (
          <ul>
            <PostList posts={showResoGrid ? resoPosts : resoPosts.slice(0, 3)} onDelete={handleResoDelete} />
          </ul>
        )}
      </div>
      <hr />

    </div>




  );
};

export default MyCollections;