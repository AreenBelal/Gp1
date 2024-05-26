import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { TiHomeOutline } from "react-icons/ti";
import {
  MdPermContactCalendar,
  MdOutlineAssignmentTurnedIn,
  MdOutlineQuiz,
} from "react-icons/md";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { FaRegCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { PowerIcon } from "@heroicons/react/24/outline";
import { PiChatsCircle } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForSingleStudent } from "../../system-redux/users/students/orders/allOrdersForSingleStudentSlice";
import { useEffect } from "react";
const StudentSidebar = ({ showItemDashBoard, setShowItemDashBoard }) => {
  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const { allOrdersForSingleStudentData, allOrdersForSingleStudentLoading } =
    useSelector((state) => state.allOrdersForSingleStudent);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersForSingleStudent(studentData?._id));
  }, [studentData]);

  const listOfSidebar = [
    {
      id: 1,
      name: "الرئيسية",
      where: "home",
      icon: <TiHomeOutline className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "معلومات الإتصال",
      where: "contact-info",
      icon: <MdPermContactCalendar className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "اشتراكاتي",
      where: "subscriptions",
      icon: <MdPermContactCalendar className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "الدورات",
      where: "courses",
      icon: <ReceiptOutlinedIcon className="h-5 w-5" />,
    },
    {
      id: 5,
      name: "واجباتي",
      where: "assignments",
      icon: <MdOutlineAssignmentTurnedIn className="h-5 w-5" />,
    },
    {
      id: 6,
      name: "التقويم",
      where: "calendar",
      icon: <FaRegCalendarAlt className="h-5 w-5" />,
    },
    {
      id: 7,
      name: "صفحة الأسئلة الشائعة",
      where: "FAQ",
      icon: <FaQuestionCircle className="h-5 w-5" />,
    },
    {
      id: 8,
      name: "مُلاحظاتي",
      where: "notes",
      icon: <CgNotes className="h-5 w-5" />,
    },
    {
      id: 9,
      name: "الإختبارات القصيرة",
      where: "short-quiz",
      icon: <MdOutlineQuiz className="h-5 w-5" />,
    },
  ];

  const listOfSubSidebar = [
    {
      id: 1,
      name: "الرئيسية",
      where: "sub, home",
      icon: <TiHomeOutline className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "الفيديوهات",
      where: "sub, videos",
      icon: <TiHomeOutline className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "الإمتحانات",
      where: "sub, exams",
      icon: <MdPermContactCalendar className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "الواجبات",
      where: "sub, assignments",
      icon: <MdPermContactCalendar className="h-5 w-5" />,
    },
    {
      id: 5,
      name: "الطلاب المشتركين",
      where: "sub, subscriptions-students",
      icon: <ReceiptOutlinedIcon className="h-5 w-5" />,
    },
    {
      id: 5,
      name: "المحادثات",
      where: "sub, chat",
      icon: <PiChatsCircle className="h-5 w-5" />,
    },
  ];

  const handleRoute = (item) => {
    if (item.where === "sub, chat") {
      localStorage.removeItem("chatIdS");
      setShowItemDashBoard(item.where);
      sessionStorage.whereStudent = `${item.where}`;
    } else {
      setShowItemDashBoard(item.where);
      sessionStorage.whereStudent = `${item.where}`;
    }
  };

  const listToShow = showItemDashBoard.includes("sub, ")
    ? listOfSubSidebar
    : listOfSidebar;

  return (
    <div className="overflow-auto">
      <Card className="fixed min-h-full z-50 rounded-none p-4 lg:w-[25%] xl:w-[22%] xxl:w-[19%] overflow-auto">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            {showItemDashBoard.includes("sub, ")
              ? "لوحة تحكم الدورة"
              : "لوحة التحكم"}
          </Typography>
        </div>
        <List className="min-w-[16%] overflow-auto">
          {allOrdersForSingleStudentData?.length > 0
            ? listToShow.map((item) => (
                <ListItem
                  key={item.id}
                  onClick={() => handleRoute(item)}
                  className={`${
                    item.name === "اشتراكاتي"
                      ? "bg-mainColor500 text-white hover:bg-mainColor400 hover:text-white focus:bg-mainColor500 focus:text-white"
                      : ""
                  } flex text-start text-sm gap-2 items-center `}
                >
                  <ListItemPrefix>{item.icon}</ListItemPrefix>
                  {item.name}
                </ListItem>
              ))
            : listToShow
                .filter((item) => item.name !== "اشتراكاتي")
                .map((item) => (
                  <ListItem
                    key={item.id}
                    onClick={() => handleRoute(item)}
                    className="flex text-start text-sm gap-2 items-center "
                  >
                    <ListItemPrefix>{item.icon}</ListItemPrefix>
                    {item.name}
                  </ListItem>
                ))}
          {!showItemDashBoard.includes("sub, ") && (
            <ListItem className="flex gap-2 items-center">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              تسجيل الخروج
            </ListItem>
          )}
        </List>
      </Card>
    </div>
  );
};

export default StudentSidebar;
