import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import Nav from "../../homepage/components/Nav";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../system-redux/data/apis";

const SetPasswordTeacher = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const t = searchParams.get("t");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("كلمة السر وتأكيد كلمة السر غير متطابقين");
      return;
    }
    // إرسال كلمة السر للخادم أو التخزين المناسب هنا

    try {
      setFormLoading(true);

      // استخدام toast.promise للإشعارات
      await toast.promise(
        axios.post(
          `${base_url}/teachers/set-password`,
          {
            password,
          },
          {
            params: {
              t,
            },
          }
        ),
        {
          loading: "برجاء الانتظار قليلا جاري إرسال رسالتك...",
          success: (res) => {
            console.log("res:", res);
            setTimeout(() => {
              navigate("/teacher/login");
            }, 3000);

            return `تم تعيين كلمة السر الخاصة بك بنجاح! تستطيع الآن التسجيل كمعلم.`;
          },
          error: (error) => {
            console.error(error);
            return (
              `${error.response.data.message}` || "حدث خطأ، رجاء حاول مرة أخري!"
            );
          },
        }
      );
    } finally {
      setFormLoading(false);
    }
  };
  const inputStyle =
    "dark:text-darkMode-dark50 !border !border-gray-300 bg-darkMode-dark50 text-gray-900 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50";
  const fieldStyle = "flex flex-col gap-5";
  const typographyStyle = "-mb-10 dark:text-darkMode-dark50";

  return (
    <div className="">
      <Nav />
      <div className="min-h-screen flex flex-col gap-5 justify-center items-center">
        <div className="flex flex-col gap-2">
          <Typography
            variant="h1"
            align="center"
            className="text-mainColor500 "
          >
            تفوَّق
          </Typography>
          <Typography
            align="center"
            className="text-darkMode-dark500 dark:text-darkMode-dark50"
          >
            بمجرد تعيين كلمة السر ستستطيع التسجيل في الموقع كمعلم
          </Typography>
        </div>
        <Card>
          <CardBody className="dark:bg-darkMode-dark800 shadow-md dark:shadow-darkMode-dark50 rounded-lg">
            <form dir="rtl" className="flex flex-col gap-4">
              <div className={fieldStyle}>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className={typographyStyle}
                >
                  كلمة السر
                </Typography>
                <Input
                  placeholder="كلمة السر"
                  className={`${inputStyle}`}
                  type="password"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  name="name"
                />
              </div>

              <div className={fieldStyle}>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className={typographyStyle}
                >
                  تأكيد كلمة السر
                </Typography>
                <Input
                  placeholder="تأكيد كلمة السر"
                  className={`${inputStyle}`}
                  type="password"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={confirmPassword}
                  onChange={(ev) => setConfirmPassword(ev.target.value)}
                  name="name"
                />
              </div>
            </form>

            <Button
              color="green"
              fullWidth
              onClick={handleSubmit}
              className="bg-mainColor500 py-2 mt-4"
            >
              {formLoading ? (
                <div className="flex justify-center ">
                  <Spinner className="h-4 w-4" />
                </div>
              ) : (
                "تعيين كلمة السر"
              )}
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SetPasswordTeacher;
