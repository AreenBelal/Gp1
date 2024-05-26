import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "../../system-redux/data/apis";
import { useLocation } from "react-router-dom";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  // handle cart database
  const { coursesInCartData, coursesInCartLoading } = useSelector(
    (state) => state.allCoursesInCart
  );

  // handle price
  const [totlAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let amount = 0;

    // حساب مجموع الأسعار بعد كل تغيير في coursesInCartData
    const result = coursesInCartData.map((course) => {
      // افحص إذا كان هناك تخفيض متاح للعنصر
      if (course.course?.ad?.showDiscount) {
        // احتساب السعر بعد التخفيض
        amount += parseInt(course.course?.ad?.discount);
      } else {
        // إذا لم يكن هناك تخفيض، احتساب السعر كالمعتاد
        amount += parseInt(course.course?.ad?.priceOfCourse);
      }
    });
    console.log(amount);
    // تحديث الحالة مع القيمة الجديدة لمجموع الأسعار
    setTotalAmount(amount);
  }, [coursesInCartData]); // إعادة تشغيل الآثار عند تغيير coursesInCartData

  const Payform = [
    {
      id: 1,
      name: "مجموع سعر السلة",
      around: totlAmount ? totlAmount + " ₪" : 0,
      color: "",
    },
    {
      id: 2,
      name: "مصاريف إدارية",
      around: 20 + " ₪",
      color: "",
    },
    {
      id: 3,
      name: "المبلغ الإجمالي",
      around: totlAmount ? totlAmount + 20 + " ₪" : 0,
      color: "text-mainColor500 font-bold",
    },
  ];

  // ========= Stripe Payment Start here =========

  const stripePromise = loadStripe(
    process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  console.log(process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const handleCheckOut = async () => {
    toast.success("Please wait, preparing the payment page.");
    try {
      const stripe = await stripePromise;
      const config = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        `${base_url}/payment/checkout`,
        {
          courses: coursesInCartData,
          email: studentData.email,
          endPoint: pathname,
          mode: true,
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

  const styles = {
    darkText: "duration-200 transition-all dark:text-darkMode50",
    darkBg: "dark:bg-darkMode700",
  };

  return (
    <div className={`w-full bg-white p-4 ${styles.darkBg} ${styles.darkText}`}>
      <h2 className="text-lg border-b-[1px] border-mainColor500 pb-2 mb-2">
        تفاصيل السلة
      </h2>
      {Payform?.map((item) => (
        <div key={item.id} className="border-b-[1px] border-secondary-200 py-2">
          <div className="max-w-lg flex items-center justify-between">
            <p className=" uppercase font-medium">{item.name}</p>
            <p className={`${item.color}`}>{item.around}</p>
          </div>
        </div>
      ))}
      <button
        className="bg-mainColor600 text-white
         mt-4 py-2 px-10 hover:bg-mainColor500 cursor-pointer
          duration-200"
        onClick={handleCheckOut}
      >
        ادفع الآن
      </button>
    </div>
  );
};

export default PaymentForm;
