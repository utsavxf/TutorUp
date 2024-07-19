import React from "react";
import image from "../images/about.png";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
            <p>
            TutorUp simplifies learning by connecting students with qualified tutors for affordable trial classes. Our platform empowers students to achieve their academic goals and helps tutors share their knowledge and expertise.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
