import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachers } from "../../system-redux/users/teachers/allTeachersSlice";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { getAllCourses } from "../../system-redux/functionality/courses/allCoursesSlice";
import { base_url } from "../../system-redux/data/apis";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const Courses = ({ updateCoursesInCart, setUpdateCoursesInCart }) => {
  const dispatch = useDispatch();
  const { coursesData, coursesLoading } = useSelector(
    (state) => state.allCourses
  );
  const { pathname } = useLocation();

  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    dispatch(getAllCourses(studentData?._id));
  }, [studentData]);

  const [loading, setLoading] = useState(false);

  const addToCart = async (course) => {
    try {
      setLoading(true);

      // استخدام toast.promise للإشعارات
      await toast.promise(
        axios.post(
          `${base_url}/students/cart`,
          {
            studentId: studentData?._id,
            course: course,
            courseId: course._id,
          },
          {
            withCredentials: true,
          }
        ),
        {
          loading: "جاري إضافة الدورة إلي السلة...",
          success: (res) => {
            console.log("res:", res);
            setUpdateCoursesInCart(!updateCoursesInCart);

            return `تمت إضافة دورة ${course.course} للمعلم ${course.fullName} بنجاح إلى السلة`;
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
      setLoading(false);
    }
  };

  const stripePromise = loadStripe(
    process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const handleCheckOut = async (course) => {
    toast.success("Please wait, preparing the payment page.");
    try {
      const stripe = await stripePromise;
      const config = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${base_url}/payment/checkout`,
        {
          course: {
            course,
            courseId: course._id,
          },
          adId: course.ad._id,
          email: studentData.email,
          endPoint: pathname,
          mode: false,
        },
        config
      );
      const { data } = response;
      if (data.success) {
        await stripe?.redirectToCheckout({
          sessionId: data.id,
        });
        console.log(data);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log("payment error:", error);
      toast.error("فشلت عملية معالجة صفحة الدفع، الرجاء المحاولة مرة أخرى");
    }
  };
  // ========= Stripe Payment End here =========

  const inputStyle =
    "dark:text-darkMode-dark50 !border !border-gray-300 bg-darkMode-dark50 text-gray-900 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50";

  return (
    <div className="flex my-10 mx-2">
      {/* courses */}
      <div className="w-[80%] grid grid-cols-3 gap-2">
        {coursesData.length > 0 ? (
          coursesData?.map((course) => (
            <Card className="overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none h-44 relative overflow-hidden"
              >
                <img
                  src={course.ad.courseImg}
                  className="w-full object-cover hover:scale-105 duration-300 cursor-pointer"
                  alt="teacher img"
                />
              </CardHeader>
              <CardBody className="p-0">
                <Typography
                  className="text-center pt-3"
                  variant="h4"
                  color="blue-gray"
                >
                  دورة <span>{course.course}</span>
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal px-4"
                >
                  مقدمة من المعلم{" "}
                  <span className="text-mainColor500 font-bold">
                    {course.fullName}
                  </span>
                </Typography>

                <div className="flex items-center justify-between px-4">
                  <Typography className="font-normal">
                    عدد الطلاب المشتركين
                  </Typography>
                  <Typography
                    className={`font-normal ${
                      course.studentsIds.length > 0
                        ? "text-mainColor500"
                        : "text-red-500"
                    }`}
                  >
                    {course.studentsIds.length}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="lead"
                    color="black"
                    className="mt-3 font-normal px-4"
                  >
                    سعر الدورة :
                  </Typography>
                  <Typography
                    dir="rtl"
                    variant="lead"
                    color="black"
                    className=" font-normal bg-orange-300 text-center"
                  >
                    {course?.ad?.showDiscount === false ? (
                      <>
                        <span className="font-bold ">
                          {course.ad.priceOfCourse}
                        </span>
                        <span className="text-sm font-bold"> ILS</span>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-700 line-through text-sm">
                          {course.ad.priceOfCourse}
                        </span>
                        <span className="font-bold">
                          {" "}
                          {course.ad.discount}{" "}
                        </span>
                        <span className="text-sm font-bold">ILS</span>
                      </>
                    )}
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="flex flex-col gap-2 pb-0 px-0">
                <div>
                  <Button
                    onClick={
                      !loading
                        ? () => addToCart(course)
                        : () =>
                            toast("من فضلك إنتظر!", {
                              duration: 6000,
                            })
                    }
                    className="w-1/2 rounded-es-2xl rounded-none py-2 bg-mainColor600 hover:bg-mainColor500 duration-200"
                  >
                    {loading ? (
                      <div className="flex justify-center">
                        <Spinner className="w-4 h-4" />
                      </div>
                    ) : (
                      <span>اضف الي السلة</span>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleCheckOut(course)}
                    className="w-1/2 rounded-ee-2xl rounded-none py-2 bg-red-600 hover:bg-red-500 duration-200"
                  >
                    اشتري الآن
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>لا يوجد دورات متاحة حالياً</p>
        )}
      </div>
      {/* end */}

      {/* filtration */}
      <div className="w-[20%] h-52 bg-gray-100 rounded p-2">
        {/* search input */}
        <div className="">
          <Input
            placeholder="ابحث في الأسماء"
            className={`${inputStyle}`}
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
            icon={<CiSearch className="text-mainColor500 left-0" />}
          />
        </div>
        {/* end */}

        {/* selections inputs */}
        <div>
          <div>
            <Select
              placeholder="اختر بين الدورات"
              className={`${inputStyle}`}
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[80px]" }}
            >
              <Option value="">رياضيات</Option>
              <Option value="">علوم</Option>
              <Option value="">حاسب</Option>
              <Option value="">انجليزي</Option>
              <Option value="">عربي</Option>
            </Select>
          </div>
        </div>
        {/*  */}
      </div>
      {/* end */}
    </div>
  );
};

export default Courses;
