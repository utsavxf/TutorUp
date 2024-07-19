import "../styles/doctorcard.css";
import React, { useState } from "react";
import BookSession from "./BookSession";
import { toast } from "react-hot-toast";

const TeacherCard = ({ ele }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleModal = () => {
    if (token === "") {
      return toast.error("You must log in first");
    }
    setModalOpen(true);
  };

  return (
    <div className={`card`}>
      <div className={`card-img flex-center`}>
        <img
          src={
            ele?.userId?.pic ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="profile"
        />
      </div>
      <h3 className="card-name">
         {ele?.userId?.firstname + " " + ele?.userId?.lastname}
      </h3>
      <p className="specialization">
        <strong>Subject: </strong>
        {ele?.subject}
      </p>
      <p className="experience">
        <strong>Experience: </strong>
        {ele?.experience}yrs
      </p>
      <p className="fees">
        <strong>Fees per session: </strong>Rs. {ele?.fees}
      </p>
      <p className="phone">
        <strong>Phone: </strong>
        {ele?.userId?.mobile}
      </p>
      <button
        className="btn appointment-btn"
        onClick={handleModal}
      >
        Book Session
      </button>
      {modalOpen && (
        <BookSession
          setModalOpen={setModalOpen}
          ele={ele}
        />
      )}
    </div>
  );
};

export default TeacherCard;
