import React from "react";
import "./BannerSection.scss";

const BannerSection = ({ backgroundImage, title, subtitle, buttonText }) => {
  return (
    <div
      className="banner-section"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {buttonText && <button className="banner-btn">{buttonText}</button>}
      </div>
    </div>
  );
};

export default BannerSection;