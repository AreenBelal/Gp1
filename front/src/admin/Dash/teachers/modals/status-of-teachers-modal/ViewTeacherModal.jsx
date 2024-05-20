import React from "react";
import {
  Card,
  Input,
  Typography,
  Textarea,
  Button,
} from "@material-tailwind/react";
import FormatDateArabic from "../../../../../helpers/FormatDateArabic";
import { FaFilePdf } from "react-icons/fa"; // استيراد الأيقونة من مكتبة React Icons
import Swal from "sweetalert2";
import { base_url } from "../../../../../system-redux/data/apis";
import axios from "axios";
import toast from "react-hot-toast";

const ViewTeacherModal = ({
  teacherModal,
  setUpdatePage,
  updatePage,
  setOpen,
  open,
}) => {
  const openPDF = () => {
    // تعيين الرابط لملف الـ PDF هنا
    const pdfURL = teacherModal?.cv;
    window.open(pdfURL, "_blank");
  };

  const accepted = () => {
    Swal.fire({
      title: "هل انت متأكد من أنك تريد قبول هذا المعلم؟",
      text: "لن تكون قادرا علي استرجاع هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، اقبله!",
      cancelButtonText: "إغـلاق",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const option = {
          method: "POST",
          url: `${base_url}/teachers/change-status`,
          // headers: { Authorization: `Bearer ${userData?.token}` },
          data: { email: teacherModal?.email, teacherStatus: "accepted" },
        };

        const response = await axios(option);
        console.log("response:", response);

        if (response.data.status === "success") {
          setUpdatePage(!updatePage);
          setOpen(false);
          Swal.fire({
            title: "تم قبول المعلم",
            text: "سيستطيع الآن المعلم تسجيل الدخول ولكن بعد ضبط كلمة السر الخاصة به",
            icon: "success",
          });
          toast.success("تم قبول المعلم!");
        }
      }
    });
  };
  const refused = () => {
    console.log("yes");
    Swal.fire({
      title: "هل انت متأكد من أنك تريد رفض هذا المعلم؟",
      text: "لن تكون قادرا علي استرجاع هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، ارفضه!",
      cancelButtonText: "إغـلاق",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const option = {
          method: "POST",
          url: `${base_url}/teachers/change-status`,
          // headers: { Authorization: `Bearer ${userData?.token}` },
          data: { email: teacherModal?.email, teacherStatus: "refused" },
        };

        const response = await axios(option);
        console.log("response:", response);

        if (response.data.status === "success") {
          setUpdatePage(!updatePage);
          setOpen(false);
          Swal.fire({
            title: "تم رفض المعلم",
            text: "تم تعيين حالة المعلم الي مرفوض!",
            icon: "success",
          });
          toast.success("تم رفض المعلم!");
        }
      }
    });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Card
        dir="rtl"
        className="flex flex-col justify-center items-center"
        color="transparent"
        shadow={false}
      >
        <Typography variant="h4" color="blue-gray">
          تفاصيل
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center ">
          <span>سعيد برؤيتك مجدداّ ايها المدير. هذه تفاصيل حول</span>{" "}
          <span>{teacherModal?.fullName}</span>
        </Typography>

        <div className="mt-5">
          <img
            src={teacherModal?.avatar}
            alt="product image"
            className="w-full h-40 md:w-64 md:h-40 object-contain hover:scale-105 duration-300"
          />
        </div>

        <form className="mt-5 mb-2 w-full  lg:w-96 xl:w-[28rem]">
          <div className="mb-1 flex flex-col gap-6">
            {/* Full Name */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              الإسم
            </Typography>
            <Input
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={teacherModal?.fullName}
              disabled
            />

            {/* idNum */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              الهوية
            </Typography>
            <Input
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={teacherModal?.idNum}
              disabled
            />

            {/* email */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              البريد الالكتروني
            </Typography>
            <Textarea
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={teacherModal?.email}
              disabled
            />

            {/* phone */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              رقم الجوال
            </Typography>
            <Input
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={teacherModal?.phone}
              disabled
            />

            {/* branch */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              الفرع
            </Typography>
            <Input
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={teacherModal?.branch}
              disabled
            />

            {/* course */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              الدورة
            </Typography>
            <Input
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={teacherModal?.course}
              disabled
            />

            {/* status */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              حالة المعلم
            </Typography>
            <Input
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={
                teacherModal?.status === "accepted"
                  ? "مقبول"
                  : teacherModal?.status === "pending"
                  ? "في الإنتظار"
                  : "مرفوض"
              }
              disabled
            />

            {/* gender */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              الجنس
            </Typography>
            <Input
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={teacherModal?.gender === "male" ? "مذكر" : "مؤنث"}
              disabled
            />

            {/* dateOfBirth */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              تاريخ الميلاد
            </Typography>
            <Input
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={teacherModal?.dateOfBirth}
              disabled
            />

            <div
              className="bg-red-100 duration-200 hover:bg-red-200 rounded-md p-2 flex items-center justify-center cursor-pointer"
              onClick={openPDF}
            >
              <p className="ml-2 text-gray-900">CV المعلم </p>
              <FaFilePdf className="w-8 h-8 text-red-500" />
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <p>تم تقديم الطلب بتاريخ</p>
              <p>
                <FormatDateArabic createdAt={teacherModal?.createdAt} />
              </p>
            </div>

            {/* action btns */}
            {teacherModal?.status === "accepted" ||
            teacherModal?.status === "refused" ? (
              <div className="flex justify-center font-bold">
                <p
                  className={`${
                    teacherModal?.status === "accepted"
                      ? "text-mainColor500"
                      : "text-red-500"
                  }`}
                >
                  {teacherModal?.status === "accepted"
                    ? "المعلم مقبول بالفعل"
                    : "المعلم مرفوض بالفعل"}
                </p>
              </div>
            ) : (
              <div className="flex justify-start items-center gap-4">
                <Button
                  onClick={() => accepted()}
                  color="green"
                  className="py-2 px-6"
                >
                  قبول
                </Button>
                <Button
                  color="red"
                  onClick={() => refused()}
                  className="py-2 px-6"
                >
                  رفض
                </Button>
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ViewTeacherModal;
