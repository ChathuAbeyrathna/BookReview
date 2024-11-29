
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
          <a href="" target='_blank' rel="noreferrer">
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
          <a href="" target='_blank' rel="noreferrer">
            <CIcon
              icon={icon.cibLinkedinIn}
              size=""
              style={{ "--ci-primary-color": "black" }}
              className="dropdownIcon"
            />
          </a>{" "}
        </div>

        <div className="facebook">
          {" "}
          <a href="" target='_blank' rel="noreferrer">
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
          <a href="" target='_blank' rel="noreferrer">
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
