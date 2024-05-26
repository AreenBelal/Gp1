import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForSingleStudent } from "../../system-redux/users/students/orders/allOrdersForSingleStudentSlice";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import FormatDateArabic from "../../helpers/FormatDateArabic";
const Subscriptions = ({ setCourse, setShowItemDashBoard }) => {
  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const { allOrdersForSingleStudentData, allOrdersForSingleStudentLoading } =
    useSelector((state) => state.allOrdersForSingleStudent);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForSingleStudent(studentData?._id));
  }, [studentData?._id]);

  const handleOpenCourseDashboard = (course) => {
    localStorage.idT = course.courseId;
    setShowItemDashBoard("sub, home");

    setCourse(course);
  };

  return (
    <div className="my-10 px-4 flex flex-col gap-5">
      <div>
        <p className="text-center text-4xl text-mainColor500 ">اشتراكاتي</p>
      </div>

      {allOrdersForSingleStudentLoading ? (
        <div className="flex justify-center h-52 items-center">
          <Spinner color="green" className="w-14 h-14" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {allOrdersForSingleStudentData?.length > 0 ? (
            allOrdersForSingleStudentData?.map((courseArr) =>
              courseArr?.courses?.map((course) => {
                console.log("course:", course);
                return (
                  <Card className="overflow-hidden" key={course?.course?.id}>
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="m-0 rounded-none h-44 relative overflow-hidden"
                    >
                      <img
                        src={course?.course?.ad?.courseImg}
                        className="w-full object-cover hover:scale-105 duration-300 cursor-pointer"
                        alt="teacher img"
                      />
                    </CardHeader>
                    <CardBody className="p-0">
                      <Typography
                        className="text-center pt-3"
                        variant="h4"
                        color="blue-gray"
                      >
                        دورة <span>{course?.course?.course}</span>
                      </Typography>
                      <Typography
                        variant="lead"
                        color="gray"
                        className="mt-3 font-normal px-4"
                      >
                        مقدمة من المعلم{" "}
                        <span className="text-mainColor500 font-bold">
                          {course?.course?.fullName}
                        </span>
                      </Typography>
                      <Typography
                        variant="lead"
                        color="gray"
                        className="mt-3 font-bold px-4"
                      >
                        لقد اشتركت في هذه الدورة منذ{" "}
                        <span className="text-darkMode-dark400 text-sm  text-end flex justify-end font-light">
                          <FormatDateArabic createdAt={courseArr?.createdAt} />
                        </span>
                      </Typography>
                    </CardBody>
                    <CardFooter className="flex flex-col gap-2 pb-0 px-0">
                      <div
                        onClick={() =>
                          handleOpenCourseDashboard(course && course)
                        }
                      >
                        <Button
                          fullWidth
                          className="rounded-es-2xl rounded-ee-2xl rounded-none text-lg py-2 bg-mainColor600 hover:bg-mainColor500 duration-200"
                        >
                          دخول للدورة
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })
            )
          ) : (
            <p>لا يوجد دورات متاحة لك</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
