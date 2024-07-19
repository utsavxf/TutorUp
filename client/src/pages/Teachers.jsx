import React, { useEffect, useState } from "react";
import TeacherCard from "../components/TeacherCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";

const Teachers = () => {
  const [teachers,setTeachers] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDocs = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/teacher/getallteachers`);
    setTeachers(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchAllDocs();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container doctors">
          <h2 className="page-heading">Our Teachers</h2>
          {teachers.length > 0 ? (
            <div className="doctors-card-container">
              {teachers.map((ele) => {
                return (
                  <TeacherCard
                    ele={ele}
                    key={ele._id}
                  />
                );
              })} 
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

export default Teachers;
