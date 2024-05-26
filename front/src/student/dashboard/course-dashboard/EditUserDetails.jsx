import React, { useEffect, useRef, useState } from "react";
import Avatar from "../../../components/Avatar";
import Divider from "../../../components/Divider";
import axios from "axios";
import { base_url } from "../../../system-redux/data/apis";
import { getSingleStudent } from "../../../system-redux/users/students/singleStudentSlice";
import { useDispatch } from "react-redux";

const EditUserDetails = ({ onClose, student }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    fullName: student?.fullName,
    avatar: student?.avatar,
  });

  const uploadPhotoRef = useRef(null);

  useEffect(() => {
    setData((preve) => {
      return {
        ...preve,
        ...student,
      };
    });
  }, [student]);

  const handleOnChange = (ev) => {
    const { name, value } = ev.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleOpenUploadPhoto = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    uploadPhotoRef.current.click();
  };

  const handleUploadPhoto = async (ev) => {
    ev.preventDefault();
    // const file = ev.target.files[0]
    // const uploadPhoto = await uploadFile(file)
    // setData((preve)=>{
    //   return{
    //     ...preve,
    //     avatar : uploadPhoto?.url
    //   }
    // })
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    // try {
    //   const option = {
    //     url: `${base_url}/students/${student._id}`,
    //     data,
    //     method: "PATCH",
    //   };
    //   const res = await axios(option);
    //   // check if updated or not first
    //   dispatch(getSingleStudent(student._id));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold text-xl text-center mb-5">
          {" "}
          تفاصيل الملف الشخصي
        </h2>
        <p className="text-sm">تعديل تفاصيل الملف الشخصي </p>
        <form onSubmit={handleSubmit} className="grid gap-3 mt-3">
          <div className="flex flex-col">
            <label htmlFor="fullName">الإسم الكامل:</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={data?.fullName}
              onChange={handleOnChange}
              className="w-full py-1 px-2 focus:outline-deep-purple-600 border-[0.5px]"
            />
          </div>
          <div>
            <div>الصورة الشخصية:</div>
            <div className="my-1 flex items-center gap-4">
              <Avatar
                userId={student?._id}
                width={40}
                heigth={40}
                imageUrl={data?.avatar}
                name={data?.fullName}
              />
              <label htmlFor="avatar">
                <button
                  className="font-semibold"
                  onClick={handleOpenUploadPhoto}
                >
                  تغيير الصورة
                </button>
                <input
                  type="file"
                  className="hidden"
                  id="avatar"
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>
          <Divider />
          <div className="flex items-center gap-2 w-fit mr-auto">
            <button
              onClick={() => onClose()}
              className="border-mainColor500 border text-mainborder-mainColor500 px-4 py-1 rounded hover:bg-mainColor700 hover:text-white duration-200"
            >
              الغاء
            </button>
            <button
              onclick={handleSubmit}
              className="border-mainColor500 bg-mainColor500 text-darkMode-dark50 border px-4 py-1 rounded hover:bg-mainColor700 duration-200"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
