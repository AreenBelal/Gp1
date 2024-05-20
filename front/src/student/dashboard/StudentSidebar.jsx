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
const StudentSidebar = ({ showItemDashBoard, setShowItemDashBoard }) => {
  const listOfSidebar = [
    {
      id: 1,
      name: "لوحة التحكم",
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
      name: "الدورات",
      where: "courses",
      icon: <ReceiptOutlinedIcon className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "واجباتي",
      where: "assignments",
      icon: <MdOutlineAssignmentTurnedIn className="h-5 w-5" />,
    },
    {
      id: 5,
      name: "التقويم",
      where: "calendar",
      icon: <FaRegCalendarAlt className="h-5 w-5" />,
    },
    {
      id: 6,
      name: "صفحة الأسئلة الشائعة",
      where: "FAQ",
      icon: <FaQuestionCircle className="h-5 w-5" />,
    },
    {
      id: 7,
      name: "مُلاحظاتي",
      where: "notes",
      icon: <CgNotes className="h-5 w-5" />,
    },
    {
      id: 8,
      name: "الإختبارات القصيرة",
      where: "short-quiz",
      icon: <MdOutlineQuiz className="h-5 w-5" />,
    },
  ];

  const handleRoute = (item) => {
    setShowItemDashBoard(item.where);
    sessionStorage.whereStudent = `${item.where}`;
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

export default StudentSidebar;
