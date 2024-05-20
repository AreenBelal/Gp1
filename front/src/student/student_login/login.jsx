import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdLock } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import Navhome from "./navbarhome";
import "./log.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button, Input, Typography } from "@material-tailwind/react";
import Nav from "../../homepage/components/Nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../system-redux/data/apis";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setAuth } from "../../system-redux/users/auth/authSlice";

export default function LoginPageStud() {
  const [idNumber, setIdNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isIdNumberFocused, setIsIdNumberFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(idNumber, userPassword);
  const handleLogin = async (ev) => {
    ev.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${base_url}/students/login`,
        {
          idNum: idNumber,
          password: userPassword,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(setAuth(response));

      toast.success(`Login Successfully`);
      navigate("/student/dashboard");
    } catch (error) {
      toast.error(`${error?.response?.data?.message}` || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const handleIdNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "").slice(0, 9); // يحافظ على أول 6 أرقام فقط
    setIdNumber(input);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError(
        "كلمة المرور يجب أن تحتوي على 8 خانات على الأقل وتتضمن أحرف صغيرة وأحرف كبيرة وأرقام ورموز مميزة "
      );
    } else {
      setPasswordError("");
    }
  };

  const inputStyle =
    "dark:text-darkMode-dark50 !border !border-gray-300 bg-darkMode-dark50 text-gray-900 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50";

  return (
    <div className="firstdivstu" style={{ backgroundColor: "#ffff" }}>
      <div className="login-screenstu" style={{ backgroundColor: "#fff" }}>
        <Nav />
        <div dir="rtl" className="login-formstu" style={{ marginTop: "50px" }}>
          <div className="left-partstu" />
          <div className="right-partstu">
            <div className="login-title-containerstu">
              <h2 className="login-titlestu" style={{ color: "#008000" }}>
                تسجيل دخول الطالب
              </h2>
            </div>
            <div className={` mb-3 ${isIdNumberFocused ? "focused" : ""}`}>
              <Input
                placeholder="رقم الهوية"
                type="text" // يجب تغيير النوع إلى text لضمان إمكانية إدخال 6 أرقام بدون قيود
                fullWidth
                value={idNumber}
                onChange={handleIdNumberChange}
                className={`${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <div className={`relative  ${isPasswordFocused ? "focused" : ""}`}>
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[30%] left-3 z-50 cursor-pointer"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
              <Input
                placeholder="كلمة المرور"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={userPassword}
                onChange={handlePasswordChange}
                className={`  ${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
            </div>
            <div className="password-error">{passwordError}</div>
            <div
              className="submit-actionstu"
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                icon={<MdLock style={{ fontSize: "1.5rem" }} />}
                onClick={(ev) => handleLogin(ev)}
                style={{
                  fontSize: "1rem",
                  padding: "10px 20px",
                  backgroundColor: "#14af1ebc",
                }}
              >
                تسجيل الدخول
              </Button>
              <Typography
                variant="h6"
                style={{
                  color: "#14af1ebc",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                <Link to="/student/sign-up" style={{ textDecoration: "none" }}>
                  {" "}
                  ليس لديك حساب؟
                </Link>
              </Typography>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
