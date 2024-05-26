import { Routes, Route, Navigate } from "react-router-dom";
// HOME PAGE IMPORT
import HomePage from "./homepage/HomePage";

// END HOME PAGE IMPORT

import TeacherDashboard from "./techear/dashboard/TeacherDashboard";
import HWPUT from "./techear/hwtech/hwput";
import PutQuestion from "./techear/techputquiz/putQuestion";
import Demo from "./techear/calendertech/demo";
import HWFINALDETAILS from "./techear/hwDetailsTable/hwfinaldetails";
import CourseDeatials from "./techear/table_coursesstudent/courseDetails";
import GradesDeatials from "./techear/gradTablestudent/gradeDetails";

import TeacherLoginPage from "./techear/login/TeacherLoginPage";
import Lecfinal from "./techear/lec/lecfinal";
import LoginPageStud from "./student/student_login/login";
import SignUpPage from "./student/student_signup/SignUpPage";
import Admindash from "./admin/Dash/admindash";
import TechAdminp from "./admin/teachAdmin/teachadminfinal";
import StuAdminp from "./admin/studentAdmin/stuadminfinal";
// TEACHERS IMPORT
// ---- registration -----
import TeachersRegistration from "./techear/register/TeachersRegistration";

// END TEACHERS IMPORT
import AdminLoginPage from "./admin/login/AdminLoginPage";
import ProfileTech from "./techear/profile/profilefinaltech";
import Sechtech from "./techear/calendertech/sechfinal";
import Paymentstu from "./student/payment/Paymentstu";
import StudentPage from "./student/Dashstu/showCourse";
import Calendar from "./student/Dashstu/scenes/calendar/calendar";
import Invoices from "./student/Dashstu/scenes/invoices";
import Contacts from "./student/Dashstu/scenes/contacts";
import Line from "./student/Dashstu/scenes/line";
import Pie from "./student/Dashstu/scenes/pie";
import FAQ from "./student/Dashstu/scenes/faq";
import Notesfinal from "./student/Dashstu/scenes/Notes/notesfinal";
import QuizPage from "./student/Dashstu/quizzstu";
import CoursesPage from "./student/Dashstu/courseDetails";
import SetPasswordTeacher from "./techear/register/set-password-teacher";
import Quiz from "./student/student_quiz/quiz";
import "./index.css";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";
import UsersTokensManagement from "./UsersTokensManagement";
import { useSelector } from "react-redux";
import StudentsSignUpPage from "./student/student_signup/SignUpPage";
import StudentDashboard from "./student/dashboard/StudentDashboard";
import env from "react-dotenv";
import Success from "./student/dashboard/Success";
const App = () => {
  const { cn, tc, ro } = useSelector((state) => state.ma);
  const { teacherData } = useSelector((state) => state.singleTeacher);

  return (
    <div className="dark:bg-darkMode-dark950 ">
      <UsersTokensManagement />
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* teachers routes */}
          <Route
            path="/teachers/register"
            element={
              cn ? (
                ro === "TEACHER" ? (
                  <Navigate to="/teacher/dashboard" />
                ) : ro === "OWNER" ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  ro === "STUDENT" && <Navigate to="/" />
                )
              ) : (
                <TeachersRegistration />
              )
            }
          />
          <Route
            path="/teachers/set-password-teacher"
            element={
              cn ? (
                ro === "TEACHER" ? (
                  <Navigate to="/teacher/dashboard" />
                ) : ro === "OWNER" ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  ro === "STUDENT" && <Navigate to="/" />
                )
              ) : (
                <SetPasswordTeacher />
              )
            }
          />
          <Route
            path="/teacher/login"
            element={
              cn ? (
                ro === "TEACHER" ? (
                  <Navigate to="/teacher/dashboard" />
                ) : ro === "OWNER" ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  ro === "STUDENT" && <Navigate to="/" />
                )
              ) : (
                <TeacherLoginPage />
              )
            }
          />

          <Route
            path="/teacher/dashboard"
            element={
              cn ? (
                ro === "TEACHER" ? (
                  <TeacherDashboard />
                ) : ro === "OWNER" ? (
                  <AdminLoginPage />
                ) : (
                  ro === "STUDENT" && <Navigate to="/" />
                )
              ) : (
                <Navigate to="/#contact" />
              )
            }
          />

          {/* end teachers routes */}

          {/* owners routes */}
          <Route
            path="/admin/login"
            element={
              cn ? (
                ro === "TEACHER" ? (
                  <Navigate to="/teacher/dashboard" />
                ) : ro === "OWNER" ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  ro === "STUDENT" && <Navigate to="/" />
                )
              ) : (
                <AdminLoginPage />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              cn ? (
                ro === "TEACHER" ? (
                  <TeacherDashboard />
                ) : ro === "OWNER" ? (
                  <Admindash />
                ) : (
                  ro === "STUDENT" && <Navigate to="/" />
                )
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />

          {/* end owners routes */}

          {/* students routes */}
          <Route
            path="/student/login"
            element={
              cn ? (
                ro === "TEACHER" ? (
                  <Navigate to="/teacher/dashboard" />
                ) : ro === "OWNER" ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  ro === "STUDENT" && <Navigate to="/student/dashboard" />
                )
              ) : (
                <LoginPageStud />
              )
            }
          />
          <Route
            path="/student/sign-up"
            element={
              cn ? (
                ro === "TEACHER" ? (
                  <Navigate to="/teacher/dashboard" />
                ) : ro === "OWNER" ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  ro === "STUDENT" && <Navigate to="/student/dashboard" />
                )
              ) : (
                <StudentsSignUpPage />
              )
            }
          />
          <Route
            path="/student/dashboard"
            element={
              cn ? (
                ro === "TEACHER" ? (
                  <TeacherDashboard />
                ) : ro === "OWNER" ? (
                  <Admindash />
                ) : (
                  ro === "STUDENT" && <StudentDashboard />
                )
              ) : (
                <Navigate to="/student/login" />
              )
            }
          />

          <Route path="/student/dashboard/success" element={<Success />} />
          {/* end students routes */}

          <Route
            path="/techear/calendertech/sechfinal"
            element={<Sechtech />}
          />

          <Route
            path="/techear/profile/profilefinaltech"
            element={<ProfileTech />}
          />

          <Route path="/techear/lec/lecfinal" element={<Lecfinal />} />
          <Route
            path="/techear/techputquiz/putQuestion"
            element={<PutQuestion />}
          />
          <Route path="/techear/calendertech/demo" element={<Demo />} />
          <Route
            path="/techear/hwDetailsTable/hwfinaldetails"
            element={<HWFINALDETAILS />}
          />
          <Route
            path="/techear/table_coursesstudent/courseDetails"
            element={<CourseDeatials />}
          />
          <Route
            path="/techear/gradTablestudent/gradeDetails"
            element={<GradesDeatials />}
          />
          <Route path="/techear/hwtech/hwput" element={<HWPUT />} />

          <Route
            path="/admin/teachAdmin/teachadminfinal"
            element={<TechAdminp />}
          />
          <Route
            path="/admin/studentAdmin/stuadminfinal"
            element={<StuAdminp />}
          />
          <Route path="/student/payment/Paymentstu" element={<Paymentstu />} />
          <Route
            path="/student/Dashstu/scenes/calendar/calendar"
            element={<Calendar />}
          />
          <Route
            path="/student/Dashstu/scenes/invoices"
            element={<Invoices />}
          />
          <Route
            path="/student/Dashstu/scenes/contacts"
            element={<Contacts />}
          />
          <Route path="/student/Dashstu/scenes/faq" element={<FAQ />} />
          <Route path="/student/Dashstu/scenes/pie" element={<Pie />} />
          <Route path="/student/Dashstu/scenes/line" element={<Line />} />
          <Route
            path="/student/Dashstu/scenes/Notes/notesfinal"
            element={<Notesfinal />}
          />
          <Route path="/student/Dashstu/showCourse" element={<StudentPage />} />
          <Route path="/student/Dashstu/quizzstu" element={<QuizPage />} />

          <Route path="/student/student_quiz/quiz" element={<Quiz />} />
        </Routes>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
