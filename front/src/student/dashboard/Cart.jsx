import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import PaymentForm from "./PaymentForm";
import { base_url } from "../../system-redux/data/apis";
import { getAllCoursesInCart } from "../../system-redux/functionality/cart/allCoursesInCartSlice";
const Cart = ({ setShowItemDashBoard }) => {
  const dispatch = useDispatch();
  const { coursesInCartData, coursesInCartLoading } = useSelector(
    (state) => state.allCoursesInCart
  );
  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const handleResetCart = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reseted it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // delete all in the user cart
          const response = await axios.delete(
            `${base_url}/students/cart/${studentData?._id}`
          );
          console.log(response);
          dispatch(getAllCoursesInCart(studentData?._id));
          if (response.data.status === "success") {
            Swal.fire({
              title: "Reseted!",
              text: "Your Cart has been reseted successfully.",
              icon: "success",
            });
            toast.success(`Your Cart has been reseted successfully.`);
          }
        }
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`);
    } finally {
    }
  };

  useEffect(() => {
    dispatch(getAllCoursesInCart(studentData?._id));
  }, [studentData]);

  const styles = {
    darkText: "duration-200 transition-all dark:text-darkMode50",
    darkBg: "dark:bg-darkMode700",
  };

  return coursesInCartData?.length > 0 ? (
    <div className="min-h-[700px] bg-bg-img">
      <h2
        className={`text-2xl font-semibold mb-2 p-4 text-center ${styles.darkText}`}
      >
        سلة المشتريات
      </h2>
      <div className="flex flex-col gap-y-5">
        <CartItem />
        <div className="flex items-center justify-end ml-10">
          <button
            className={`bg-red-700 text-base
            font-semibold
             py-2 px-6 hover:bg-red-500 text-white
              duration-200 ${styles.darkText}`}
            onClick={handleResetCart}
          >
            reset cart
          </button>
        </div>
        {/* Payment Form */}
        <PaymentForm />
      </div>
    </div>
  ) : (
    <div
      className={`flex flex-col gap-y-6 items-center 
      justify-center bg-bg-img px-4 min-h-[700px] dark:bg-inherit `}
    >
      <p
        className={`border-[1px] border-mainColor500 dark:border-whiteColor ${styles.darkText} w-full p-2 text-center`}
      >
        في الوقت الحالي سلتك فارغة
      </p>
      <div>
        <button
          onClick={() => {
            setShowItemDashBoard("courses");
            sessionStorage.whereStudent = "courses";
          }}
          className={` bg-darkMode-dark800 text-white py-2 px-6 
        rounded-md hover:bg-mainColor500 duration-200 ${styles.darkText} dark:hover:text-darkMode900 dark:hover:bg-darkMode50 duration-200 ${styles.darkBg}`}
        >
          ارجع لصفحة الدورات
        </button>
      </div>
    </div>
  );
};

export default Cart;
