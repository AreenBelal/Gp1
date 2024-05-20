import {
  Button,
  Card,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import SelectADate from "./SelectADate";
import AddQuestions from "./AddQuestions";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const ExamComonent = ({ startExam, setStartExam }) => {
  const [mainDetailsOfExam, setMainDetailsOfExam] = useState({
    titleOfExam: "",
    descriptionOfExam: "",
    startTime: "",
    timeOfExam: "",
    totalScores: "",
    scoreOfEachQuestion: "",
    numOfQuestions: "",
  });
  const [startQuestions, setStartQuestions] = useState(false);
  const [loadingExamComponent, setLoadingExamComponent] = useState(false);

  const handleStartQuestions = () => {
    setLoadingExamComponent(true);

    // تحقق من إدخال جميع البيانات قبل بدء الأسئلة
    const {
      titleOfExam,
      descriptionOfExam,
      startTime,

      timeOfExam,
      totalScores,
      numOfQuestions,
    } = mainDetailsOfExam;
    if (
      titleOfExam &&
      descriptionOfExam &&
      startTime &&
      timeOfExam &&
      totalScores &&
      numOfQuestions
    ) {
      setTimeout(() => {
        setLoadingExamComponent(false);
        setStartQuestions(true);
      }, 500); // إذا تم إدخال جميع البيانات، قم بتفعيل الزر
    } else {
      setLoadingExamComponent(false);
      alert("الرجاء إدخال جميع البيانات أولاً.");
    }
  };
  console.log(mainDetailsOfExam);
  const handleScores = (numOfQuestionsOrScores, ev) => {
    if (numOfQuestionsOrScores === "numOfQuestions") {
      setMainDetailsOfExam((prevState) => ({
        ...prevState,
        numOfQuestions: +ev.target.value,
      }));
    } else if (numOfQuestionsOrScores === "scores") {
      setMainDetailsOfExam((prevState) => ({
        ...prevState,
        totalScores: +ev.target.value, // تحديث القيمة عند التغيير
      }));
    }
  };

  useEffect(() => {
    if (mainDetailsOfExam.numOfQuestions && mainDetailsOfExam.totalScores) {
      setMainDetailsOfExam((prevState) => ({
        ...prevState,
        scoreOfEachQuestion:
          mainDetailsOfExam.totalScores / mainDetailsOfExam.numOfQuestions,
      }));
    } else {
      setMainDetailsOfExam((prevState) => ({
        ...prevState,
        scoreOfEachQuestion: "",
      }));
    }
  }, [mainDetailsOfExam.numOfQuestions, mainDetailsOfExam.totalScores]);

  const typographyStyle = "dark:text-darkMode-dark50";
  const inputStyle =
    "font-bold text-mainColor700 dark:text-darkMode-dark50 !border !border-gray-300 bg-darkMode-dark50 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50";

  const handleGoBack = () => {
    const confirmed = window.confirm(
      "هل انت متأكد من أنك تريد الرجوع؟ ستفقد تقدمك في كتابة المعلومات الرئيسية للإمتحان!"
    );
    console.log(confirmed);
    if (confirmed) {
      setStartExam(false);
    }
  };
  return (
    <Card className="flex flex-col gap-5 py-10 px-4 bg-bg-img rounded-none">
      {startExam && !startQuestions && (
        <div>
          <Button
            fullWidth
            className={`bg-red-500 w-fit flex items-center gap-1 group py-2 px-6`}
            onClick={handleGoBack}
          >
            <ArrowRightIcon
              strokeWidth={2}
              className="h-4 w-4 group-hover:scale-125 duration-200"
            />{" "}
            <span className="text-sm"> رجوع للخلف</span>
          </Button>
        </div>
      )}
      <div className="text-center flex flex-col justify-center items-center gap-3 border-b-[1px] border-gray-500 pb-3 shadow-sm">
        <p className="text-3xl font-bold text-mainColor500 rounded-md shadow-sm px-4">
          هذا الإمتحان مقدم لطلاب شعبتك فقط
        </p>
        <p>رجاء ملء البيانات لبدء إرسال الإمتحان لطلابك</p>
      </div>
      {startQuestions ? (
        <AddQuestions
          setStartExam={setStartExam}
          mainDetailsOfExam={mainDetailsOfExam}
          startQuestions={startQuestions}
          setStartQuestions={setStartQuestions}
          setLoadingExamComponent={setLoadingExamComponent}
          numOfQuestions={+mainDetailsOfExam?.numOfQuestions}
        />
      ) : (
        <div className="">
          {/* details of Exam */}
          <div className="w-full flex flex-col gap-4">
            {/* titleOfExam and descriptionOfExam */}
            <div className="flex flex-col md:flex-row justify-center gap-20">
              <div className="md:w-1/2">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className={`mb-3 ${typographyStyle}`}
                >
                  اخبر الطلاب بعنوان الإمتحان
                </Typography>
                <Input
                  size="lg"
                  placeholder="عنوان الإمتحان هو..."
                  className={`${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={mainDetailsOfExam.titleOfExam} // تعيين قيمة الحقل
                  onChange={(ev) =>
                    setMainDetailsOfExam((prevState) => ({
                      ...prevState,
                      titleOfExam: ev.target.value, // تحديث القيمة عند التغيير
                    }))
                  }
                />
              </div>
              {/*  */}
              <div className="md:w-1/2">
                <Typography variant="h5" color="blue-gray" className="mb-3">
                  ضع وصفا للإمتحان من أجل طلابك
                </Typography>
                <Textarea
                  size="lg"
                  placeholder="الإمتحان من أجل..."
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={mainDetailsOfExam.descriptionOfExam} // تعيين قيمة الحقل
                  onChange={(ev) =>
                    setMainDetailsOfExam((prevState) => ({
                      ...prevState,
                      descriptionOfExam: ev.target.value, // تحديث القيمة عند التغيير
                    }))
                  }
                />
              </div>
            </div>

            {/* numOfQuestions and totalScores */}
            <div className="flex flex-col md:flex-row justify-center gap-20">
              <div className="md:w-1/2">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className={`mb-3 ${typographyStyle}`}
                >
                  ما هو عدد الأسئلة التي تريد إضافتها؟
                </Typography>
                <Input
                  size="lg"
                  placeholder="عدد الأسئلة..."
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={mainDetailsOfExam.numOfQuestions}
                  onChange={(ev) => handleScores("numOfQuestions", ev)}
                  type="number"
                />
              </div>
              <div className="md:w-1/2">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className={`mb-3 ${typographyStyle}`}
                >
                  اضف عدد الدرجات الإجمالية للإمتحان
                </Typography>
                <Input
                  size="lg"
                  placeholder="عدد الدرجات الإجمالي هو..."
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={mainDetailsOfExam.totalScores} // تعيين قيمة الحقل
                  onChange={(ev) => handleScores("scores", ev)}
                  type="number"
                />
              </div>
            </div>
            {mainDetailsOfExam.scoreOfEachQuestion && (
              <div>
                <p className="text-center">
                  عدد الدرجات لكل سؤال سيكون{" "}
                  <span className="text-mainColor500 font-bold">
                    {Number.isInteger(mainDetailsOfExam.scoreOfEachQuestion)
                      ? mainDetailsOfExam?.scoreOfEachQuestion
                      : mainDetailsOfExam?.scoreOfEachQuestion?.toFixed(1)}
                  </span>
                </p>
              </div>
            )}

            {/* srartTime and timeOfExam */}
            <div className="flex flex-col md:flex-row justify-center gap-20 ">
              <div className="md:w-1/2">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className={`mb-3 ${typographyStyle}`}
                >
                  تاريخ ووقت بداية الإمتحان
                </Typography>
                <SelectADate
                  when={`start`}
                  mainDetailsOfExam={mainDetailsOfExam}
                  setMainDetailsOfExam={setMainDetailsOfExam}
                />
              </div>

              <div className="md:w-1/2">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className={`mb-3 ${typographyStyle}`}
                >
                  اكتب مدة الإمتحان بالدقائق
                </Typography>

                <Input
                  size="sm"
                  placeholder="علي سبيل المثال 30 (دقيقة)..."
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={mainDetailsOfExam.timeOfExam} // تعيين قيمة الحقل
                  onChange={(ev) =>
                    setMainDetailsOfExam((prevState) => ({
                      ...prevState,
                      timeOfExam: ev.target.value, // تحديث القيمة عند التغيير
                    }))
                  }
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <Button
              onClick={handleStartQuestions}
              className="normal-case text-center text-base py-2 bg-mainColor500 hover:bg-mainColor400 duration-200"
            >
              {loadingExamComponent ? (
                <div className="w-full h-full flex justify-center px-6">
                  <Spinner color="green" className="h-6 w-6 " />
                </div>
              ) : (
                "بدء وضع الأسئلة"
              )}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ExamComonent;
