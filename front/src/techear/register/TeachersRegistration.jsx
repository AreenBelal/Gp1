import React, { useRef, useState, useEffect } from "react";
import {
  Input,
  Button,
  Typography,
  Menu,
  MenuHandler,
  Spinner,
  Badge,
  Radio,
  List,
  ListItem,
  ListItemPrefix,
  Card,
} from "@material-tailwind/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Nav from "../../homepage/components/Nav";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { base_url } from "../../system-redux/data/apis";

const TeachersRegistration = () => {
  const { isDarkModeActive } = useSelector(
    (state) => state.simpleDataFlowManagement
  );
  const [value, onChange] = useState(null);
  const date = new Date(value && value);

  const day = date.getDate(); // اليوم (23)
  const month = date.getMonth() + 1; // الشهر (4)، ملاحظة: تبدأ الشهور من 0، لذلك يتم إضافة واحد
  const year = date.getFullYear(); // السنة (2024)

  const formattedDate = `${day}/${month}/${year}`;

  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    idNum: "",
    branch: "",
    course: "",
    gender: {
      male: false,
      female: false,
    },
  });
  const [avatar, setAvatar] = useState(null);
  const [cv, setCv] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const branchParam = searchParams.get("branch");
  const courseParam = searchParams.get("course");

  const handleMessage = async (ev) => {
    ev.preventDefault();

    const { fullName, email, phone, age, idNum, gender } = message;

    const isEmailValid = (email) => {
      // ريجيولر إكسبريشن للتحقق من صحة الإيميل
      const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9]){2,}@(gmail|yahoo)\.com$/;
      return emailRegex.test(email);
    };

    const emailIsValid = isEmailValid(email);

    const isPalestinianPhoneNumberValid = (phoneNumber) => {
      // ريجيولر إكسبريشن للتحقق من صحة رقم الهاتف السعودي
      const palestinianPhoneNumberRegex =
        /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/;
      return palestinianPhoneNumberRegex.test(phoneNumber);
    };
    // في داخل دالة handleMessage
    const phoneNumberIsValid = isPalestinianPhoneNumberValid(phone);

    let formData = new FormData();

    if (fullName === "") {
      return toast.error("تأكد من كتابة اسمك");
    }
    formData.append("fullName", fullName);

    if (!phoneNumberIsValid) {
      return toast.error(
        "خطأ في رقم الهاتف: تأكد أنك تكتب رقم الهاتف مسبوقا برمز البلد وكتابة علامة + اختيارية"
      );
    }

    formData.append("phone", phone);

    if (!emailIsValid) {
      return toast.error("رجاء اكتب إيميلك بشكل صحيح");
    }

    formData.append("email", email);

    if (age === "") {
      return toast.error("رجاء اكتب عمرك");
    }

    formData.append("age", age);

    const isIdNumNine = /^\d{9}$/.test(idNum.toString());

    if (!isIdNumNine) {
      return toast.error(
        "رجاء اكتب رقم الهوية ولا يجب أن تزيد او تقل عن 9 ارقام"
      );
    }

    formData.append("idNum", idNum);

    if (gender.male === false && gender.female === false) {
      return toast.error("رجاء اختيار الجنس");
    }

    if (gender.male === true) {
      formData.append("gender", "male");
    } else {
      formData.append("gender", "female");
    }

    if (value === null) {
      return toast.error("رجاء تأكد من إختيار تاريخ الميلاد الخاص بك");
    }
    console.log(formattedDate);
    formData.append("dateOfBirth", formattedDate);

    if (!avatar) {
      return toast.error("رجاء ارفع صورة شخصية لك");
    }

    formData.append("avatar", avatar);

    if (!cv) {
      return toast.error(
        "رجاء ارفع السيرة الذاتية الخاصة بك وتأكد انها بإمتداد pdf"
      );
    }

    formData.append("cv", cv);

    formData.append("branch", branchParam);
    formData.append("course", courseParam);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      setFormLoading(true);

      // استخدام toast.promise للإشعارات
      await toast.promise(
        axios.post(`${base_url}/teachers/register`, formData, config),
        {
          loading: "برجاء الانتظار قليلا جاري إرسال رسالتك...",
          success: (res) => {
            setMessage((prevState) => ({
              ...prevState,
              fullName: "",
              email: "",
              phone: "",
              age: "",
              idNum: "",
              gender: {
                male: false,
                female: false,
              },
            }));
            setAvatar(null);
            setCv(null);
            onChange(null);

            return `تم إرسال طلبكم بنجاح، رجاء تحقق من ايميلك بإستمرار في انتظار الموافقة`;
          },
          error: (error) => {
            console.error(error);
            return (
              `${error.response.data.message}` ||
              "فشل ارسال الرسالة.. رجاء حاول مرة أخري"
            );
          },
        }
      );
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    setMessage((prevState) => ({
      ...prevState,
      branch: branchParam,
      course: courseParam,
    }));
  }, []);

  const typographyStyle = "-mb-10 dark:text-darkMode-dark50";
  const inputStyle =
    "dark:text-darkMode-dark50 !border !border-gray-300 bg-darkMode-dark50 text-gray-900 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50";
  const fieldStyle = "flex flex-col gap-5";
  return (
    <div>
      <Nav />
      <Container className="min-h-screen py-52">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={isDarkModeActive ? "outlined" : ""}
            className="dark:text-darkMode-dark50 text-base p-2 md:px-4 dark:border-white bg-mainColor500 text-darkMode-dark50 dark:bg-inherit"
            onClick={() => navigate(-1)}
          >
            قم بالرجوع للصفحة السابقة
          </Button>
        </div>
        {/* <!-- Right column container with form --> */}
        <div className="flex flex-col items-center gap-2">
          <p className=" dark:text-darkMode-dark50  text-center text-2xl font-bold tracking-wide">
            نمـوذج تسجيل في أكاديمية تفوَّق
          </p>
          <p className="md:w-[80%] lg:w-[60%] text-darkMode-dark500 dark:text-darkMode-dark400 mb-5 text-center text-base font-bold tracking-wide">
            من خلال ملء هذا النموذج ستسطيع التسجيل في أكاديمية تفوَّق كمعلم
          </p>
          <form
            onSubmit={handleMessage}
            className="flex flex-col gap-2 w-full md:w-[80%] lg:w-[75%] shadow-md shadow-gray-500 dark:shadow-darkMode-dark50 p-10"
          >
            {/* <!-- full name --> */}
            <div className={`${fieldStyle}`}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                الإسم الكامل
              </Typography>
              <Input
                color={isDarkModeActive ? "green" : "gray"}
                placeholder="الإسم الأول والأخير"
                className={`${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={message.fullName}
                onChange={(ev) =>
                  setMessage({ ...message, fullName: ev.target.value })
                }
                name="name"
              />
            </div>

            {/* <!-- phone  --> */}
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                رقم الهاتف
              </Typography>
              <div className="relative flex">
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <Button
                      ripple={false}
                      variant="text"
                      className="dark-text cursor-default flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                    >
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/taffuwq-courses.appspot.com/o/Palestinian%20flag.png?alt=media&token=2603c015-4e27-409e-a2a7-f1318b7f6846"
                        alt="flag-for-egypt"
                        className="h-4 w-4 rounded-full object-cover"
                      />
                    </Button>
                  </MenuHandler>
                </Menu>
                <Input
                  dir="rtl"
                  type="tel"
                  color={isDarkModeActive ? "green" : "gray"}
                  placeholder="رقم التليفون"
                  value={message.phone}
                  onChange={(ev) =>
                    setMessage({ ...message, phone: ev.target.value })
                  }
                  className={`${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  name="phone"
                />
              </div>
            </div>

            {/* <!-- email --> */}
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                البريد الإلكتروني
              </Typography>
              <Input
                color={isDarkModeActive ? "green" : "gray"}
                placeholder="البريد الإلكتروني"
                className={`${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={message.email}
                onChange={(ev) =>
                  setMessage({ ...message, email: ev.target.value })
                }
                name="email"
              />
            </div>

            {/* <!-- age --> */}
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                ما هو عمرك؟
              </Typography>
              <Input
                color={isDarkModeActive ? "green" : "gray"}
                placeholder="اضغط لكتابة العمر!"
                className={`${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={message.age}
                onChange={(ev) =>
                  setMessage({ ...message, age: ev.target.value })
                }
                name="age"
                type="number"
              />
            </div>

            {/* <!-- idNum --> */}
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                رقم الهوية
              </Typography>
              <Input
                color={isDarkModeActive ? "green" : "gray"}
                placeholder="اضغط لكتابة رقم الهوية!"
                className={`${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={message.idNum}
                onChange={(ev) =>
                  setMessage({ ...message, idNum: ev.target.value })
                }
                name="idNum"
              />
            </div>

            {/* <!-- branch --> */}
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                الفرع
              </Typography>
              <Input
                color={isDarkModeActive ? "green" : "gray"}
                placeholder="اضغط لكتابة الفرع!"
                className={`${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={message.branch}
                disabled
                name="branch"
              />
            </div>

            {/* <!-- course --> */}
            <div className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                الدورة
              </Typography>
              <Input
                color={isDarkModeActive ? "green" : "gray"}
                placeholder="اضغط لكتابة الدورة!"
                className={`${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={message.course}
                disabled
                name="course"
              />
            </div>

            <Form className={fieldStyle}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                الجنس
              </Typography>
              <div>
                <div className="border-b-[1px] border-gray-600 mb-1">
                  <Form.Check
                    className="flex items-center gap-10 cursor-pointer w-fit hover:bg-darkMode-dark200 rounded-lg px-3 pt-2"
                    type={"radio"}
                    id={`male`}
                  >
                    <Form.Check.Input
                      type={"radio"}
                      isValid
                      className="mb-3 cursor-pointer"
                      checked={message.gender.male}
                      onChange={() => {
                        setMessage((prevState) => ({
                          ...prevState,
                          gender: { male: true, female: false },
                        }));
                      }}
                    />
                    <Form.Check.Label
                      bsPrefix="dark:text-darkMode-dark50"
                      className="cursor-pointer"
                    >
                      {`ذكر`}
                    </Form.Check.Label>
                  </Form.Check>
                </div>

                <div>
                  <Form.Check
                    className="flex items-center gap-10 cursor-pointer w-fit hover:bg-darkMode-dark200 rounded-lg px-3 pt-2 mt-0"
                    type={"radio"}
                    id={`female`}
                  >
                    <Form.Check.Input
                      type={"radio"}
                      isValid
                      className="mb-3 cursor-pointer"
                      checked={message.gender.female === true}
                      onChange={() => {
                        setMessage((prevState) => ({
                          ...prevState,
                          gender: { male: false, female: true },
                        }));
                      }}
                    />
                    <Form.Check.Label
                      bsPrefix="dark:text-darkMode-dark50"
                      className="cursor-pointer"
                    >{`أنثي`}</Form.Check.Label>
                  </Form.Check>
                </div>
              </div>
            </Form>

            <div className={`${fieldStyle} mb-2`}>
              <Typography
                variant="h6"
                color="blue-gray"
                className={typographyStyle}
              >
                تاريخ الميلاد
              </Typography>
              <DatePicker
                className="rounded-md"
                onChange={onChange}
                value={value}
              />
            </div>

            {/* Upload file (avatar) faild */}
            <div className="flex flex-col gap-y-2  group ">
              <span
                className={`pl-1 text-blue-gray-900 font-bold dark:text-darkMode-dark50`}
              >
                ارفع صورة شخصية لك
              </span>
              {avatar ? (
                <Badge
                  withBorder
                  className="cursor-pointer transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20 "
                  content={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  onClick={() => setAvatar(null)}
                >
                  <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkMode-dark50 border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200 dark:hover:bg-darkMode-dark800 dark:hover:text-darkMode-dark50 dark:bg-darkMode-dark950 ">
                    {avatar ? (
                      <span className="dark:text-darkMode-dark50">
                        {avatar.name}
                      </span>
                    ) : (
                      <div className="dark:text-darkMode-dark50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>

                        <span className="dark:text-darkMode-dark50">تحميل</span>
                      </div>
                    )}

                    <input
                      type="file"
                      onChange={(ev) => {
                        setAvatar(ev.target.files[0]);
                      }}
                      className="hidden"
                    />
                  </label>
                </Badge>
              ) : (
                <label className="dark:text-darkMode-dark50 cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkMode-dark50 border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200 dark:hover:bg-darkMode-dark800 dark:hover:text-darkMode-dark50 dark:bg-darkMode-dark950">
                  {avatar ? (
                    <span className="dark:text-darkMode-dark50">
                      {avatar.name}
                    </span>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>

                      <span className="dark:text-darkMode-dark50">تحميل</span>
                    </>
                  )}

                  <input
                    type="file"
                    onChange={(ev) => {
                      const file = ev.target.files[0];
                      // التحقق من نوع الملف قبل تعيينه
                      if (file && file.type.startsWith("image/")) {
                        setAvatar(file);
                      } else {
                        toast.error("يرجى تحديد صورة فقط");
                      }
                    }}
                    className="hidden"
                    accept="image/*" // تحديد أنه يقبل فقط صور
                  />
                </label>
              )}
            </div>
            {/* end Upload file (avatar) faild */}

            {/* Upload file (CV) faild */}
            <div className="flex flex-col gap-y-2  group ">
              <span
                className={`pl-1 text-blue-gray-900 font-bold dark:text-darkMode-dark50`}
              >
                ارفع السيرة الذاتية
              </span>
              {cv ? (
                <Badge
                  withBorder
                  className="cursor-pointer transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20 "
                  content={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                  onClick={() => setCv(null)}
                >
                  <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkMode-dark50 border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200 dark:hover:bg-darkMode-dark800 dark:hover:text-darkMode-dark50 dark:bg-darkMode-dark950 ">
                    {cv ? (
                      <span className="dark:text-darkMode-dark50">
                        {cv.name}
                      </span>
                    ) : (
                      <div className="dark:text-darkMode-dark50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>

                        <span className="dark:text-darkMode-dark50">تحميل</span>
                      </div>
                    )}

                    <input
                      type="file"
                      onChange={(ev) => {
                        setCv(ev.target.files[0]);
                      }}
                      className="hidden"
                    />
                  </label>
                </Badge>
              ) : (
                <label className="dark:text-darkMode-dark50 cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkMode-dark50 border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200 dark:hover:bg-darkMode-dark800 dark:hover:text-darkMode-dark50 dark:bg-darkMode-dark950">
                  {cv ? (
                    <span className="dark:text-darkMode-dark50">{cv.name}</span>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>

                      <span className="dark:text-darkMode-dark50">تحميل</span>
                    </>
                  )}

                  <input
                    type="file"
                    onChange={(ev) => {
                      const file = ev.target.files[0];
                      // التحقق من نوع الملف قبل تعيينه
                      if (file && file.type === "application/pdf") {
                        setCv(file);
                      } else {
                        toast.error("يرجى تحديد ملف بامتداد PDF فقط");
                      }
                    }}
                    className="hidden"
                    accept=".pdf" // تحديد أنه يقبل فقط ملفات PDF
                  />
                </label>
              )}
            </div>
            {/* end Upload file (CV) faild */}

            {/* <!-- Submit button --> */}
            <Button
              type="submit"
              variant={isDarkModeActive ? "outlined" : ""}
              className="dark:text-darkMode-dark50 dark:border-white text-xl bg-mainColor500 text-darkMode-dark50 dark:bg-inherit py-2"
            >
              {formLoading ? (
                <div className="flex justify-center ">
                  <Spinner className="h-6 w-6" />
                </div>
              ) : (
                "إرسال"
              )}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default TeachersRegistration;
