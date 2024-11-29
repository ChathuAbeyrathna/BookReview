import React from 'react';
import './Loader.css'; // Make sure you have this file for styling
import octopusImage from '../Assets/polvo-pepe-bando-do-mar.gif';

export const Loader = () => {
  return (
    <div className="loader-container">
      <p className="loader-text">Hold on, This your magic books world...!</p>
    </div>
  );
}

export default Loader;
