import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../../../system-redux/data/apis";

const SubscriptionsStudents = ({ course, setShowItemDashBoard }) => {
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchTeacherAndStudents = async () => {
      try {
        // Fetch teacher data
        const teacherResponse = await axios.get(
          `${base_url}/teachers/${course?.courseId || localStorage.idT}`
        );
        const teacherData = teacherResponse.data.data.teacher;
        setTeacher(teacherData);
        console.log("teacherData?.studentsIds: ", teacherData?.studentsIds);

        // Fetch students data
        const studentsResponse = await axios.post(`${base_url}/students`, {
          ids: teacherData?.studentsIds,
        });
        setStudents(studentsResponse.data.data.students);
        console.log(
          "studentsResponse.data.data.students: ",
          studentsResponse.data.data.students
        );
      } catch (error) {
        console.error("Error fetching teacher and students data:", error);
      }
    };

    fetchTeacherAndStudents();
  }, [course?.courseId]);

  if (!teacher || students.length === 0) {
    return <div>Loading...</div>;
  }

  // Function to handle viewing student details
  const viewStudentDetails = (studentId) => {
    localStorage.idS = studentId;
    setShowItemDashBoard("sub, student-profile");
    // Your logic to handle viewing student details
    console.log("Viewing student with ID:", studentId);
  };

  const viewTeacherDetails = (teacherId) => {
    localStorage.idT = teacherId;
    setShowItemDashBoard("sub, teacher-profile");
    // Your logic to handle viewing teacher details
    console.log("Viewing teacher with ID:", teacherId);
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Teacher Card */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Teacher Details
        </h2>
        {/* Teacher Data */}
        <div className="flex items-center space-x-4 mb-2">
          {/* Teacher Avatar */}
          <img
            src={teacher.avatar}
            alt="Teacher Avatar"
            className="w-12 h-12 rounded-full"
          />
          {/* Teacher Name */}
          <span className="text-lg font-medium text-gray-800">
            {teacher.fullName}
          </span>
        </div>
        {/* More teacher data... */}
        {/* View Teacher Details Button */}
        <button
          onClick={() => viewTeacherDetails(teacher._id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          View Teacher Details
        </button>
      </div>

      {/* Students List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {students.map((student) => (
          <div key={student._id} className="bg-white p-6 rounded-lg shadow-md">
            {/* Student Avatar */}
            <img
              src={student.avatar}
              alt="Student Avatar"
              className="w-24 h-24 rounded-full mx-auto"
            />
            {/* Student Name */}
            <h3 className="text-xl font-semibold text-gray-800 text-center mt-4">
              {student.fullName}
            </h3>
            {/* View Student Details Button */}
            <button
              onClick={() => viewStudentDetails(student._id)}
              className="block bg-blue-500 text-white px-4 py-2 rounded-md mx-auto mt-4 hover:bg-blue-600"
            >
              View Student Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsStudents;
