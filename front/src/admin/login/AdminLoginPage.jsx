import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../../homepage/components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../system-redux/users/auth/authSlice";
import { base_url } from "../../system-redux/data/apis";

const AdminLoginPage = () => {
  const [user, setUser] = useState({
    idNum: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (ev) => {
    ev.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/owners/login`, user, {
        withCredentials: true,
      });

      dispatch(setAuth(response));

      toast.success(`Login Successfully`);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message}` || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.idNum.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // useEffect(() => {
  //   if (cn === true) {
  //     router.push("/");
  //   }
  // }, [tc]);

  const styles = {
    darkText: "dark:text-darkMode50",
    darkBg: "dark:bg-darkMode-dark50",
  };
  const typographyStyle = "dark:text-darkMode-dark50";
  const inputStyle =
    "dark:text-darkMode-dark50 !border !border-gray-300 bg-darkMode-dark50 text-gray-900 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50";
  const fieldStyle = "flex flex-col gap-5";
  return (
    <>
      <div className="pb-32">
        <Nav />
      </div>
      {/* Sign in */}
      <div
        dir="rtl"
        className="flex justify-center items-center min-h-screen py-10"
      >
        <Card
          className={`flex flex-col justify-center items-center shadow-md dark:shadow-darkMode-dark50 p-5`}
          color="transparent"
          shadow={false}
        >
          <Typography
            className={`${typographyStyle}`}
            variant="h4"
            color="blue-gray"
          >
            {loading ? "جاري تسجيل الدخول..." : `تسجيل الدخول `}
            <span className="text-mainColor500 font-bold">كمدير</span>
          </Typography>
          <Typography
            color="gray"
            className={`mt-1 font-normal ${typographyStyle}`}
          >
            سعيد بلقائك! هل تريد تسجيل الدخول كمدير؟ املء هذه البيانات
            التالية...
          </Typography>
          <form
            onSubmit={onLogin}
            className="mt-8  w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              {/* idNum */}
              <Typography
                variant="h6"
                color="blue-gray"
                className={`-mb-3 ${typographyStyle}`}
              >
                رقم الهوية
              </Typography>
              <Input
                size="lg"
                placeholder="123456789"
                className={`  ${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={user.idNum}
                onChange={(ev) => setUser({ ...user, idNum: ev.target.value })}
              />
              {/* end email */}

              {/* password */}
              <Typography
                variant="h6"
                color="blue-gray"
                className={`-mb-3 ${typographyStyle}`}
              >
                كلمة المرور
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className={`  ${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={user.password}
                onChange={(ev) =>
                  setUser({ ...user, password: ev.target.value })
                }
              />
              {/* end password */}
            </div>
            <Checkbox
              color="green"
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className={`flex items-center font-normal ${typographyStyle}`}
                >
                  انا اوافق علي
                  <Link
                    to="#"
                    className="font-medium transition-colors hover:text-gray-900 dark:hover:text-darkMode400"
                  >
                    &nbsp;الشروط والإتفاقيات
                  </Link>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button
              className={`mt-6 text-darkMode-dark50  dark:text-darkMode-dark950 dark:hover:bg-darkMode-dark700 dark:hover:text-darkMode-dark50 duration-200 bg-mainColor500 dark:bg-darkMode-dark50`}
              fullWidth
              type="submit"
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "املء البيانات أولا!" : "سجل الدخول الآن!"}
            </Button>

            <Typography color="gray" className="mt-4 text-center font-normal">
              <Link
                className={`font-medium text-gray-900 dark:hover:text-darkMode400 ${typographyStyle}`}
                to={`#`}
              >
                <Button
                  fullWidth
                  className={`mt-6 text-darkMode-dark50  dark:text-darkMode-dark950 dark:hover:bg-darkMode-dark700 dark:hover:text-darkMode-dark50 duration-200 bg-mainColor500 dark:bg-darkMode-dark50`}
                >
                  نسيت كلمة السر
                </Button>
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AdminLoginPage;
