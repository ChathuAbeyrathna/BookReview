
import React, {  useState } from 'react'
import "./Footer.css";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { Link } from 'react-router-dom';

export const Footer = () => {
  const [menu, setMenu] = useState("home");
  return ( 
    <div className="footer">
      <div className="footerIcon">
        
        <div className="email">
          {" "}
          <a href="mailto:triviatechnology2024@gmail.com" target='_blank' rel="noreferrer">
            {" "}
            <CIcon
              icon={icon.cibGmail}
              size=""
              style={{ "--ci-primary-color": "black" }}
              className="dropdownIcon"
            />{" "}
          </a>{" "}
        </div>

        <div className="LinkedIn">
          {" "}
          <a href="https://www.linkedin.com/showcase/gavesha/" target='_blank' rel="noreferrer">
            <CIcon
              icon={icon.cibLinkedinIn}
              size=""
              style={{ "--ci-primary-color": "black" }}
              className="dropdownIcon"
            />
          </a>{" "}
        </div>


        <div className="tiktok">
          {" "}
          <a href="https://www.tiktok.com/@gaveshaedtech" target='_blank' rel="noreferrer">
            {" "}
            <CIcon
              icon={icon.cibTiktok}
              size=""
              style={{ "--ci-primary-color": "black" }}
              className="dropdownIcon"
            />{" "}
          </a>{" "}
        </div>
        <div className="facebook">
          {" "}
          <a href="https://www.facebook.com/gaveshaEdtech/" target='_blank' rel="noreferrer">
            {" "}
            <CIcon
              icon={icon.cibFacebookF}
              size=""
              style={{ "--ci-primary-color": "black" }}
              className="dropdownIcon"
            />{" "}
          </a>{" "}
        </div>
        <div className="youtube">
          {" "}
          <a href="https://www.youtube.com/c/Gavesha" target='_blank' rel="noreferrer">
            {" "}
            <CIcon
              icon={icon.cibYoutube}
              size=""
              style={{ "--ci-primary-color": "black" }}
              className="dropdownIcon"
            />{" "}
          </a>{" "}
        </div>
       
      </div>

      <div className="footerText">
        COPYRIGHT &copy; 2024. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
};
