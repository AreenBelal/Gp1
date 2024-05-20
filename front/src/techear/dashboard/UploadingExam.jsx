import { Button, Card, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import ExamComonent from "./ExamComonent";
import examImage from "../../assets/exam.jpeg";

const UploadingExam = () => {
  const [startExam, setStartExam] = useState(false);
  const [loading, setloading] = useState(false);

  const handleStartExam = () => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      setStartExam(true);
    }, 500);
  };

  return (
    <Card
      className={`${
        startExam
          ? ""
          : "flex flex-col gap-2 justify-center items-center min-h-[90vh]"
      } min-h-[82vh] p-5 bg-gradient-to-t to-green-300 from-green-100 rounded-none border-[2px]`}
    >
      {startExam ? (
        <ExamComonent startExam={startExam} setStartExam={setStartExam} />
      ) : (
        <Card className="flex flex-col justify-center gap-3 w-fit p-14 bg-bg-img">
          <div className="flex justify-center">
            <img
              width={150}
              height={150}
              src={examImage}
              className="shadow-md rounded-md"
              alt="exam image"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-900">
              هل تريد إضافة إمتحان قصير للطلاب؟
            </p>
          </div>
          <Button
            onClick={handleStartExam}
            className="normal-case py-1 px-8 text-base bg-green-800 hover:bg-green-500"
          >
            {loading ? (
              <div className="w-full h-full px-8 py-0 flex justify-center">
                <Spinner color="white" className="h-6 w-6" />
              </div>
            ) : (
              "اضغط هنا لبدء الإمتحان"
            )}
          </Button>
        </Card>
      )}
    </Card>
  );
};

export default UploadingExam;
