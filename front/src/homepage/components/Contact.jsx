import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../layout/Heading";
import { Card, CardBody, Spinner, Typography } from "@material-tailwind/react";
import { IoIosSchool } from "react-icons/io";
import { MdMenuBook, MdOutlineSchedule } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllAds } from "../../system-redux/functionality/ads/allAdsSlice";
import Pagination from "../../admin/Dash/teachers/Pagination";

const Contact = () => {
  const { adsData, adsLoading } = useSelector((state) => state.allAds);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    dispatch(getAllAds(page));
  }, [page]);

  useEffect(() => {
    setTotalPages(adsData?.totalPages);
  }, [page]);

  const advertisements = [
    {
      id: 1,
      course: "اللغة العربية",
      branch: "الفرع العلمي",
      time: "10:00 ص - 12:00 م",
    },
    {
      id: 2,
      course: "رياضيات",
      branch: "الفرع الأدبي",
      time: "1:00 م - 3:00 م",
    },
    {
      id: 3,
      course: "فيزياء",
      branch: "الفرع العلمي",
      time: "9:00 ص - 11:00 ص",
    },
    {
      id: 4,
      course: "كيمياء",
      branch: "الفرع العلمي",
      time: "2:00 م - 4:00 م",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-10 mt-30">
      <Heading title2="نسعد بتواصلك معنا" />

      <div
        className="flex flex-col items-center gap-10 justify-center mt-1 flex-wrap"
        style={{ direction: "rtl" }}
      >
        {adsLoading ? (
          <div className="h-[50vh] w-full flex justify-center items-center">
            <Spinner color="green" className="w-10 h-10" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 flex-wrap">
            {adsData?.docs?.map((ad) => (
              <div className=" dark:shadow-darkMode-dark50 ">
                <Card key={ad.id} className=" dark:bg-darkMode-dark800">
                  <CardBody className="text-center dark:bg-darkMode-dark800 rounded-lg">
                    <Typography
                      variant="h6"
                      component="h2"
                      className="dark:text-darkMode-dark50 flex justify-center items-center gap-2"
                    >
                      <IoIosSchool className="text-4xl text-darkMode-dark700 dark:text-darkMode-dark50" />{" "}
                      {ad.course}
                    </Typography>
                    <Typography
                      className="dark:text-darkMode-dark300 flex justify-center items-center gap-2"
                      color="textSecondary"
                      gutterBottom
                    >
                      <MdMenuBook className="dark:text-darkMode-dark50 text-xl" />{" "}
                      {ad.branch}
                    </Typography>
                    <Typography
                      className="dark:text-darkMode-dark400 flex justify-center items-center gap-2"
                      color="textSecondary"
                      gutterBottom
                    >
                      <MdOutlineSchedule
                        className="dark:text-darkMode-dark50 text-xl text-darkMode-dark700"
                        fontSize="small"
                      />{" "}
                      {ad.dayFrom} - {ad.dayTo}
                    </Typography>
                    <Typography
                      className="dark:text-darkMode-dark400 flex justify-center items-center gap-2"
                      color="textSecondary"
                      gutterBottom
                    >
                      <MdOutlineSchedule
                        className="dark:text-darkMode-dark50 text-xl text-darkMode-dark700"
                        fontSize="small"
                      />{" "}
                      {ad.timeFrom} - {ad.timeTo}
                    </Typography>

                    <Typography
                      className="dark:text-darkMode-dark400 flex justify-center items-center gap-2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {ad.description}
                    </Typography>
                    <Link
                      to={{
                        pathname: "/teachers/register",
                        search: `?branch=${ad.branch}&course=${ad.course}`,
                      }}
                      className="hover:text-mainColor500 dark:hover:text-mainColor500 duration-200 dark:text-darkMode-dark50"
                    >
                      تواصل معنا
                    </Link>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        )}

        <Pagination setPage={setPage} page={page} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Contact;
