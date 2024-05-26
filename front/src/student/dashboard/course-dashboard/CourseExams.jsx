import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { base_url } from "../../../system-redux/data/apis";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getSingleStudent } from "../../../system-redux/users/students/singleStudentSlice";
import { jwtDecode } from "jwt-decode";

const CourseExams = ({ course }) => {
  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const { cn, tc, ro } = useSelector((state) => state.ma);

  console.log("studentData:", studentData);
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [examStatus, setExamStatus] = useState("pending");
  const [examUpdate, setExamUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(`${base_url}/teachers/exams/${course?.courseId || localStorage.idT}`)
      .then((response) => {
        setExams(response.data.data.exams.docs);
      })
      .catch((error) => {
        console.error("Error fetching exam data:", error);
      });
  }, [course, examUpdate]);

  const dispatch = useDispatch();

  const handleStartExam = (exam) => {
    const now = new Date();
    const examStartTime = new Date(exam.startTime);
    const examEndTime = new Date(
      examStartTime.getTime() + exam.timeOfExam * 60000
    );

    const studentExitStatus = exam.studentExitStatus.find(
      (exitStatus) => exitStatus.studentId === course.studentId
    ); // Replace "currentStudentId" with actual student ID

    if (studentExitStatus && studentExitStatus.status === "left") {
      toast.error("لقد خرجت من الامتحان مسبقًا.");
    } else if (now >= examStartTime && now <= examEndTime) {
      setCurrentExam(exam);
      setStartTime(now);
      setTimeLeft((examEndTime - now) / 1000);
      // Update exam status to indicate the exam has started
      setExamStatus("started");
    } else if (now < examStartTime) {
      toast.error("لا يمكنك بدء الإمتحان قبل الوقت المحدد لبداية الإختبار.");
    } else if (now > examEndTime) {
      toast.error("لقد انتهى الوقت المحدد للإمتحان، لا يمكنك الدخول بعد الإن.");
    } else {
      toast.error("You can only start the exam within the scheduled time.");
    }
  };

  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = async () => {
    try {
      const finalScore = calculateScore();
      setScore(finalScore);
      setShowSummary(true);

      const endTime = new Date();
      const examDuration = Math.floor((endTime - startTime) / 1000 / 60);

      // تحويل معرفات الأسئلة إلى أرقام الأسئلة
      const answersWithQuestionNumbers = {};
      Object.entries(answers).forEach(([questionId, optionIndex]) => {
        const questionIndex = currentExam.questions.findIndex(
          (question) => question._id === questionId
        );
        answersWithQuestionNumbers[questionIndex + 1] = optionIndex; // البدء من 1 بدلاً من 0
      });

      const examData = {
        informationsOfExams: {
          examId: currentExam._id,
          answers: answersWithQuestionNumbers,
          totalScores: finalScore,
          duration: examDuration,
          attended: true,
          attendanceTime: startTime,
        },
      };

      // إعداد البيانات لتحديث studentExitStatus في الامتحان
      const studentExitStatusUpdate = {
        studentExitStatus: {
          studentId: course.studentId,
          status: "left",
        },
      };

      // إرسال البيانات إلى السيرفر
      const examResponse = await axios.patch(
        `${base_url}/students/${course?.studentId}`,
        examData
      );
      console.log("Exam data submitted successfully:", examResponse);

      const exitStatusResponse = await axios.patch(
        `${base_url}/teachers/exams/${currentExam._id}`,
        studentExitStatusUpdate
      );
      console.log(
        "Student exit status updated successfully:",
        exitStatusResponse
      );

      setExamUpdate(!examUpdate); // تحديث حالة الامتحان بعد نجاح التحديث
      if (tc) {
        const { role, id } = jwtDecode(tc);
        if (role === "STUDENT") {
          dispatch(getSingleStudent(id));
        }
      }
    } catch (error) {
      console.error("Error submitting exam data:", error);
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    currentExam.questions.forEach((question) => {
      if (answers[question._id] === question.correctOptionIndex) {
        totalScore += parseInt(currentExam.scoreOfEachQuestion);
      }
    });
    return totalScore;
  };

  const calculateTotalPossibleScore = () => {
    return (
      currentExam.questions.length * parseInt(currentExam.scoreOfEachQuestion)
    );
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleExitSummary = () => {
    setExamStatus("left");
    setCurrentExam(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(0);
    setStartTime(null);
    setDuration(0);
    setTimeLeft(null);
    setShowSummary(false);
  };

  if (!currentExam) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8">
          الإمتحانات المتاحة
        </h1>
        <ul className="space-y-4">
          {exams.map((exam) => {
            const examStartTime = new Date(exam.startTime);
            const examEndTime = new Date(
              examStartTime.getTime() + exam.timeOfExam * 60000
            );
            const now = new Date();
            const studentExamInfo = studentData.informationsOfExams.find(
              (info) => info.examId === exam._id
            );
            const examCreatedTime = new Date(exam.createdAt);
            const formattedStartTime = examStartTime.toLocaleString("ar-EG", {
              dateStyle: "short",
              timeStyle: "short",
            });
            const formattedEndTime = examEndTime.toLocaleString("ar-EG", {
              dateStyle: "short",
              timeStyle: "short",
            });
            const formattedCreatedTime = examCreatedTime.toLocaleString(
              "ar-EG",
              {
                dateStyle: "short",
                timeStyle: "short",
              }
            );

            const renderExamStatus = () => {
              if (now > examEndTime) {
                if (studentExamInfo) {
                  return (
                    <p className="text-green-600 mb-2">
                      <span className="font-semibold">الدرجة:</span>{" "}
                      {studentExamInfo.totalScores}
                    </p>
                  );
                } else {
                  return (
                    <p className="text-red-500 mb-2">
                      لقد فاتك الامتحان واعتبرت غائباً ودرجتك 0
                    </p>
                  );
                }
              } else if (now < examStartTime) {
                return (
                  <p className="text-blue-500 mb-2">
                    لم تدخل الإمتحان بعد لعرض درجتك.
                  </p>
                );
              }
              return null;
            };

            return (
              <li key={exam._id} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-2">
                  {exam.titleOfExam}
                </h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">تاريخ إنشاء الإمتحان:</span>{" "}
                  {formattedCreatedTime}
                </p>
                <p className="text-gray-600 mb-4">
                  الوصف :{" "}
                  <span className="text-mainColor500 font-bold tracking-wider">
                    {exam.descriptionOfExam}
                  </span>
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">تاريخ بداية الإمتحان:</span>{" "}
                  {formattedStartTime}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">تاريخ إنتهاء الإمتحان:</span>{" "}
                  {formattedEndTime}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">مدة الإمتحان:</span>{" "}
                  {exam.timeOfExam} دقيقة
                </p>
                <p className="text-red-500 mb-2">
                  ملحوظة: إذا لم تحضر الإمتحان في الوقت المحدد فستعتبر غائباً
                  وستكون درجتك ب0
                </p>
                <p className="text-red-500 mb-4">
                  ملحوظة: تستطيع دخول هذا الإمتحان لمرة واحدة فقط!
                </p>
                {renderExamStatus()}
                {now >= examStartTime && now <= examEndTime && (
                  <button
                    onClick={() => handleStartExam(exam)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    بدء الإمتحان
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const currentQuestion = currentExam.questions[currentQuestionIndex];
  const totalPossibleScore = calculateTotalPossibleScore();
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div
      dir="rtl"
      className="p-8 bg-gray-100 min-h-screen flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-3xl w-full border border-gray-300">
        {!showSummary ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-8 border-b pb-4">
              {currentExam.titleOfExam}
            </h1>
            <p className="text-center text-red-500 font-semibold mb-4">
              الوقت المتبقي : {formatTime(timeLeft)}
            </p>
            <TransitionGroup>
              <CSSTransition
                key={currentQuestionIndex}
                timeout={500}
                classNames="fade"
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                    السؤال {currentQuestionIndex + 1}:
                  </h2>
                  <p className="text-lg mb-6 text-center text-mainColor500 font-bold">
                    {currentQuestion.content}
                  </p>
                  {currentQuestion.questionImage && (
                    <div className="flex justify-center mb-6">
                      <img
                        src={currentQuestion.questionImage}
                        alt="Question"
                        className="w-2/3 h-auto rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                  <p className="text-gray-600 mb-4">
                    {" "}
                    {currentQuestion.notes ? (
                      <span>
                        <span className="font-bold">ملاحظات حول السؤال</span>:{" "}
                        {currentQuestion.notes}
                      </span>
                    ) : (
                      ""
                    )}
                  </p>{" "}
                  {/* عرض ملاحظات السؤال */}
                  <ul className="space-y-4 mb-6">
                    {currentQuestion.options.map((option, index) => (
                      <li
                        key={option._id}
                        className="flex flex-col items-start p-4 bg-gray-50 border border-gray-200 rounded-lg "
                      >
                        <label className="flex items-center space-x-4 cursor-pointer w-full mb-2 gap-2">
                          <input
                            type="radio"
                            name={`question-${currentQuestion._id}`}
                            value={index}
                            checked={answers[currentQuestion._id] === index}
                            onChange={() =>
                              handleOptionChange(currentQuestion._id, index)
                            }
                            className="form-radio text-blue-500 h-6 w-6 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                          />
                          <span className="text-gray-700 text-lg font-medium">
                            {option.text}
                          </span>
                        </label>
                        {option.optionImage && (
                          <img
                            src={option.optionImage}
                            alt={`Option ${index + 1}`}
                            className="w-full h-auto rounded-lg border border-gray-300 mt-2"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </CSSTransition>
            </TransitionGroup>
            <div className="flex justify-between">
              {currentQuestionIndex !== currentExam.questions.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  السؤال التالي
                </button>
              )}

              {currentQuestionIndex === currentExam.questions.length - 1 && (
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  إرسال
                </button>
              )}
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-4xl font-bold text-center mb-8 border-b pb-4">
              ملخص الإمتحان
            </h1>
            <h2 className="text-2xl font-semibold mb-4">
              درجتك هي:{" "}
              <span
                className={`${
                  score > totalPossibleScore / 2
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {score}
              </span>{" "}
              من <span className="text-mainColor500">{totalPossibleScore}</span>
            </h2>
            <ul className="space-y-4">
              {currentExam.questions.map((question, index) => (
                <li
                  key={question._id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    السؤال {index + 1}:
                  </h3>
                  <p className="text-black font-bold tracking-wider mb-2 text-center border-b-[1px] border-gray-500 pb-2">
                    {question.content}
                  </p>
                  {question.questionImage && (
                    <img
                      src={question.questionImage}
                      alt="Question"
                      className="w-2/3 h-auto rounded-lg border border-gray-300 mb-2"
                    />
                  )}
                  <p className="text-gray-600 mb-2">
                    {question.notes ? (
                      <span>
                        <span className="text-mainColor600 font-bold">
                          ملاحظات السؤال
                        </span>{" "}
                        : {question.notes}
                      </span>
                    ) : (
                      ""
                    )}
                  </p>{" "}
                  {/* عرض ملاحظات السؤال في ملخص الامتحان */}
                  <p className="text-green-500">
                    الإجابة الصحيحة هي:{" "}
                    {question.options[question.correctOptionIndex].text}
                  </p>
                  <p
                    className={`mt-2 ${
                      answers[question._id] === question.correctOptionIndex
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    إجابتك هي:{" "}
                    {answers[question._id] !== undefined
                      ? question.options[answers[question._id]].text
                      : "لم تتم الإجابة"}
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={handleExitSummary}
              className="bg-mainColor500 text-white px-4 py-2 rounded-lg hover:bg-mainColor700 transition mt-8"
            >
              الخروج والعودة إلى قائمة الإمتحانات
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseExams;
