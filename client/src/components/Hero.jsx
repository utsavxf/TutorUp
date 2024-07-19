import React from "react";
import image from "../images/hero2.png";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Expert Tutors,<br />
          Affordable Trials
        </h1>
        <p>
        Elevate your skillset with expert tuition. Affordable trial classes let you find the perfect fit.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
