import React, { useState } from "react";
import "../styles/contact.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const ApplyTeacher = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    subject: "",
    experience: "",
    fees: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const btnClick = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/teacher/applyforteacher",
          {
            formDetails,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Teacher application sent successfully",
          error: "Unable to send Teacher application",
          loading: "Sending teacher application...",
        }
      );

      navigate("/");
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <section
        className="register-section flex-center apply-doctor"
        id="contact"
      >
        <div className="register-container flex-center contact">
          <h2 className="form-heading">Apply for Teacher</h2>
          <form className="register-form ">
            <input
              type="text"
              name="subject"
              className="form-input"
              placeholder="Enter your Subject"
              value={formDetails.subject}
              onChange={inputChange}
            />
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder="Enter your experience (in years)"
              value={formDetails.experience}
              onChange={inputChange}
            />
            <input
              type="number"
              name="fees"
              className="form-input"
              placeholder="Enter your fees  (rupees)"
              value={formDetails.fees}
              onChange={inputChange}
            />
            <button
              type="submit"
              className="btn form-btn"
              onClick={btnClick}
            >
              apply
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyTeacher;
