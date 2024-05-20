import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { base_url } from "../../system-redux/data/apis";
import { getAllCoursesInCart } from "../../system-redux/functionality/cart/allCoursesInCartSlice";
const CartItem = () => {
  const dispatch = useDispatch();
  const { coursesInCartData, coursesInCartLoading } = useSelector(
    (state) => state.allCoursesInCart
  );
  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const handleDeleteCourse = async (item) => {
    try {
      Swal.fire({
        title: "هل انت متأكد؟?",
        text: "انت علي وشك حذف دورة من سلة تسوقك!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم، احذفه!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(
            `${base_url}/students/cart/${item?._id}`
          );

          dispatch(getAllCoursesInCart(studentData?._id));
          console.log("response", response);
          if (response.data.status === "success") {
            Swal.fire({
              title: "تم الحذف بنجاح!",
              text: `${item.course?.course.substring(0, 15)} تم الحذف بنجاح`,
              icon: "success",
            });
            toast.success(
              `تم حذف دورة ${item.course?.course.substring(
                0,
                15
              )} للمعلم ${item.course?.fullName.substring(0, 15)} نجاح!`
            );
          }
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`);
    } finally {
    }
  };

  const styles = {
    darkText: "duration-200 transition-all dark:text-darkMode50",
    darkBg: "dark:bg-darkMode700",
  };

  return (
    <div
      className="flex flex-col
    gap-y-2"
    >
      <div
        className={`hidden lg:inline-flex items-center 
        justify-between font-semibold bg-white p-2 ${styles.darkText} dark:bg-darkMode-dark800`}
      >
        <p className="w-1/5 flex items-center justify-center">صورة</p>
        <p className="w-1/5 flex items-center justify-center">اسم المعلم</p>
        <p className="w-1/5 flex items-center justify-center">الفرع</p>
        <p className="w-1/5 flex items-center justify-center">الدورة</p>
        <p className="w-1/5 flex items-center justify-center">السعر</p>
      </div>

      {/* Geneate the Course */}
      <div
        className={`flex flex-col
                 gap-y-5 justify-center ${styles.darkText}`}
      >
        {/* This is for all a single Course */}
        {coursesInCartData?.map((item, index) => (
          // This Div Container For the Course Content
          <div
            key={index}
            className={`w-full bg-white ${styles.darkBg}
                       p-4 flex flex-col md:flex-row items-center
                        justify-between gap-4`}
          >
            {/* Div 1 for Image Part */}
            <div
              className="flex items-center justify-center
                               md:justify-start gap-x-3 w-full md:w-1/5"
            >
              <span
                onClick={() => handleDeleteCourse(item)}
                className="hover:text-red-600
                               cursor-pointer duration-200"
              >
                <AiOutlineClose />
              </span>
              <div>
                <img
                  src={item.course?.ad?.courseImg}
                  width={500}
                  height={500}
                  alt="Course image"
                  className="w-full h-40 md:w-20 md:h-20 object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Div 2 for branch Part */}
            <div
              className="flex items-center justify-center
                           gap-x-3 w-full md:w-1/5"
            >
              <p className="text-lg font-semibold">{item.course?.fullName}</p>
            </div>

            {/* Div 3 for branch Part */}
            <div
              className="flex items-center justify-center
                           gap-x-3 w-full md:w-1/5"
            >
              <p className="text-lg font-semibold">{item.course?.branch}</p>
            </div>

            {/* Div 4 for course Part */}
            <div
              className="flex items-center justify-center
                           gap-x-3 w-full md:w-1/5"
            >
              <p className="text-lg font-semibold">{item.course?.course}</p>
            </div>

            {/* Div 5 for Price Part */}
            <div
              className="flex items-center justify-center
                           gap-x-3 w-full md:w-1/5"
            >
              <p className="text-lg font-semibold">
                {item.course?.ad?.showDiscount === false
                  ? item.course?.ad?.priceOfCourse + " ₪"
                  : item.course?.ad?.discount + " ₪"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;
