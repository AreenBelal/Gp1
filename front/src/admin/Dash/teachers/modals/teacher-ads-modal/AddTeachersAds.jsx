import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { base_url } from "../../../../../system-redux/data/apis";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import AddPicture from "../../../../../techear/dashboard/AddPicture";

const AddTeachersAds = ({
  openTeachersAdsModal,
  setOpenTeachersAdsModal,
  setUpdateTeachersAdsPage,
  updateTeachersAdsPage,
}) => {
  const [addAdData, setAddAdData] = useState({
    branch: "",
    course: "",
    eduQualification: "",
    priceOfCourse: "",
    timeFrom: "",
    timeTo: "",
    dayFrom: "",
    dayTo: "",
    discount: "",
    description: "",
    showDiscount: {
      yes: true,
      no: false,
    },
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [courseImg, setCourseImg] = useState(null);

  const dispatch = useDispatch();

  const sendAdd = async (ev) => {
    ev.preventDefault();
    const {
      branch,
      course,
      eduQualification,
      priceOfCourse,
      timeFrom,
      timeTo,
      dayFrom,
      dayTo,
      discount,
      description,
      showDiscount,
    } = addAdData;

    let formData = new FormData();

    formData.append("branch", branch);
    formData.append("course", course);
    formData.append("eduQualification", eduQualification);
    formData.append("priceOfCourse", priceOfCourse);
    formData.append("timeFrom", timeFrom);
    formData.append("timeTo", timeTo);
    formData.append("dayFrom", dayFrom);
    formData.append("dayTo", dayTo);
    formData.append("discount", discount);
    formData.append("description", description);
    formData.append("courseImg", courseImg);

    if (showDiscount.yes === true) {
      formData.append("showDiscount", true);
    } else {
      formData.append("showDiscount", false);
    }

    try {
      setLoading(true);

      // استخدام toast.promise للإشعارات
      await toast.promise(axios.post(`${base_url}/owners/ads`, formData), {
        loading: "برجاء الانتظار قليلا جاري حفظ التغييرات...",
        success: (res) => {
          setAddAdData({
            branch: "",
            course: "",
            timeFrom: "",
            timeTo: "",
            dayFrom: "",
            dayTo: "",
            eduQualification: "",
            discount: "",
            description: "",
            showDiscount: {
              yes: true,
              no: false,
            },
          });
          setCourseImg(null);
          setUpdateTeachersAdsPage(!updateTeachersAdsPage);
          setOpenTeachersAdsModal(false);

          return `تم إضافة الإعلان بنجاح!`;
        },
        error: (error) => {
          console.error(error);
          return (
            `${error.response.data.message}` ||
            "فشل حفظ الإعلان.. رجاء حاول مرة أخري"
          );
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      addAdData.branch !== "" &&
      addAdData.course !== "" &&
      addAdData.timeFrom !== "" &&
      addAdData.timeTo !== "" &&
      addAdData.dayFrom !== "" &&
      addAdData.dayTo !== "" &&
      addAdData.eduQualification !== "" &&
      addAdData.discount !== "" &&
      +addAdData.discount < +addAdData.priceOfCourse &&
      addAdData.description !== "" &&
      addAdData.description.length >= 40 &&
      courseImg !== null &&
      addAdData.priceOfCourse !== ""
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [addAdData]);

  const typographyStyle = "dark:text-darkMode-dark50";
  const inputStyle =
    "dark:text-darkMode-dark50 !border !border-gray-300 bg-darkMode-dark50 text-gray-900 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50";
  const fieldStyle = "flex flex-col gap-1";
  console.log(addAdData);

  const scientific = ["رياضيات", "اللغة الإنجليزية", "الفيزياء", "الكيمياء"];
  const literary = ["رياضيات", "اللغة الإنجليزية", "الثقافة العلمية"];
  const business = ["رياضيات", "اللغة الإنجليزية"];

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <Card
          className="flex flex-col justify-center items-center"
          color="transparent"
          shadow={false}
        >
          <Typography variant="h4" color="blue-gray">
            {loading ? "جاري إضافة الإعلان..." : "إضافة إعلان المعلم"}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            سعيد بعودتك مرة أخري ايها المدير! هل تريد إضافة إعلان
          </Typography>

          <form
            onSubmit={sendAdd}
            className="mt-5 mb-2 w-full  lg:w-96 xl:w-[28rem]"
            dir="rtl"
          >
            <div className="mb-1 flex flex-col gap-6">
              {/* branch */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                لأى فرع ينتمي هذا الإعلان؟
              </Typography>
              <Select
                placeholder="حدد الخيار الصحيح"
                className={`${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                onChange={(value) =>
                  setAddAdData({ ...addAdData, branch: value })
                }
              >
                <Option value={`علمي`}>علمي</Option>
                <Option value={`أدبي`}>أدبي</Option>
                <Option value={`تجاري`}>تجاري</Option>
              </Select>
              {/* end */}

              {/* course */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                الدورة (الإسم فقط)
              </Typography>

              <Select
                placeholder="حدد الخيار الصحيح"
                className={`${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                onChange={(value) =>
                  setAddAdData({ ...addAdData, course: value })
                }
                disabled={addAdData.branch === ""}
              >
                {addAdData.branch === "علمي"
                  ? scientific.map((item) => (
                      <Option
                        className={`${addAdData.branch !== "علمي" && "hidden"}`}
                        value={`${item}`}
                      >
                        {item}
                      </Option>
                    ))
                  : addAdData.branch === "أدبي"
                  ? literary.map((item) => (
                      <Option
                        className={`${addAdData.branch !== "أدبي" && "hidden"}`}
                        value={`${item}`}
                      >
                        {item}
                      </Option>
                    ))
                  : business.map((item) => (
                      <Option
                        className={`${
                          addAdData.branch !== "تجاري" && "hidden"
                        }`}
                        value={`${item}`}
                      >
                        {item}
                      </Option>
                    ))}
              </Select>

              {/* end */}

              {/* description */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                اكتب وصفا للإعلان (سيظهر في الإعلان وفي وصف الدورة لدي الطالب)
              </Typography>
              <div className="flex flex-col gap-2">
                <Textarea
                  size="lg"
                  placeholder="الوصف..."
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={addAdData.description}
                  onChange={(ev) =>
                    setAddAdData({ ...addAdData, description: ev.target.value })
                  }
                />
                <p
                  className={`${
                    addAdData.description.length >= 40 && "hidden"
                  } text-red-300 text-center text-[12px]`}
                >
                  الوصف يجب أن لا يقل عن 40 حرفاً
                </p>
              </div>

              {/* end */}

              {/* priceOfCourse */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                سعر الدورة الأساسي (شيكيل)
              </Typography>
              <div className="flex flex-col gap-2">
                <Input
                  size="lg"
                  placeholder={`اكتب سعر الدورة الأساسي`}
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={addAdData.priceOfCourse}
                  onChange={(ev) =>
                    setAddAdData({
                      ...addAdData,
                      priceOfCourse: ev.target.value,
                    })
                  }
                  type="number"
                />
                <p
                  className={`${
                    +addAdData.discount < +addAdData.priceOfCourse && "hidden"
                  } text-red-300 text-center text-[12px]`}
                >
                  السعر الأساسي يجب أن يكون أكبر من السعر المخفض
                </p>
              </div>
              {/* end */}

              {/* priceOfCourse */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                سعر الدورة المخفض (شيكيل)
              </Typography>
              <Input
                size="lg"
                placeholder={`اكتب سعر الدورة المخفض`}
                className={`  ${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                value={addAdData.discount}
                onChange={(ev) =>
                  setAddAdData({ ...addAdData, discount: ev.target.value })
                }
                type="number"
              />
              {/* end */}

              {/* showDiscount */}
              <Form className={fieldStyle}>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className={typographyStyle}
                >
                  هل تريد ظهور سعر الخفيض؟
                </Typography>
                <div>
                  <div className="border-b-[1px] border-gray-600 mb-1">
                    <Form.Check
                      className="flex items-center gap-10 cursor-pointer w-fit hover:bg-darkMode-dark200 rounded-lg px-3 pt-2"
                      type={"radio"}
                      id={`yes`}
                    >
                      <Form.Check.Input
                        type={"radio"}
                        isValid
                        className="mb-3 cursor-pointer"
                        checked={addAdData.showDiscount.yes}
                        onChange={() => {
                          setAddAdData((prevState) => ({
                            ...prevState,
                            showDiscount: { yes: true, no: false },
                          }));
                        }}
                      />
                      <Form.Check.Label
                        bsPrefix="dark:text-darkMode-dark50"
                        className="cursor-pointer"
                      >
                        {`نعم`}
                      </Form.Check.Label>
                    </Form.Check>
                  </div>

                  <div>
                    <Form.Check
                      className="flex items-center gap-10 cursor-pointer w-fit hover:bg-darkMode-dark200 rounded-lg px-3 pt-2 mt-0"
                      type={"radio"}
                      id={`no`}
                    >
                      <Form.Check.Input
                        type={"radio"}
                        isValid
                        className="mb-3 cursor-pointer"
                        checked={addAdData.showDiscount.no === true}
                        onChange={() => {
                          setAddAdData((prevState) => ({
                            ...prevState,
                            showDiscount: { yes: false, no: true },
                          }));
                        }}
                      />
                      <Form.Check.Label
                        bsPrefix="dark:text-darkMode-dark50"
                        className="cursor-pointer"
                      >{`لا`}</Form.Check.Label>
                    </Form.Check>
                  </div>
                </div>
              </Form>
              {/* end */}

              {/* course */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                المؤهل العلمي
              </Typography>
              <Select
                placeholder="حدد الخيار الصحيح"
                className={`${inputStyle}`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
                onChange={(value) =>
                  setAddAdData({
                    ...addAdData,
                    eduQualification: value,
                  })
                }
              >
                <Option value="ماجستير (دراسات عليا)">
                  ماجستير (دراسات عليا)
                </Option>
                <Option value="بكالريوس">بكالريوس</Option>
                <Option value="دبلوم">دبلوم</Option>
              </Select>
              {/* end */}

              {/* timeFrom */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                الوقت
              </Typography>
              <div>
                <Input
                  size="lg"
                  placeholder={`اكتب بداية الوقت`}
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={addAdData.timeFrom}
                  onChange={(ev) =>
                    setAddAdData({ ...addAdData, timeFrom: ev.target.value })
                  }
                  type="time"
                />
                <Input
                  size="lg"
                  placeholder={`اكتب نهاية الوقت`}
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={addAdData.timeTo}
                  onChange={(ev) =>
                    setAddAdData({ ...addAdData, timeTo: ev.target.value })
                  }
                  type="time"
                />
              </div>
              {/* end */}

              {/* dayFrom */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                الأيام (من : الى)
              </Typography>
              <div>
                <Select
                  placeholder="حدد الخيار الصحيح"
                  className={`${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  onChange={(value) =>
                    setAddAdData({ ...addAdData, dayFrom: value })
                  }
                >
                  <Option value={`السبت`}>السبت</Option>
                  <Option value={`الأحد`}>الأحد</Option>
                  <Option value={`الإثنين`}>الإثنين</Option>
                  <Option value={`الثلاثاء`}>الثلاثاء</Option>
                  <Option value={`الأربعاء`}>الأربعاء</Option>
                  <Option value={`الخميس`}>الخميس</Option>
                  <Option value={`الجمعة`}>الجمعة</Option>
                </Select>

                <Select
                  placeholder="حدد الخيار الصحيح"
                  className={`${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  onChange={(value) =>
                    setAddAdData({ ...addAdData, dayTo: value })
                  }
                >
                  <Option value={`السبت`}>السبت</Option>
                  <Option value={`الأحد`}>الأحد</Option>
                  <Option value={`الإثنين`}>الإثنين</Option>
                  <Option value={`الثلاثاء`}>الثلاثاء</Option>
                  <Option value={`الأربعاء`}>الأربعاء</Option>
                  <Option value={`الخميس`}>الخميس</Option>
                  <Option value={`الجمعة`}>الجمعة</Option>
                </Select>
              </div>
              {/* end */}

              <AddPicture
                image={courseImg}
                setImage={(image) => setCourseImg(image)}
              />
            </div>
            <Button
              className="mt-6"
              fullWidth
              type="submit"
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "املء البيانات أولا للحفظ!" : "احفظ الآن!"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddTeachersAds;
