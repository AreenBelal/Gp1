import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { FcAdvertising } from "react-icons/fc";
import { MdHome } from "react-icons/md";
const TeacherSidebar = ({ showItemDashBoard, setShowItemDashBoard }) => {
  const listOfSidebar = [
    {
      name: "الصفحة الرئيسية",
      icon: <MdHome className="h-5 w-5" />,
      goTo: "",
      where: "home",
    },
    {
      name: "تفاصيل الواجبات",
      icon: <FaChalkboardTeacher className="h-5 w-5" />,
      goTo: "",
      where: "duties-details",
    },
    {
      name: "الطلاب والدورات",
      icon: <FcAdvertising className="h-5 w-5" />,
      goTo: "",
      where: "students-and-courses",
    },
    {
      name: "الطلاب والامتحانات",
      icon: <PiStudentFill className="h-5 w-5" />,
      goTo: "",
      where: "students-and-exams",
    },
    {
      name: "الإختبار القصير",
      icon: <CiSettings className="h-5 w-5" />,
      goTo: "",
      where: "short-test-questions",
    },
    {
      name: "رفع واجب للطلبة",
      icon: <CiSettings className="h-5 w-5" />,
      goTo: "",
      where: "uploading-a-duty-for-students",
    },
    {
      name: "اجندة المعلم",
      icon: <CiSettings className="h-5 w-5" />,
      goTo: "",
      where: "teacher-agenda",
    },
    {
      name: "رفع الحصص الصفيّة",
      icon: <CiSettings className="h-5 w-5" />,
      goTo: "",
      where: "uploading-classroom-sessions",
    },
  ];

  const handleRoute = (item) => {
    setShowItemDashBoard(item.where);
    sessionStorage.whereTeahcer = `${item.where}`;
  };

  return (
    <div className="overflow-auto">
      <Card className="fixed min-h-full z-50 rounded-none p-4 lg:w-[25%] xl:w-[22%] xxl:w-[19%]  overflow-auto">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            لوحة التحكم
          </Typography>
        </div>
        <List className="min-w-[16%] overflow-auto">
          {listOfSidebar?.map((item) => (
            <ListItem
              onClick={() => handleRoute(item)}
              className="flex text-start text-sm gap-2 items-center "
            >
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item?.name}
            </ListItem>
          ))}
          <ListItem className="flex gap-2 items-center">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            تسجيل الخروج
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default TeacherSidebar;
