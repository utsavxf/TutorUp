import React, { useEffect, useState } from "react";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const { userId } = jwt_decode(localStorage.getItem("token"));

  const getAllSession = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(
        `/session/getallSessions?search=${userId}`
      );
      setSessions(temp.reverse()); // Reverse the array here
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
            studentId: ele?.userId?._id,
            teacherId: ele?.teacherId?._id,
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
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Your Sessions</h2>

          {sessions.length > 0 ? (
            <div className="Appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Teacher</th>
                    <th>Student</th>
                    <th>Session Date</th>
                    <th>Session Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    {userId === sessions[0].teacherId?._id ? (
                      <th>Action</th>
                    ) : (
                      <></>
                    )}
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
                        {userId === ele?.teacherId?._id ? (
                          <td>
                            <button
                              className={`btn user-btn accept-btn ${
                                ele?.status === "Completed" ? "disable-btn" : ""
                              }`}
                              disabled={ele?.status === "Completed"}
                              onClick={() => complete(ele)}
                            >
                              Complete
                            </button>
                          </td>
                        ) : (
                          <></>
                        )}
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
      <Footer />
    </>
  );
};
export default Sessions;
