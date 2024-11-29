import React, { useState, useEffect } from "react";
import { URL } from "../../url";
import axios from "axios"; 
import "./Writepost.css";
import { useNavigate } from "react-router-dom";
import { imageDb } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Alert from "../../Component/Alert/Alert";
import { useUsers } from "../../Context/UserContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS

const categoriesList = [
  "Sensors",
  "PCB (Printed Circuit Board)",
  "Communication Modules",
  "Microcontrollers",
  "IoT Platforms and Cloud Services",
  "IoT Prototyping and Development Kits",
  "Others",
];

export const Writepost = () => {
  const [postedBy, setPostedBy] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainCategory, setMainCategory] = useState(categoriesList[0]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { user } = useUsers();
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (user) {
      setPostedBy(user._id);
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleMainCategoryChange = (e) => {
    setMainCategory(e.target.value);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (!title.trim() || !desc.trim() || !file) {
      alert("All fields are required.");
      return;
    }
    if (!agree) {
      setAlertMessage("You must agree to the terms and conditions.");
      setShowAlert(true);
      return;
    }

    let photoUrl = null;

    if (file) {
      const imgRef = ref(imageDb, `resourcesimages/${v4()}`);
      try {
        await uploadBytes(imgRef, file);
        photoUrl = await getDownloadURL(imgRef);
      } catch (err) {
        console.log(err);
      }
    }

    const resoPost = {
      title,
      desc,
      maincategory: mainCategory, // Use only the main category
      photo: photoUrl,
      postedBy: postedBy,
    };

    try {
      const res = await axios.post(`${URL}/api/resoposts/create`, resoPost, {
        withCredentials: true,
      });
      console.log(res.data);
      setAlertMessage("Your post has been published successfully.");
      setShowAlert(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertMessage === "Your post has been published successfully.") {
      navigate('/resources'); // Redirect to the resources page after publishing
    }
  };

  return (
    <div className="container">
      <h1 className="title">Share Your Review...!</h1>

      <div className="resorestrict">
        <input
          type="checkbox"
          name="agree"
          id="agree"
          checked={agree}
          className="agree"
          onChange={(e) => setAgree(e.target.checked)}
          required
        />{" "}
        I agree
      </div>

      {showAlert && (
        <Alert
          message={alertMessage}
          onClose={handleAlertClose}
        />
      )}

      <form onSubmit={handleSubmit} className="form">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Post Title"
          className="resopostinput"
          value={title}
        />

        <div className="reso-category-input">
          <select onChange={handleMainCategoryChange} className="main-category">
            {categoriesList.map((mainCategory) => (
              <option key={mainCategory} value={mainCategory}>
                {mainCategory}
              </option>
            ))}
          </select>
        </div>

        <h3>Cover Image:</h3>
        <input onChange={handlePhotoChange} type="file" className="file-input" />

        <ReactQuill
          value={desc}
          onChange={setDesc}
          className="description"
          placeholder="Enter Post Description"
          modules={{
            toolbar: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
        />

        <button type="submit" className="publish-btn">
          Publish
        </button>
      </form>
    </div> 
  );
};

export default Writepost;
