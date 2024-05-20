import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";
import { FcEmptyTrash, FcSearch } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";

const TABLE_HEAD = ["الفرع", "الدورة", "الوقت", "اليوم", "خيارات"];

const TABLE_ROWS = [
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
  },
];

const TeachersAds = () => {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              إعلانات المعلمون
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              هنا يمكنك إضافة إعلانات للمعلمين بحيث تظهر لهم في الصفحة الرئيسية
              للتسجيل بها
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> إضافة
              إعلان
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-auto px-0 w-full">
        <table className="w-full text-left">
          <thead className="bg-mainColor500">
            <tr className="flex items-center w-full px-6">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="w-1/5 flex justify-center items-center"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-lg tracking-widest text-darkMode-dark50 font-bold"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ img, name, amount, date }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "" : "";

              return (
                <tr
                  className="flex justify-between items-center w-full px-6 hover:bg-mainColor100 duration-100"
                  key={name}
                >
                  <td
                    className={`${classes} w-1/5 flex justify-center items-center`}
                  >
                    <div className="">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td
                    className={`${classes} w-1/5 flex justify-center items-center`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {amount}
                    </Typography>
                  </td>
                  <td
                    className={`${classes} w-1/5 flex justify-center items-center`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td
                    className={`${classes} w-1/5 flex justify-center items-center`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {amount}
                    </Typography>
                  </td>

                  <td
                    className={`${classes} w-1/5 flex justify-center items-center`}
                  >
                    <Tooltip content="تعديل الإعلان">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="حذف الإعلان">
                      <IconButton variant="text">
                        <FaTrash className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          السابق
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          التالي
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeachersAds;
