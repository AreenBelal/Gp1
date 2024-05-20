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
  Spinner,
} from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllAds } from "../../../system-redux/functionality/ads/allAdsSlice";
import TeachersAdsItem from "./modals/teacher-ads-modal/TeachersAdsItem";
import Pagination from "./Pagination";

const TABLE_HEAD = ["الفرع", "الدورة", "الوقت", "اليوم", "خيارات"];

const TABLE_ROWS = [
  {
    img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
  },
];

const TeachersAds = ({
  openTeachersAdsModal,
  setOpenTeachersAdsModal,
  teacherAdModal,
  setTeacherAdModal,
  setUpdateTeachersAdsPage,
  updateTeachersAdsPage,
  teachersAdsControlModal,
  setTeachersAdsControlModal,
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { adsData, adsLoading } = useSelector((state) => state.allAds);

  useEffect(() => {
    dispatch(getAllAds(page));
  }, [updateTeachersAdsPage, page]);

  useEffect(() => {
    setTotalPages(adsData?.totalPages);
  }, [updateTeachersAdsPage, page]);

  const handleOpen = () => {
    setOpenTeachersAdsModal(true);
    setTeachersAdsControlModal("add-teacher-ad");
    setTeacherAdModal(null);
  };

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
            <Button
              onClick={handleOpen}
              className="flex items-center gap-3"
              size="sm"
            >
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
            {adsLoading ? (
              <div className="h-[50vh] w-full flex justify-center items-center">
                <Spinner color="green" />

                {/* <span
                className={` ${
                  localStorage.theme === "dark"
                    ? "loaderElementsDarkMode"
                    : "loaderElements"
                }`}
              ></span> */}
              </div>
            ) : (
              adsData?.docs?.map((teacherAd, index) => (
                <TeachersAdsItem
                  teacherAd={teacherAd}
                  key={index}
                  setUpdateTeachersAdsPage={setUpdateTeachersAdsPage}
                  updateTeachersAdsPage={updateTeachersAdsPage}
                  setTeacherAdModal={setTeacherAdModal}
                  setOpenTeachersAdsModal={setOpenTeachersAdsModal}
                  openTeachersAdsModal={openTeachersAdsModal}
                  setTeachersAdsControlModal={setTeachersAdsControlModal}
                />
              ))
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
        {totalPages >= 2 && (
          <div className="flex justify-center items-center">
            <Pagination setPage={setPage} page={page} totalPages={totalPages} />
          </div>
        )}{" "}
      </CardFooter>
    </Card>
  );
};

export default TeachersAds;
