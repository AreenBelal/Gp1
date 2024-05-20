import "./admindash.css";
import AdminSidebar from "./AdminSidebar";
import Nav from "../../homepage/components/Nav";
import AdminNavbar from "./AdminNavbar";
import AdminResponsiveSidebar from "./AdminResponsiveSidebar";
import { useEffect, useState } from "react";
import StatusOfTeachers from "./teachers/StatusOfTeachers";
import StatusOfTeachersModal from "./teachers/modals/status-of-teachers-modal/StatusOfTeachersModal";
import TeachersAds from "./teachers/TeachersAds";
import TeachersAdsModal from "./teachers/modals/teacher-ads-modal/TeachersAdsModal";
function Admindash() {
  const [openSidebarRight, setOpenSidebarRight] = useState(false);
  const openDrawerRight = () => setOpenSidebarRight(true);
  const [teacherModal, setTeacherModal] = useState(null);
  const [open, setOpen] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  const [teacherAdModal, setTeacherAdModal] = useState(null);
  const [openTeachersAdsModal, setOpenTeachersAdsModal] = useState(false);
  const [updateTeachersAdsPage, setUpdateTeachersAdsPage] = useState(false);
  const [teachersAdsControlModal, setTeachersAdsControlModal] = useState(null);
  const [showItemDashBoard, setShowItemDashBoard] = useState("home");

  useEffect(() => {
    console.log("yes");
    setShowItemDashBoard(sessionStorage.where ? sessionStorage.where : "home");
  }, []);

  return (
    <>
      <div dir="rtl" className="flex flex-col w-full">
        <AdminResponsiveSidebar
          openSidebarRight={openSidebarRight}
          setOpenSidebarRight={setOpenSidebarRight}
        />
        <div className="mb-[76px]">
          <Nav />
        </div>
        <div className="h-12">
          <AdminNavbar openDrawerRight={openDrawerRight} />
        </div>
        <div className="flex gap-2">
          <div className="w-[16%] hidden lg:block">
            <AdminSidebar
              showItemDashBoard={showItemDashBoard}
              setShowItemDashBoard={setShowItemDashBoard}
            />
          </div>
          <div
            className={`${
              showItemDashBoard === "home" ? "block" : "hidden"
            } w-full lg:w-[84%]`}
          >
            <StatusOfTeachers
              teacherModal={teacherModal}
              setTeacherModal={setTeacherModal}
              setUpdatePage={setUpdatePage}
              updatePage={updatePage}
              setOpen={setOpen}
              open={open}
            />
          </div>

          <div
            className={`${
              showItemDashBoard === "teachers-ads" ? "block" : "hidden"
            } w-full lg:w-[84%]`}
          >
            <TeachersAds
              teachersAdsControlModal={teachersAdsControlModal}
              setTeachersAdsControlModal={setTeachersAdsControlModal}
              teacherAdModal={teacherAdModal}
              setTeacherAdModal={setTeacherAdModal}
              updateTeachersAdsPage={updateTeachersAdsPage}
              setUpdateTeachersAdsPage={setUpdateTeachersAdsPage}
              setOpenTeachersAdsModal={setOpenTeachersAdsModal}
              openTeachersAdsModal={openTeachersAdsModal}
            />
          </div>
        </div>
      </div>
      <StatusOfTeachersModal
        teacherModal={teacherModal}
        setTeacherModal={setTeacherModal}
        setUpdatePage={setUpdatePage}
        updatePage={updatePage}
        setOpen={setOpen}
        open={open}
      />

      <TeachersAdsModal
        teacherAdModal={teacherAdModal}
        teachersAdsControlModal={teachersAdsControlModal}
        setTeacherAdModal={setTeacherAdModal}
        updateTeachersAdsPage={updateTeachersAdsPage}
        setUpdateTeachersAdsPage={setUpdateTeachersAdsPage}
        setOpenTeachersAdsModal={setOpenTeachersAdsModal}
        openTeachersAdsModal={openTeachersAdsModal}
      />
    </>
  );
}

export default Admindash;
