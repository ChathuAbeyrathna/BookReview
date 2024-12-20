
import React, {useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import DropdownMenu from "./DropdownMenu";
import { useUsers } from "../../Context/UserContext";

export const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { user, fetchUsers } = useUsers();
  const navigation = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  console.log(user);

  return (
    <div className="navbar">
      <div className="nav-logo">
      <Link style={{ textDecoration: "none" }} to="/home">
        <img src={logo} alt="" className="logo"  onClick={() => {
            setMenu("home");
          }}/>
 </Link>
 <Link style={{ textDecoration: "none" }} to="/home">
        <h1>Readverse</h1>
        </Link>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("resources");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/resources">
            Book Reviews
          </Link>
          {menu === "resources" ? <hr /> : <></>}
        </li>
        
        <li
          onClick={() => {
            setMenu("blogs");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/blogs">
            About
          </Link>
          {menu === "blogs" ? <hr /> : <></>}
        </li>

         
      </ul>

      {user ? (
        <div className="menu"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            <img
              src={user.profilePicture} 
              className="profilenavImg"
              alt=""
            />
          
          {isDropdownVisible && <DropdownMenu />}
        </div>
        
      ) : (
        <div className="nav-login">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </div>
      )}
      
    </div>
  );
}
export default Navbar;
