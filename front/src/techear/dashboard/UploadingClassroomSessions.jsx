import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Badge,
} from "@material-tailwind/react";
import { base_url } from "../../system-redux/data/apis";
import { useSelector } from "react-redux";

const UploadingClassroomSessions = () => {
  const [lectureData, setLectureData] = useState({
    lectureTitle: "",
    lectureDescription: "",
  });

  const [loading, setLoading] = useState(false);

  const [video, setVideo] = useState(null);
  const [addAttachments, setAddAttachments] = useState({
    attachment1: {
      id: 1,
      btnTitle: "اضف المزيد!",

      chack: false,
      lectureAttachments: null,
      attachmentDescription1: "",
    },
    attachment2: {
      id: 2,
      btnTitle: "اضف المزيد!",

      chack: false,
      lectureAttachments: null,
      attachmentDescription2: "",
    },
    attachment3: {
      id: 3,
      btnTitle: "اضف المزيد!",

      chack: false,
      lectureAttachments: null,
      attachmentDescription3: "",
    },
    attachment4: {
      id: 4,
      btnTitle: "اضف المزيد!",

      chack: false,
      lectureAttachments: null,
      attachmentDescription4: "",
    },
    attachment5: {
      id: 5,
      btnTitle: "اضف المزيد!",

      chack: false,
      lectureAttachments: null,
      attachmentDescription5: "",
    },
  });
  const { teacherData } = useSelector((state) => state.singleTeacher);

  const handleUploadingLecture = async (ev) => {
    ev.preventDefault();

    const { lectureTitle, lectureDescription } = lectureData;

    const { attachment1, attachment2, attachment3, attachment4, attachment5 } =
      addAttachments;

    let formData = new FormData();

    formData.append("teacherId", teacherData?._id);

    // lectureTitle
    if (lectureTitle === "") {
      return toast.error("تأكد من كتابة عنوان الحصة");
    } else {
      formData.append("lectureTitle", lectureTitle);
    }

    // lectureDescription
    if (lectureDescription === "") {
      return toast.error("تأكد من كتابة عنوان الحصة");
    } else {
      formData.append("lectureDescription", lectureDescription);
    }

    // lectureVideo
    if (video === null) {
      return toast.error("تأكد من رفع فيديو الحصة للطلاب");
    } else {
      formData.append("lectureVideo", video);
    }

    // Attachments
    if (addAttachments.attachment1.chack) {
      // Attachment 1
      if (addAttachments.attachment1.attachmentDescription1 === "") {
        if (!addAttachments.attachment1.lectureAttachments) {
          return toast.error("تأكد من رفع المرفق الأول الذي أضفته");
        } else {
          formData.append(
            "lectureAttachments",
            addAttachments.attachment1.lectureAttachments
          );
        }
      } else {
        if (!addAttachments.attachment1.lectureAttachments) {
          return toast.error("تأكد من رفع المرفق الأول الذي أضفته");
        } else {
          formData.append(
            "lectureAttachments",
            addAttachments.attachment1.lectureAttachments
          );
          formData.append(
            "attachmentDescription1",
            addAttachments.attachment1.attachmentDescription1
          );
        }
      }
    }

    if (addAttachments.attachment2.chack) {
      // Attachment 2
      if (addAttachments.attachment2.attachmentDescription2 === "") {
        if (!addAttachments.attachment2.lectureAttachments) {
          return toast.error("تأكد من رفع المرفق الثاني الذي أضفته");
        } else {
          formData.append(
            "lectureAttachments",
            addAttachments.attachment2.lectureAttachments
          );
        }
      } else {
        if (!addAttachments.attachment2.lectureAttachments) {
          return toast.error("تأكد من رفع المرفق الثاني الذي أضفته");
        } else {
          formData.append(
            "lectureAttachments",
            addAttachments.attachment2.lectureAttachments
          );
          formData.append(
            "attachmentDescription2",
            addAttachments.attachment2.attachmentDescription2
          );
        }
      }
    }

    if (addAttachments.attachment3.chack) {
      // Attachment 3
      if (addAttachments.attachment3.attachmentDescription3 === "") {
        if (!addAttachments.attachment3.lectureAttachments) {
          return toast.error("تأكد من رفع المرفق الثالث الذي أضفته");
        } else {
          formData.append(
            "lectureAttachments",
            addAttachments.attachment3.lectureAttachments
          );
        }
      } else {
        if (!addAttachments.attachment3.lectureAttachments) {
          return toast.error("تأكد من رفع المرفق الثالث الذي أضفته");
        } else {
          formData.append(
            "lectureAttachments",
            addAttachments.attachment3.lectureAttachments
          );
          formData.append(
            "attachmentDescription3",
            addAttachments.attachment3.attachmentDescription3
          );
        }
      }
    }

    if (addAttachments.attachment4.chack) {
      // Attachment 4
      if (addAttachments.attachment4.attachmentDescription4 === "") {
        if (!addAttachments.attachment4.lectureAttachments) {
          return toast.error("تأكد من رفع المرفق الرابع الذي أضفته");
        } else {
          formData.append(
            "lectureAttachments",
            addAttachments.attachment4.lectureAttachments
          );
        }
      } else {
        if (!addAttachments.attachment4.lectureAttachments) {
          return toast.error("تأكد من رفع المرفق الرابع الذي أضفته");
        } else {
          formData.append(
            "lectureAttachments",
            addAttachments.attachment4.lectureAttachments
          );
          formData.append(
            "attachmentDescription4",
            addAttachments.attachment4.attachmentDescription4
          );
        }
      }
    }

    if (addAttachments.attachment5.chack) {
      // Attachment 5
      if (addAttachments.attachment5.attachmentDescription5 === "") {
        if (!addAttachments.attachment5.lectureAttachments) {
          return toast.error("تأكد من رفع المرفق الخامس الذي أضفته");
        } else {
          formData.append(
            "lectureAttachments",
            addAttachments.attachment5.lectureAttachments
          );
        }
      } else {
        if (!addAttachments.attachment5.lectureAttachments) {
          return toast.error("تأكد من رفع المرفق الخامس الذي أضفته");
        } else {
          formData.append(
            "lectureAttachments",
            addAttachments.attachment5.lectureAttachments
          );
          formData.append(
            "attachmentDescription5",
            addAttachments.attachment5.attachmentDescription5
          );
        }
      }
    }

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      setLoading(true);
      // استخدام toast.promise للإشعارات //
      await toast.promise(
        axios.post(`${base_url}/teachers/lectures`, formData, config),
        {
          loading: "برجاء الانتظار قليلاً، جارٍّ رفع حصتك...",
          success: (res) => {
            setLectureData({
              lectureTitle: "",
              lectureDescription: "",
            });
            setVideo(null);
            setAddAttachments({
              attachment1: {
                id: 1,
                btnTitle: "اضف المزيد!",

                chack: false,
                lectureAttachments: null,
                attachmentDescription1: "",
              },
              attachment2: {
                id: 2,
                btnTitle: "اضف المزيد!",

                chack: false,
                lectureAttachments: null,
                attachmentDescription2: "",
              },
              attachment3: {
                id: 3,
                btnTitle: "اضف المزيد!",

                chack: false,
                lectureAttachments: null,
                attachmentDescription3: "",
              },
              attachment4: {
                id: 4,
                btnTitle: "اضف المزيد!",

                chack: false,
                lectureAttachments: null,
                attachmentDescription4: "",
              },
              attachment5: {
                id: 5,
                btnTitle: "اضف المزيد!",

                chack: false,
                lectureAttachments: null,
                attachmentDescription5: "",
              },
            });

            return "تم رفع الحصة بنجاح";
          },
          error: (error) => {
            console.error(error);
            return (
              `${error.response?.data?.message}` ||
              "فشل رفع الحصة.. الرجاء المحاولة مرة أخري"
            );
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAttachments = (attachment) => {
    setAddAttachments((prevState) => {
      let updatedAttachments = { ...prevState };

      if (attachment.id === 1) {
        updatedAttachments.attachment1.chack = !prevState.attachment1.chack;
        updatedAttachments.attachment2.chack = false;
        updatedAttachments.attachment3.chack = false;
        updatedAttachments.attachment4.chack = false;
        updatedAttachments.attachment5.chack = false;
      } else if (attachment.id === 2) {
        updatedAttachments.attachment2.chack = !prevState.attachment2.chack;
        updatedAttachments.attachment3.chack = false;
        updatedAttachments.attachment4.chack = false;
        updatedAttachments.attachment5.chack = false;
      } else if (attachment.id === 3) {
        updatedAttachments.attachment3.chack = !prevState.attachment3.chack;
        updatedAttachments.attachment4.chack = false;
        updatedAttachments.attachment5.chack = false;
      } else if (attachment.id === 4) {
        updatedAttachments.attachment4.chack = !prevState.attachment4.chack;
        updatedAttachments.attachment5.chack = false;
      } else if (attachment.id === 5) {
        updatedAttachments.attachment5.chack = !prevState.attachment5.chack;
      }

      return updatedAttachments;
    });
  };

  const styles = {
    darkText: "dark:text-darkMode50",
    darkBg: "dark:bg-darkMode-dark50",
  };
  const typographyStyle = "dark:text-darkMode-dark50";
  const inputStyle =
    "dark:text-darkMode-dark50 !border !border-gray-300 bg-darkMode-dark50 text-gray-900 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50";
  const fieldStyle = "flex flex-col gap-5";

  return (
    <div className="max-w-full w-full">
      <>
        {/* Uploading Classroom Sessions */}
        <div
          dir="rtl"
          className="flex justify-center items-center min-h-screen py-10"
        >
          <Card
            className={`flex flex-col justify-center items-center shadow-md dark:shadow-darkMode-dark50 p-5`}
            color="transparent"
            shadow={false}
          >
            <Typography
              className={`${typographyStyle}`}
              variant="h4"
              color="blue-gray"
            >
              {loading ? "جاري رفع الحصة..." : "رفع الحصص الصيفية"}
            </Typography>
            <Typography
              color="gray"
              className={`mt-1 font-normal ${typographyStyle}`}
            >
              سعيد بلقائك! هنا يمكنك رفع الحصص الصيفية للطلاب المسجلين بدورتك
              التعليمية.
            </Typography>
            <form
              onSubmit={handleUploadingLecture}
              className="mt-8  w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
                {/* lectureTitle */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className={`-mb-3 ${typographyStyle}`}
                >
                  عنوان الحصة
                </Typography>
                <Input
                  size="lg"
                  placeholder="اكتب عنوان الحصة"
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={lectureData.lectureTitle}
                  onChange={(ev) =>
                    setLectureData({
                      ...lectureData,
                      lectureTitle: ev.target.value,
                    })
                  }
                />
                {/* end title */}

                {/* lectureDescription */}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  الوصف
                </Typography>
                <Textarea
                  size="lg"
                  placeholder="اكتب وصف الحصة"
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={lectureData.lectureDescription}
                  onChange={(ev) =>
                    setLectureData({
                      ...lectureData,
                      lectureDescription: ev.target.value,
                    })
                  }
                />
              </div>

              {/* Upload video file */}
              <div className="flex flex-col justify-center gap-y-2  group ">
                <span className="pl-1 text-blue-gray-900 font-bold w-full">
                  ارفع فيديو الحصة
                </span>
                {video ? (
                  <Badge
                    withBorder
                    className="cursor-pointer transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20"
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
                    onClick={() => setVideo(null)}
                  >
                    <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                      {video ? (
                        <span>{video.name}</span>
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

                          <span>رفع</span>
                        </>
                      )}

                      <input
                        type="file"
                        onChange={(ev) => {
                          setVideo(ev.target.files[0]);
                        }}
                        className="hidden"
                      />
                    </label>
                  </Badge>
                ) : (
                  <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                    {video ? (
                      <span>{video.name}</span>
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

                        <span>رفع</span>
                      </>
                    )}

                    <input
                      type="file"
                      onChange={(ev) => {
                        setVideo(ev.target.files[0]);
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {/* end Upload video file */}

              {/* Attachments */}
              {/* 1 */}
              <div className="flex flex-col gap-3">
                <Button
                  className={`mt-6 w-fit text-darkMode-dark50  dark:text-darkMode-dark950 dark:hover:bg-darkMode-dark700 dark:hover:text-darkMode-dark50 duration-200 bg-mainColor500 dark:bg-darkMode-dark50 p-2`}
                  onClick={() => handleAttachments(addAttachments.attachment1)}
                >
                  {addAttachments.attachment1.chack
                    ? addAttachments.attachment2.chack
                      ? "حذف المرفق والمرفقات التي فوقه!"
                      : "حذف المرفق!"
                    : addAttachments.attachment1.btnTitle}
                </Button>
                {/* Upload attachment 1 */}
                {addAttachments.attachment1.chack && (
                  <div className="flex flex-col justify-center gap-y-2  group ">
                    <span className="pl-1 text-blue-gray-900 font-bold w-full">
                      ارفع الملف الذي تريد إضافته للمحاضرة (المرفق الأول)
                    </span>
                    {addAttachments.attachment1.lectureAttachments ? (
                      <Badge
                        withBorder
                        className="cursor-pointer transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20"
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
                        onClick={() =>
                          setAddAttachments((prevState) => ({
                            ...addAttachments,
                            attachment1: {
                              ...addAttachments.attachment1,
                              lectureAttachments: null,
                            },
                          }))
                        }
                      >
                        <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                          {addAttachments.attachment1.lectureAttachments ? (
                            <span>
                              {
                                addAttachments.attachment1.lectureAttachments
                                  .name
                              }
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

                              <span>رفع</span>
                            </>
                          )}

                          <input
                            type="file"
                            onChange={(ev) =>
                              setAddAttachments((prevState) => ({
                                ...addAttachments,
                                attachment1: {
                                  ...addAttachments.attachment1,
                                  lectureAttachments: ev.target.files[0],
                                },
                              }))
                            }
                            className="hidden"
                          />
                        </label>
                      </Badge>
                    ) : (
                      <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                        {addAttachments.attachment1.lectureAttachments ? (
                          <span>
                            {addAttachments.attachment1.lectureAttachments.name}
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

                            <span>رفع</span>
                          </>
                        )}

                        <input
                          type="file"
                          onChange={(ev) =>
                            setAddAttachments((prevState) => ({
                              ...addAttachments,
                              attachment1: {
                                ...addAttachments.attachment1,
                                lectureAttachments: ev.target.files[0],
                              },
                            }))
                          }
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}
                {/* end Upload attachment 1 */}
                {addAttachments.attachment1.chack && (
                  <div>
                    {/* AttachmentDescription1 */}
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      اكتب وصفا للمرفق (اختياري)
                    </Typography>
                    <Textarea
                      size="lg"
                      placeholder="الوصف"
                      className={`  ${inputStyle}`}
                      labelProps={{
                        className: "hidden",
                      }}
                      containerProps={{ className: "min-w-[100px]" }}
                      value={addAttachments.attachment1.attachmentDescription1}
                      onChange={(ev) =>
                        setAddAttachments((prevState) => ({
                          ...addAttachments,
                          attachment1: {
                            ...addAttachments.attachment1,
                            attachmentDescription1: ev.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                )}
              </div>

              {/* 2 */}
              <div className="flex flex-col gap-3">
                {addAttachments.attachment1.chack && (
                  <Button
                    className={`mt-6 w-fit text-darkMode-dark50  dark:text-darkMode-dark950 dark:hover:bg-darkMode-dark700 dark:hover:text-darkMode-dark50 duration-200 bg-mainColor500 dark:bg-darkMode-dark50 p-2`}
                    onClick={() =>
                      handleAttachments(addAttachments.attachment2)
                    }
                  >
                    {addAttachments.attachment2.chack
                      ? addAttachments.attachment3.chack
                        ? "حذف المرفق والمرفقات التي فوقه!"
                        : "حذف المرفق!"
                      : addAttachments.attachment2.btnTitle}
                  </Button>
                )}

                {/* Upload attachment 2 */}
                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack && (
                    <div className="flex flex-col justify-center gap-y-2  group ">
                      <span className="pl-1 text-blue-gray-900 font-bold w-full">
                        ارفع الملف الذي تريد إضافته للمحاضرة (المرفق الثاني)
                      </span>
                      {addAttachments.attachment2.lectureAttachments ? (
                        <Badge
                          withBorder
                          className="cursor-pointer transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20"
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
                          onClick={() =>
                            setAddAttachments((prevState) => ({
                              ...addAttachments,
                              attachment2: {
                                ...addAttachments.attachment2,
                                lectureAttachments: null,
                              },
                            }))
                          }
                        >
                          <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                            {addAttachments.attachment2.lectureAttachments ? (
                              <span>
                                {
                                  addAttachments.attachment2.lectureAttachments
                                    .name
                                }
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

                                <span>رفع</span>
                              </>
                            )}

                            <input
                              type="file"
                              onChange={(ev) =>
                                setAddAttachments((prevState) => ({
                                  ...addAttachments,
                                  attachment2: {
                                    ...addAttachments.attachment2,
                                    lectureAttachments: ev.target.files[0],
                                  },
                                }))
                              }
                              className="hidden"
                            />
                          </label>
                        </Badge>
                      ) : (
                        <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                          {addAttachments.attachment2.lectureAttachments ? (
                            <span>
                              {
                                addAttachments.attachment2.lectureAttachments
                                  .name
                              }
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

                              <span>رفع</span>
                            </>
                          )}

                          <input
                            type="file"
                            onChange={(ev) =>
                              setAddAttachments((prevState) => ({
                                ...addAttachments,
                                attachment2: {
                                  ...addAttachments.attachment2,
                                  lectureAttachments: ev.target.files[0],
                                },
                              }))
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  )}
                {/* end Upload attachment 2 */}

                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack && (
                    <div>
                      {/* AttachmentDescription1 */}
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-3"
                      >
                        اكتب وصفا للمرفق (اختياري)
                      </Typography>
                      <Textarea
                        size="lg"
                        placeholder="الوصف"
                        className={`  ${inputStyle}`}
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px]" }}
                        value={
                          addAttachments.attachment2.attachmentDescription2
                        }
                        onChange={(ev) =>
                          setAddAttachments((prevState) => ({
                            ...addAttachments,
                            attachment2: {
                              ...addAttachments.attachment2,
                              attachmentDescription2: ev.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  )}
              </div>

              {/* 3 */}
              <div className="flex flex-col gap-3">
                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack && (
                    <Button
                      className={`mt-6 w-fit text-darkMode-dark50  dark:text-darkMode-dark950 dark:hover:bg-darkMode-dark700 dark:hover:text-darkMode-dark50 duration-200 bg-mainColor500 dark:bg-darkMode-dark50 p-2`}
                      onClick={() =>
                        handleAttachments(addAttachments.attachment3)
                      }
                    >
                      {addAttachments.attachment3.chack
                        ? addAttachments.attachment4.chack
                          ? "حذف المرفق والمرفقات التي فوقه!"
                          : "حذف المرفق!"
                        : addAttachments.attachment3.btnTitle}
                    </Button>
                  )}

                {/* Upload attachment 3 */}
                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack &&
                  addAttachments.attachment3.chack && (
                    <div className="flex flex-col justify-center gap-y-2  group ">
                      <span className="pl-1 text-blue-gray-900 font-bold w-full">
                        ارفع الملف الذي تريد إضافته للمحاضرة (المرفق الثالث)
                      </span>
                      {addAttachments.attachment3.lectureAttachments ? (
                        <Badge
                          withBorder
                          className="cursor-pointer transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20"
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
                          onClick={() =>
                            setAddAttachments((prevState) => ({
                              ...addAttachments,
                              attachment3: {
                                ...addAttachments.attachment3,
                                lectureAttachments: null,
                              },
                            }))
                          }
                        >
                          <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                            {addAttachments.attachment3.lectureAttachments ? (
                              <span>
                                {
                                  addAttachments.attachment3.lectureAttachments
                                    .name
                                }
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

                                <span>رفع</span>
                              </>
                            )}

                            <input
                              type="file"
                              onChange={(ev) =>
                                setAddAttachments((prevState) => ({
                                  ...addAttachments,
                                  attachment3: {
                                    ...addAttachments.attachment3,
                                    lectureAttachments: ev.target.files[0],
                                  },
                                }))
                              }
                              className="hidden"
                            />
                          </label>
                        </Badge>
                      ) : (
                        <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                          {addAttachments.attachment3.lectureAttachments ? (
                            <span>
                              {
                                addAttachments.attachment3.lectureAttachments
                                  .name
                              }
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

                              <span>رفع</span>
                            </>
                          )}

                          <input
                            type="file"
                            onChange={(ev) =>
                              setAddAttachments((prevState) => ({
                                ...addAttachments,
                                attachment3: {
                                  ...addAttachments.attachment3,
                                  lectureAttachments: ev.target.files[0],
                                },
                              }))
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  )}
                {/* end Upload attachment 3 */}

                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack &&
                  addAttachments.attachment3.chack && (
                    <div>
                      {/* AttachmentDescription1 */}
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-3"
                      >
                        اكتب وصفا للمرفق (اختياري)
                      </Typography>
                      <Textarea
                        size="lg"
                        placeholder="الوصف"
                        className={`  ${inputStyle}`}
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px]" }}
                        value={
                          addAttachments.attachment3.attachmentDescription3
                        }
                        onChange={(ev) =>
                          setAddAttachments((prevState) => ({
                            ...addAttachments,
                            attachment3: {
                              ...addAttachments.attachment3,
                              attachmentDescription3: ev.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  )}
              </div>

              {/* 4 */}
              <div className="flex flex-col gap-3">
                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack &&
                  addAttachments.attachment3.chack && (
                    <Button
                      className={`mt-6 w-fit text-darkMode-dark50  dark:text-darkMode-dark950 dark:hover:bg-darkMode-dark700 dark:hover:text-darkMode-dark50 duration-200 bg-mainColor500 dark:bg-darkMode-dark50 p-2`}
                      onClick={() =>
                        handleAttachments(addAttachments.attachment4)
                      }
                    >
                      {addAttachments.attachment4.chack
                        ? addAttachments.attachment5.chack
                          ? "حذف المرفق والمرفقات التي فوقه!"
                          : "حذف المرفق!"
                        : addAttachments.attachment4.btnTitle}
                    </Button>
                  )}

                {/* Upload attachment 4 */}
                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack &&
                  addAttachments.attachment3.chack &&
                  addAttachments.attachment4.chack && (
                    <div className="flex flex-col justify-center gap-y-2  group ">
                      <span className="pl-1 text-blue-gray-900 font-bold w-full">
                        ارفع الملف الذي تريد إضافته للمحاضرة (المرفق الرابع)
                      </span>
                      {addAttachments.attachment4.lectureAttachments ? (
                        <Badge
                          withBorder
                          className="cursor-pointer transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20"
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
                          onClick={() =>
                            setAddAttachments((prevState) => ({
                              ...addAttachments,
                              attachment4: {
                                ...addAttachments.attachment4,
                                lectureAttachments: null,
                              },
                            }))
                          }
                        >
                          <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                            {addAttachments.attachment4.lectureAttachments ? (
                              <span>
                                {
                                  addAttachments.attachment4.lectureAttachments
                                    .name
                                }
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

                                <span>رفع</span>
                              </>
                            )}

                            <input
                              type="file"
                              onChange={(ev) =>
                                setAddAttachments((prevState) => ({
                                  ...addAttachments,
                                  attachment4: {
                                    ...addAttachments.attachment4,
                                    lectureAttachments: ev.target.files[0],
                                  },
                                }))
                              }
                              className="hidden"
                            />
                          </label>
                        </Badge>
                      ) : (
                        <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                          {addAttachments.attachment4.lectureAttachments ? (
                            <span>
                              {
                                addAttachments.attachment4.lectureAttachments
                                  .name
                              }
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

                              <span>رفع</span>
                            </>
                          )}

                          <input
                            type="file"
                            onChange={(ev) =>
                              setAddAttachments((prevState) => ({
                                ...addAttachments,
                                attachment4: {
                                  ...addAttachments.attachment4,
                                  lectureAttachments: ev.target.files[0],
                                },
                              }))
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  )}
                {/* end Upload attachment 4 */}

                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack &&
                  addAttachments.attachment3.chack &&
                  addAttachments.attachment4.chack && (
                    <div>
                      {/* AttachmentDescription1 */}
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-3"
                      >
                        اكتب وصفا للمرفق (اختياري)
                      </Typography>
                      <Textarea
                        size="lg"
                        placeholder="الوصف"
                        className={`  ${inputStyle}`}
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px]" }}
                        value={
                          addAttachments.attachment4.attachmentDescription4
                        }
                        onChange={(ev) =>
                          setAddAttachments((prevState) => ({
                            ...addAttachments,
                            attachment4: {
                              ...addAttachments.attachment4,
                              attachmentDescription4: ev.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  )}
              </div>

              {/* 4 */}
              <div className="flex flex-col gap-3">
                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack &&
                  addAttachments.attachment3.chack &&
                  addAttachments.attachment4.chack && (
                    <Button
                      className={`mt-6 w-fit text-darkMode-dark50  dark:text-darkMode-dark950 dark:hover:bg-darkMode-dark700 dark:hover:text-darkMode-dark50 duration-200 bg-mainColor500 dark:bg-darkMode-dark50 p-2`}
                      onClick={() =>
                        handleAttachments(addAttachments.attachment5)
                      }
                    >
                      {addAttachments.attachment5.chack
                        ? "حذف المرفق!"
                        : addAttachments.attachment5.btnTitle}
                    </Button>
                  )}

                {/* Upload attachment 4 */}
                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack &&
                  addAttachments.attachment3.chack &&
                  addAttachments.attachment4.chack &&
                  addAttachments.attachment5.chack && (
                    <div className="flex flex-col justify-center gap-y-2  group ">
                      <span className="pl-1 text-blue-gray-900 font-bold w-full">
                        ارفع الملف الذي تريد إضافته للمحاضرة (المرفق الخامس)
                      </span>
                      {addAttachments.attachment5.lectureAttachments ? (
                        <Badge
                          withBorder
                          className="cursor-pointer transition-all duration-200 bg-gradient-to-tr from-orange-500 to-orange-900 hover:from-orange-800 hover:to-orange-900 border-2 border-white shadow-lg shadow-black/20"
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
                          onClick={() =>
                            setAddAttachments((prevState) => ({
                              ...addAttachments,
                              attachment5: {
                                ...addAttachments.attachment5,
                                lectureAttachments: null,
                              },
                            }))
                          }
                        >
                          <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                            {addAttachments.attachment5.lectureAttachments ? (
                              <span>
                                {
                                  addAttachments.attachment5.lectureAttachments
                                    .name
                                }
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

                                <span>رفع</span>
                              </>
                            )}

                            <input
                              type="file"
                              onChange={(ev) =>
                                setAddAttachments((prevState) => ({
                                  ...addAttachments,
                                  attachment5: {
                                    ...addAttachments.attachment5,
                                    lectureAttachments: ev.target.files[0],
                                  },
                                }))
                              }
                              className="hidden"
                            />
                          </label>
                        </Badge>
                      ) : (
                        <label className="cursor-pointer overflow-hidden text-center w-full h-10 text-sm bg-darkbg-whiteColor border-[3px] border-gray-300 text-gray-600 rounded-full gap-1 flex items-center justify-center hover:bg-gray-300 hover:text-blue-gray-900 transition-all duration-200">
                          {addAttachments.attachment5.lectureAttachments ? (
                            <span>
                              {
                                addAttachments.attachment5.lectureAttachments
                                  .name
                              }
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

                              <span>رفع</span>
                            </>
                          )}

                          <input
                            type="file"
                            onChange={(ev) =>
                              setAddAttachments((prevState) => ({
                                ...addAttachments,
                                attachment5: {
                                  ...addAttachments.attachment5,
                                  lectureAttachments: ev.target.files[0],
                                },
                              }))
                            }
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  )}
                {/* end Upload attachment 4 */}

                {addAttachments.attachment1.chack &&
                  addAttachments.attachment2.chack &&
                  addAttachments.attachment3.chack &&
                  addAttachments.attachment4.chack &&
                  addAttachments.attachment5.chack && (
                    <div>
                      {/* AttachmentDescription1 */}
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-3"
                      >
                        اكتب وصفا للمرفق (اختياري)
                      </Typography>
                      <Textarea
                        size="lg"
                        placeholder="الوصف"
                        className={`  ${inputStyle}`}
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px]" }}
                        value={
                          addAttachments.attachment5.attachmentDescription5
                        }
                        onChange={(ev) =>
                          setAddAttachments((prevState) => ({
                            ...addAttachments,
                            attachment5: {
                              ...addAttachments.attachment5,
                              attachmentDescription5: ev.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  )}
              </div>

              <Button
                className={`mt-6 text-darkMode-dark50  dark:text-darkMode-dark950 dark:hover:bg-darkMode-dark700 dark:hover:text-darkMode-dark50 duration-200 bg-mainColor500 dark:bg-darkMode-dark50`}
                fullWidth
                type="submit"
              >
                ارفع المحاضرة الآن!
              </Button>
            </form>
          </Card>
        </div>
      </>
    </div>
  );
};

export default UploadingClassroomSessions;
