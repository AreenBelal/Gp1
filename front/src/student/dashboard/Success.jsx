import { Button, Card } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect } from "react";
import { PiCurrencyDollarFill } from "react-icons/pi";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { base_url } from "../../system-redux/data/apis";
import { getAllCoursesInCart } from "../../system-redux/functionality/cart/allCoursesInCartSlice";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../homepage/components/Nav";
const Success = () => {
  const [queryParameters] = useSearchParams();
  const session_id = queryParameters.get("session_id");
  const mode = queryParameters.get("mode");
  const courseId = queryParameters.get("course");
  const total = queryParameters.get("total");
  const adId = queryParameters.get("adId");
  const { coursesData, coursesLoading } = useSelector(
    (state) => state.allCourses
  );

  const { cn, tc, ro } = useSelector((state) => state.ma);

  const dispatch = useDispatch();

  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );

  const { coursesInCartData, coursesInCartLoading } = useSelector(
    (state) => state.allCoursesInCart
  );

  const createOrder = async () => {
    if (mode === "false" || mode === false) {
      const course = coursesData.filter((cou) => {
        return cou._id === courseId;
      });
      console.log(studentData?._id);
      try {
        const res = await axios.post(`${base_url}/orders`, {
          courseId,
          course: course,
          studentId: studentData?._id,
          session_id,
          mode,
          total: +total,
          adId,
        });
        console.log(res);
      } catch (error) {
        console.log("error create order:", error);
      }
    } else if (mode === "true" || mode === true) {
      try {
        const res = await axios.post(`${base_url}/orders`, {
          courses: coursesInCartData && coursesInCartData,
          studentId: studentData?._id,
          session_id,
          mode,
          total: +total,
        });
        console.log(res);
        dispatch(getAllCoursesInCart(studentData?._id));
      } catch (error) {
        console.log("error create order:", error);
      }
    }
  };

  const deleteCourseFromCart = async () => {
    if (mode === "false" || mode === false) {
      const courseToDeleteFromCart = coursesInCartData?.filter((course) => {
        return course.courseId === courseId;
      });
      console.log("courseToDeleteFromCart:", courseToDeleteFromCart);
      console.log("studentData:", studentData?._id);
      try {
        // delete all in the user cart
        const response = await axios.delete(
          `${base_url}/students/cart/${courseToDeleteFromCart[0]?._id}`
        );
        dispatch(getAllCoursesInCart(studentData?._id));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // delete all in the user cart
        const response = await axios.delete(
          `${base_url}/students/cart/${studentData?._id}`
        );

        dispatch(getAllCoursesInCart(studentData?._id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    dispatch(getAllCoursesInCart(studentData?._id));
  }, [studentData]);

  useEffect(() => {
    if (mode === true || mode === "true") {
      createOrder();
    } else if (mode === false || mode === "false") {
      createOrder();
      deleteCourseFromCart();
    }
  }, [studentData, coursesInCartData]);

  return (
    <div>
      <Nav />
      <div className="bg-white h-screen flex justify-center items-center">
        <Card
          dir="rtl"
          className="flex flex-col gap-4 items-center justify-center p-4"
        >
          <p className="w-full border-b-[1px] border-mainColor500 flex justify-center pb-2">
            <PiCurrencyDollarFill className="w-16 h-16 text-mainColor500 font-bold " />
          </p>
          <p className="text-xl text-mainColor500 font-bold">
            تم الدفع بنجاح شكرا لك!
          </p>
          <p>تحقق من دوراتك، لقد تم الإشتراك في الدورات التي دفعت من أجلها</p>
          <Link to={`/student/dashboard`}>
            <Button className="bg-mainColor500 py-2 px-8">
              استمر في التصفح
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Success;
