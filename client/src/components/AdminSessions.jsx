
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllSession = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/session/getallsessions`);
      setSessions(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getAllSession();
  }, []);

  const complete = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/session/completed",
          {
            sessionid: ele?._id,
            teacherId: ele?.teacherId._id,
            teachername: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Session booked successfully",
          error: "Unable to book session",
          loading: "Booking session...",
        }
      );

      getAllSession();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Users</h3>
          {sessions.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Teacher</th>
                    <th>Student</th>
                    <th>Session Date</th>
                    <th>Appointment Time</th>
                    <th>Session Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.teacherId?.firstname +
                            " " +
                            ele?.teacherId?.lastname}
                        </td>
                        <td>
                          {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                        </td>
                        <td>{ele?.date}</td>
                        <td>{ele?.time}</td>
                        <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                        <td>{ele?.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};

export default AdminSessions;
