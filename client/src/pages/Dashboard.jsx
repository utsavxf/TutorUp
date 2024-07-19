import React from "react";
import AdminTeachers from "../components/AdminTeachers";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import AdminSessions from "../components/AdminSessions";
import AdminApplications from "../components/AdminApplications";

const Dashboard = (props) => {
  const { type } = props;
  return (
    <>
      <section className="layout-section">
        <div className="layout-container">
          <Sidebar />
          {type === "users" ? (
            <Users />
          ) : type === "teachers" ? (
            <AdminTeachers/>
          ) : type === "applications" ? (
            <AdminApplications/>
          ) : type === "sessions" ? (
            <AdminSessions/>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
