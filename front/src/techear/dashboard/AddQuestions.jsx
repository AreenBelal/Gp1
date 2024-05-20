import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import AddPicture from "./AddPicture";
import QuestionsPagination from "./QuestionsPagination";
import { toast } from "react-hot-toast";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { base_url } from "../../system-redux/data/apis";
import { useSelector } from "react-redux";

const AddQuestions = ({
  setStartExam,
  mainDetailsOfExam,
  setStartQuestions,
  numOfQuestions,
}) => {
  const { teacherData } = useSelector((state) => state.singleTeacher);

  const [questions, setQuestions] = useState(
    Array.from({ length: numOfQuestions }, () => ({
      content: "",
      notes: "",
      image: null,
      correctOptionIndex: "",
      options: Array.from({ length: 4 }, () => ({ text: "", image: null })),
    }))
  );

  const [showImageInput, setShowImageInput] = useState(
    Array.from({ length: numOfQuestions }, () =>
      Array.from({ length: 4 }, () => false)
    )
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionContentChange = (index, content) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].content = content;
      return updatedQuestions;
    });
  };

  const handleQuestionNotesChange = (index, notes) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].notes = notes;
      return updatedQuestions;
    });
  };

  const handleQuestionImageChange = (index, image) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].image = image;
      return updatedQuestions;
    });
  };

  const handleOptionTextChange = (questionIndex, optionIndex, text) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options[optionIndex].text = text;
      return updatedQuestions;
    });
  };

  const handleOptionImageChange = (questionIndex, optionIndex, image) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].options[optionIndex].image = image;
      return updatedQuestions;
    });
  };

  const handleSelectCorrectOption = (questionIndex, correctOptionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].correctOptionIndex = correctOptionIndex;
      return updatedQuestions;
    });
  };

  const typographyStyle = "dark:text-darkMode-dark50";
  const inputStyle =
    "dark:text-darkMode-dark50 !border !border-gray-300 bg-darkMode-dark50 text-gray-900 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 dark:focus:!border-darkMode-dark50 focus:!border-t-gray-900 dark:focus:!border-t-darkMode-dark50 focus:ring-gray-900/10 dark:focus:ring-darkMode-dark50";

  // Function to check if all questions have content and correctOptionIndex
  const isQuestionsComplete = () => {
    return questions.every((question) => {
      return (
        question.content.trim() !== "" &&
        question.correctOptionIndex !== "" &&
        question.options.every((option) => option.text.trim() !== "")
      );
    });
  };

  const convertDataToFormData = (data) => {
    const formData = new FormData();

    // تكرار مفاتيح mainDetailsOfExam وإضافة كل مفتاح وقيمته إلى FormData
    Object.keys(data).forEach((key) => {
      const value = data[key];
      formData.append(key, value);
    });

    formData.append("teacherId", teacherData?._id);

    return formData;
  };

  const handleSend = async () => {
    if (isQuestionsComplete()) {
      // Send data

      // تحويل البيانات إلى FormData
      let formData = convertDataToFormData(mainDetailsOfExam);
      questions.forEach((question, index) => {
        Object.keys(question).forEach((key) => {
          if (key === "image") {
            // إذا كانت الصورة موجودة في السؤال، أضفها إلى FormData بالمفتاح المناسب
            if (question[key]) {
              formData.append(
                `questions[${index}]questionImage`,
                question[key]
              );
            }
          } else if (key === "options") {
            question[key].forEach((option, optionIndex) => {
              Object.keys(option).forEach((optionKey) => {
                if (optionKey === "image") {
                  // إذا كانت الصورة موجودة في الخيار، أضفها إلى FormData بالمفتاح المناسب
                  if (option[optionKey]) {
                    formData.append(
                      `questions[${index}][${key}][${optionIndex}]optionImage`,
                      option[optionKey]
                    );
                  }
                } else {
                  // إضافة القيم الأخرى إلى FormData بالمفتاح المناسب
                  formData.append(
                    `questions[${index}][${key}][${optionIndex}][${optionKey}]`,
                    option[optionKey]
                  );
                }
              });
            });
          } else {
            // إضافة القيم الأخرى إلى FormData بالمفتاح المناسب
            formData.append(`questions[${index}][${key}]`, question[key]);
          }
        });
      });

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      try {
        // setFormLoading(true);

        // استخدام toast.promise للإشعارات
        await toast.promise(
          axios.post(`${base_url}/teachers/exams`, formData, config),
          {
            loading: "برجاء الانتظار قليلا جاري حفظ وارسال الإمتحان...",
            success: (res) => {
              setStartExam(false);
              return `تم حفظ الإمتحان وإرساله الي الطلاب`;
            },
            error: (error) => {
              console.error(error);
              return (
                `${error.response?.data?.message}` ||
                "فشل ارسال الإمتحان.. رجاء حاول مرة أخري"
              );
            },
          }
        );
      } finally {
        // setFormLoading(false);
      }
    } else {
      // Alert if any question is incomplete
      const incompleteQuestionIndex = questions.findIndex(
        (question) =>
          question.content.trim() === "" ||
          question.correctOptionIndex === "" ||
          question.options.some((option) => option.text.trim() === "")
      );
      setCurrentQuestionIndex(incompleteQuestionIndex);
      toast.error(
        `السؤال رقم ${
          incompleteQuestionIndex + 1
        } غير مكتمل. يرجى ملء جميع الحقول.`
      );
    }
  };

  const handleGoBack = () => {
    const confirmed = window.confirm(
      "هل انت متأكد من أنك تريد الرجوع؟ ستفقد تقدمك في كتابة الأسئلة!"
    );
    console.log(confirmed);
    if (confirmed) {
      setStartQuestions(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner color="green" className="w-12 h-12" />
        </div>
      ) : (
        <>
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
              <span className="text-sm"> ارجع لتفاصيل الإمتحان الأساسية</span>
            </Button>
          </div>
          <div key={currentQuestionIndex}>
            <div className="flex flex-col gap-3 p-5">
              <div>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className={`mb-3 ${typographyStyle}`}
                >
                  عنوان السؤال {currentQuestionIndex + 1}
                </Typography>
                <Input
                  size="lg"
                  placeholder={`عنوان السؤال ${currentQuestionIndex + 1}...`}
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={questions[currentQuestionIndex].content}
                  onChange={(ev) =>
                    handleQuestionContentChange(
                      currentQuestionIndex,
                      ev.target.value
                    )
                  }
                />
              </div>
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-3">
                  هل تريد وضع ملاحظات علي هذا السؤال؟ (اختياري)
                </Typography>
                <Textarea
                  size="lg"
                  placeholder="ملاحظات..."
                  className={`  ${inputStyle}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  value={questions[currentQuestionIndex].notes}
                  onChange={(ev) =>
                    handleQuestionNotesChange(
                      currentQuestionIndex,
                      ev.target.value
                    )
                  }
                />
              </div>
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-3">
                  هل تريد إرفاق صورة علي هذا السؤال؟ (اختياري)
                </Typography>
                <AddPicture
                  image={questions[currentQuestionIndex].image}
                  setImage={(image) =>
                    handleQuestionImageChange(currentQuestionIndex, image)
                  }
                />
              </div>
              {/* options */}
              <div className="p-3 border shadow-sm">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-3 text-center"
                >
                  املء خيارات السؤال
                </Typography>
                {questions[currentQuestionIndex].options.map(
                  (option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex flex-col gap-4 border-b-[1px] border-gray-400 pb-4 mb-2"
                    >
                      <Typography variant="h6" color="blue-gray" className="">
                        الإختيار {optionIndex + 1}
                      </Typography>
                      <Input
                        size="md"
                        placeholder="خيار..."
                        className={`  ${inputStyle}`}
                        labelProps={{
                          className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px]" }}
                        value={option.text}
                        onChange={(ev) =>
                          handleOptionTextChange(
                            currentQuestionIndex,
                            optionIndex,
                            ev.target.value
                          )
                        }
                      />
                      <Button
                        className="py-1 px-4 mt-2 w-fit bg-mainColor500"
                        onClick={() => {
                          const currentImage =
                            questions[currentQuestionIndex].options[optionIndex]
                              .image;
                          if (currentImage) {
                            // إذا كانت الصورة مرفقة، قم بحذفها من الحالة الأساسية
                            handleOptionImageChange(
                              currentQuestionIndex,
                              optionIndex,
                              null
                            );
                          } else {
                            // إذا لم تكن الصورة مرفقة، قم بعرض مرفق الصورة
                            setShowImageInput((prevState) => {
                              const newState = [...prevState];
                              newState[currentQuestionIndex][optionIndex] =
                                !newState[currentQuestionIndex][optionIndex];
                              return newState;
                            });
                          }
                        }}
                      >
                        {showImageInput[currentQuestionIndex][optionIndex]
                          ? "حذف الصورة"
                          : "ارفق صورة"}
                      </Button>
                      {showImageInput[currentQuestionIndex][optionIndex] && (
                        <div className="">
                          <AddPicture
                            key={
                              option.image ? option.image.name : "default-key"
                            }
                            image={option.image}
                            setImage={(image) =>
                              handleOptionImageChange(
                                currentQuestionIndex,
                                optionIndex,
                                image
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  )
                )}

                {/* end options */}

                {/* select correct option */}
                <div className="p-3 mt-5">
                  <Typography variant="h5" color="blue-gray" className="mb-3">
                    حدد الخيار الصحيح
                  </Typography>

                  <Select
                    placeholder="حدد الخيار الصحيح"
                    className={`  ${inputStyle}`}
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    value={questions[currentQuestionIndex].correctOptionIndex} // تحديد القيمة المحفوظة في الحالة
                    onChange={(value) =>
                      handleSelectCorrectOption(currentQuestionIndex, value)
                    }
                  >
                    <Option value={0}>خيار رقم 1</Option>
                    <Option value={1}>خيار رقم 2</Option>
                    <Option value={2}>خيار رقم 3</Option>
                    <Option value={3}>خيار رقم 4</Option>
                  </Select>
                </div>
                {/* end */}
              </div>
            </div>
          </div>
        </>
      )}
      {/* Next and previous Pagination buttons for Questions */}
      <div className="flex justify-center items-center shadow-sm rounded-lg p-2">
        <QuestionsPagination
          numOfQuestions={numOfQuestions}
          setIsLoading={setIsLoading}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>

      {currentQuestionIndex === numOfQuestions - 1 && !isLoading && (
        <div className="flex justify-center">
          <Button
            fullWidth
            className={`bg-mainColor500 ${
              isQuestionsComplete() ? "" : "opacity-50"
            }`} // Add or remove opacity based on completion of questions
            onClick={handleSend}
            // disabled={!isQuestionsComplete()} // Disable the button if questions are not complete
          >
            ارسال
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddQuestions;
