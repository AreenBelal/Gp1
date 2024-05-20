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
const AdminSidebar = ({ showItemDashBoard, setShowItemDashBoard }) => {
  const listOfSidebar = [
    {
      name: "الصفحة الرئيسية",
      icon: <MdHome className="h-5 w-5" />,
      goTo: "",
      where: "home",
    },
    {
      name: "المعلمون",
      icon: <FaChalkboardTeacher className="h-5 w-5" />,
      goTo: "",
      where: "teachers",
    },
    {
      name: "إعلانات المعلمين",
      icon: <FcAdvertising className="h-5 w-5" />,
      goTo: "",
      where: "teachers-ads",
    },
    {
      name: "الطلاب",
      icon: <PiStudentFill className="h-5 w-5" />,
      goTo: "",
      where: "students",
    },
    {
      name: "الإعدادات",
      icon: <CiSettings className="h-5 w-5" />,
      goTo: "",
      where: "settings",
    },
  ];

  const handleRoute = (item) => {
    setShowItemDashBoard(item.where);
    sessionStorage.where = `${item.where}`;
  };

  return (
    <div className="">
      <Card className="fixed h-full z-50 rounded-none p-4 min-w-[16%]">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            لوحة التحكم
          </Typography>
        </div>
        <List className="min-w-[16%]">
          {listOfSidebar?.map((item) => (
            <ListItem
              onClick={() => handleRoute(item)}
              className="flex gap-2 items-center"
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

export default AdminSidebar;
