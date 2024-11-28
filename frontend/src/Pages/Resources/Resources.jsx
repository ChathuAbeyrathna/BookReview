import React, { useEffect, useState  } from "react";
import "./Resources.css";
import read from "../Resources/Assets/read1.png"; // Import icon image
import pen from "../Resources/Assets/pen1.png"; // Import icon image
import { Link , useNavigate } from "react-router-dom";
import { useUsers } from "../../Context/UserContext"; // Import user context
import Alert from "../../Component/Alert/Alert";

import fiction from "../Resources/Assets/fictions.PNG";
import non_fiction from "../Resources/Assets/non_fiction.png";
import romance from "../Resources/Assets/romance.png"; 
import childrens from "../Resources/Assets/childrens.png";
import mystery_thriller from "../Resources/Assets/mystery_ thriller.png";
import fantasy from "../Resources/Assets/fantasy.png";
import biographies from "../Resources/Assets/biographies.png";
import others from "../Resources/Assets/others.jpg";

import searchIcon from '../../Component/Assets/search.png'; // Importing the search icon image

export const Resources = ({ defaultValue = "" }) => {

  const { user } = useUsers(); // Access user data from context
  const navigate = useNavigate(); // Use useNavigate hook
  const [showAlert, setShowAlert] = useState(false);

  const [prompt, setPrompt] = useState(defaultValue); // State variable to hold the search query

  useEffect(() => {  
    setPrompt(defaultValue); // Set the default value when it changes
  }, [defaultValue]);

  const handleSearch = () => {
    if (prompt) {
      navigate(`/resosearch?query=${prompt}`);
    } else {
      navigate("/resources");
    }
  };


  // Function to handle create button click
  const handleCreateClick = () => {
    if (!user) {
      setShowAlert(true);
    } else {
      navigate('/writepost');
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate('/login');
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Change this threshold as needed for the desired effect
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        } else {
          entry.target.classList.remove("active");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    const elements = document.querySelectorAll(".rescollect");
    elements.forEach((element) => {
      observer.observe(element);
    });

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToContent = () => {
    const content = document.getElementById("resobanner-content");
    if (content) {
      const scrollOffset = content.getBoundingClientRect().height * 1.85;
            window.scrollBy({ top: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="resoCollect">
      <div className="resobanner">

        <div className="resobanner-content" id="resobanner-content">
        <div className="ResoSearchDiv">
          <input
            type="text"
            className="searchBar" // CSS class for the search bar input
            placeholder="Search for more.." // Placeholder text for the search bar
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)} // Function to update the search query state on input change
          />
          <img
            src={searchIcon} // Source of the search icon image
            className="searchIcon" // CSS class for the search icon
            onClick={handleSearch} // Function to navigate based on the search query
            alt="Search Icon" // Alt text for the search icon image
          />
        </div>
          <h1>Book Reviews</h1>
          <p>
            Unveiling the Magic of Stories, One Review at a Time!
          </p>
        
            <div className="button-container">
              <button onClick={scrollToContent}>
              {read && (
                  <img src={read} alt="read" className="button-icon" />
                )} Read
              </button> 
             
              <button onClick={handleCreateClick}> 
                {pen && (
                  <img src={pen} alt="pen" className="button-icon" />
                )} Write

              </button>
              {showAlert && (
            <Alert
              message="Please login to create a post."
              onClose={handleAlertClose}
            />
          )}
            </div>
   
        </div>
      </div>

      <div className="rescollect-container">
  <Link to="/Sensors?category=Motion Sensors" className="rescollect-card" id="collect1">
    <img src={fiction} alt="Sensors" className="card-image" />
    <h3 className="card-title">Fiction</h3>
  </Link>

  <Link to="/pcb?category=Design Software" className="rescollect-card" id="collect2">
    <img src={non_fiction} alt="PCB" className="card-image" />
    <h3 className="card-title">Non Fiction</h3>
  </Link>

  <Link to="/dataSheet?category=Sensor Data Sheets" className="rescollect-card" id="collect3">
    <img src={romance} alt="Data Sheets" className="card-image" />
    <h3 className="card-title">Romance</h3>
  </Link>

  <Link to="/communi?category=Wi-Fi Modules" className="rescollect-card" id="collect5">
    <img src={childrens} alt="Communication Modules" className="card-image" />
    <h3 className="card-title">Children's Books</h3>
  </Link>

  <Link to="/micro?category=Popular Microcontroller Families" className="rescollect-card" id="collect11">
    <img src={mystery_thriller} alt="mystery_thriller" className="card-image" />
    <h3 className="card-title">Mystery & Thriller</h3>
  </Link>

  <Link to="/IotPlat?category=IoT Platforms" className="rescollect-card" id="collect12">
    <img src={fantasy} alt="fantasy" className="card-image" />
    <h3 className="card-title">Fantasy</h3>
  </Link>

  <Link to="/IotProto?category=Arduino Kits" className="rescollect-card" id="collect15">
    <img src={biographies} alt="biographies" className="card-image" />
    <h3 className="card-title">Biographies</h3>
  </Link>

  <Link to="/others?category=Codes/Programming" className="rescollect-card" id="collect17">
    <img src={others} alt="Others" className="card-image" />
    <h3 className="card-title">Others</h3>
  </Link>
</div>



    </div>
  );
};