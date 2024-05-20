import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { base_url } from "../../../../../system-redux/data/apis";
import toast from "react-hot-toast";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import axios from "axios";

const EditTeachersAds = ({
  openTeachersAdsModal,
  setOpenTeachersAdsModal,
  setUpdateTeachersAdsPage,
  updateTeachersAdsPage,
  teacherAdModal,
}) => {
  const [editAdData, setEditAdData] = useState({
    branch: "",
    course: "",
    timeFrom: "",
    timeTo: "",
    dayFrom: "",
    dayTo: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const sendEdit = async (ev) => {
    ev.preventDefault();
    const { branch, course, timeFrom, timeTo, dayFrom, dayTo } = editAdData;

    try {
      setLoading(true);

      // استخدام toast.promise للإشعارات
      await toast.promise(
        axios.patch(`${base_url}/owners/ads/${teacherAdModal?._id}`, {
          branch: branch && branch,
          course: course && course,
          timeFrom: timeFrom && timeFrom,
          timeTo: timeTo && timeTo,
          dayFrom: dayFrom && dayFrom,
          dayTo: dayTo && dayTo,
        }),
        {
          loading: "برجاء الانتظار قليلا جاري حفظ التغييرات...",
          success: (res) => {
            setUpdateTeachersAdsPage(!updateTeachersAdsPage);
            setOpenTeachersAdsModal(false);

            return `تم تعديل الإعلان بنجاح!`;
          },
          error: (error) => {
            console.error(error);
            return (
              `${error.response.data.message}` ||
              "فشل حفظ التغييرات.. رجاء حاول مرة أخري"
            );
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEditAdData({
      branch: teacherAdModal?.branch,
      course: teacherAdModal?.course,
      timeFrom: teacherAdModal?.timeFrom,
      timeTo: teacherAdModal?.timeTo,
      dayFrom: teacherAdModal?.dayFrom,
      dayTo: teacherAdModal?.dayTo,
    });
  }, [teacherAdModal]);

  useEffect(() => {
    if (
      (editAdData.branch !== teacherAdModal?.branch &&
        editAdData.branch !== "") ||
      (editAdData.course !== teacherAdModal?.course &&
        editAdData.course !== "") ||
      (editAdData.timeFrom !== teacherAdModal?.timeFrom &&
        editAdData.timeFrom !== "") ||
      (editAdData.timeTo !== teacherAdModal?.timeTo &&
        editAdData.timeTo !== "") ||
      (editAdData.dayFrom !== teacherAdModal?.dayFrom &&
        editAdData.dayFrom !== "") ||
      (editAdData.dayTo !== teacherAdModal?.dayTo && editAdData.dayTo !== "")
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [editAdData, teacherAdModal]);

  const typographyStyle = "dark:text-darkMode-dark50";
  const inputStyle =
    "dark:text-darkMode-dark50 !border !border-gray-300 bg-darkMode-dark50 text-gray-900 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50";

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <Card
          className="flex flex-col justify-center items-center"
          color="transparent"
          shadow={false}
        >
          <Typography variant="h4" color="blue-gray">
            {loading ? "جاري تعديل الإعلان..." : "تعديل إعلان المعلم"}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            سعيد بعودتك مرة أخري ايها المدير! هل تريد تعديل إعلانك؟
          </Typography>

          <form
            onSubmit={sendEdit}
            className="mt-5 mb-2 w-full  lg:w-96 xl:w-[28rem]"
            dir="rtl"
          >
            <div className="mb-1 flex flex-col gap-6">
              {/* branch */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                الفرع
              </Typography>
              <Input
                size="lg"
                placeholder={`${teacherAdModal?.branch}`}
                className={`  ${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={editAdData.branch}
                onChange={(ev) =>
                  setEditAdData({ ...editAdData, branch: ev.target.value })
                }
              />
              {/* end */}

              {/* course */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                الدورة
              </Typography>
              <Input
                size="lg"
                placeholder={`${teacherAdModal?.course}`}
                className={`  ${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={editAdData.course}
                onChange={(ev) =>
                  setEditAdData({ ...editAdData, course: ev.target.value })
                }
              />
              {/* end */}

              {/* timeFrom */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                الوقت
              </Typography>
              <div>
                <Input
                  size="lg"
                  placeholder={`${teacherAdModal?.timeFrom}`}
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={editAdData.timeFrom}
                  onChange={(ev) =>
                    setEditAdData({ ...editAdData, timeFrom: ev.target.value })
                  }
                />
                <Input
                  size="lg"
                  placeholder={`${teacherAdModal?.timeTo}`}
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={editAdData.timeTo}
                  onChange={(ev) =>
                    setEditAdData({ ...editAdData, timeTo: ev.target.value })
                  }
                />
              </div>
              {/* end */}

              {/* dayFrom */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                الأيام
              </Typography>
              <div>
                <Input
                  size="lg"
                  placeholder={`${teacherAdModal?.dayFrom}`}
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={editAdData.dayFrom}
                  onChange={(ev) =>
                    setEditAdData({ ...editAdData, dayFrom: ev.target.value })
                  }
                />
                <Input
                  size="lg"
                  placeholder={`${teacherAdModal?.dayTo}`}
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={editAdData.dayTo}
                  onChange={(ev) =>
                    setEditAdData({ ...editAdData, dayTo: ev.target.value })
                  }
                />
              </div>
              {/* end */}
            </div>
            <Button
              className="mt-6"
              fullWidth
              type="submit"
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "عدل بعض البيانات أولا!" : "تعديل الآن!"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditTeachersAds;
