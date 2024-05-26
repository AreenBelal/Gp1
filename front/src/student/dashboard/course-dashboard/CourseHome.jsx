import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../../system-redux/data/apis";
import {
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaChalkboardTeacher,
  FaIdCard,
  FaFilePdf,
} from "react-icons/fa";

const CourseHome = ({ course }) => {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          `${base_url}/teachers/${course?.courseId || localStorage.idT}`
        );
        setTeacher(response.data.data.teacher);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeacher();
  }, [course?.courseId]);

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <img
            src={teacher.avatar}
            alt="Teacher Avatar"
            className="w-32 h-32 rounded-full mx-auto shadow-lg"
          />
          <h1 className="text-3xl text-center text-white font-bold mt-4">
            {teacher.fullName}
          </h1>
          <p className="text-center text-blue-200">{teacher.course}</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-2 gap-2 text-lg text-gray-700">
            <FaEnvelope className="text-blue-500" />

            <span>
              <span>الإيميل: </span>
              <span>{teacher.email}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 gap-2 text-lg text-gray-700">
            <FaPhone className="text-green-500" />
            <span>
              <span>رقم الهاتف: </span>
              <span>{teacher.phone}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 gap-2 text-lg text-gray-700">
            <FaChalkboardTeacher className="text-yellow-500" />
            <span>
              <span>الفرع: </span>
              <span>{teacher.branch}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 gap-2 text-lg text-gray-700">
            <FaBirthdayCake className="text-pink-500" />
            <span>
              <span>تاريخ الميلاد: </span>
              <span>{teacher.dateOfBirth}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 gap-2 text-lg text-gray-700">
            <FaChalkboardTeacher className="text-yellow-500" />
            <span>
              <span>النوع: </span>
              <span>{teacher.gender === "male" ? "ذكر" : "أنثي"}</span>
            </span>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              السيرة الذاتية:
            </h2>
            <a
              href={teacher.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-red-500 underline"
            >
              <FaFilePdf className="text-2xl" />
              <span>تحميل السيرة الذاتية</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;
