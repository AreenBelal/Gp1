import { Button, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { base_url } from "./system-redux/data/apis";
import axios from "axios";
const OTPPage = ({ user }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleVerify = async (ev) => {
    ev.preventDefault();

    if (otp.length < 6) {
      return toast.error("رمز otp اقل من 6 ارقام");
    }

    try {
      setLoading(true);

      // استخدام toast.promise للإشعارات
      await toast.promise(
        axios.post(`${base_url}/students/verify`, {
          email: user?.email,
          code: otp,
        }),
        {
          loading: "برجاء الانتظار قليلا جاري التحقق...",
          success: (res) => {
            navigate("/student/login");
            return `تم التحقق من إيميلك بنجاح، تستطيع الأن تسجيل الدخول!`;
          },
          error: (error) => {
            console.error(error);
            return `${error?.response?.data?.message}` || "رمز OTP غير صحيح";
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2
          dir="rtl"
          className="text-2xl text-mainColor500 font-bold text-center mb-4"
        >
          لقد ارسلنا الرمز لك 😄
        </h2>
        <h2 dir="rtl" className="text-xl font-bold text-center mb-2">
          ابحث في بريدك الوارد أو البريد غير المرغوب فيه عن رمز OTP الذي ارسلناه
          إليك
        </h2>
        <h2 className="text-xl font-bold text-center mb-8">أدخل الرمز</h2>
        <div className="flex justify-center items-center gap-1">
          <OtpInput
            value={otp}
            onChange={(otp) => {
              // التحقق من أن القيمة المدخلة هي أرقام فقط
              setOtp(otp);
            }}
            numInputs={6}
            renderSeparator={<span className="w-4 h-10 "> </span>}
            inputStyle="h-10 border-[2px] border-gray-300 text-4xl text-center w-4 rounded text-center font-semibold focus:outline-none focus:border-indigo-500"
            shouldAutoFocus={true}
            focusStyle={{
              border: "1px solid #CFD3DB",
              outline: "none",
            }}
            inputType="tel"
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <Button
          onClick={(ev) => handleVerify(ev)}
          color="green"
          buttonType="filled"
          size="regular"
          className="w-full mt-8 text-lg py-2"
          disabled={otp.length < 6}
        >
          {loading ? (
            <div className="flex justify-center ">
              <Spinner className="h-6 w-6" />
            </div>
          ) : (
            "تحقق!"
          )}
        </Button>
      </div>
    </div>
  );
};

export default OTPPage;
