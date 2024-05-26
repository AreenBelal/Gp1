import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../../system-redux/data/apis";
import {
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaSchool,
  FaUser,
  FaTransgender,
  FaUserGraduate,
} from "react-icons/fa";

const StudentProfile = ({ setShowItemDashBoard }) => {
  const [student, setStudent] = useState(null);
  const studentId = localStorage.idS;

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${base_url}/students/${studentId}`);
        setStudent(response.data.data.student);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (!student) {
    return <div>Loading...</div>;
  }

  const handleChat = (studentId) => {
    localStorage.chatIdS = studentId;
    setShowItemDashBoard("sub, chat");
  };

  return (
    <div className="p-8 bg-gradient-to-r from-green-100 to-blue-200 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 flex flex-col items-center">
          <img
            src={student.avatar}
            alt="Student Avatar"
            className="w-32 h-32 rounded-full shadow-lg"
          />
          <h1 className="text-3xl text-center text-white font-bold mt-4">
            {student.fullName}
          </h1>
          <p className="text-center text-green-200">{student.branch}</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <FaEnvelope className="text-blue-500" />
            <span>{student.email}</span>
          </div>
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <FaPhone className="text-green-500" />
            <span>{student.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <FaBirthdayCake className="text-pink-500" />
            <span>{student.dateOfBirth}</span>
          </div>
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <FaSchool className="text-yellow-500" />
            <span>{student.nameOfSchool}</span>
          </div>
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <FaUserGraduate className="text-purple-500" />
            <span>{student.age} years old</span>
          </div>
          <div className="flex items-center gap-2 text-lg text-gray-700">
            <FaTransgender className="text-red-500" />
            <span>{student.gender}</span>
          </div>
          <button
            className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
            onClick={() => handleChat(student._id)}
          >
            إبدأ محادثة الآن مع الطالب
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
