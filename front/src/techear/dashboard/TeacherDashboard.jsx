import Nav from "../../homepage/components/Nav";
import { useEffect, useState } from "react";
import TeacherNavbar from "./TeacherNavbar";
import TeacherSidebar from "./TeacherSidebar";
import TeacherResponsiveSidebar from "./TeacherResponsiveSidebar";
import UploadingClassroomSessions from "./UploadingClassroomSessions";
import UploadingExam from "./UploadingExam";
function TeacherDashboard() {
  const [openSidebarRight, setOpenSidebarRight] = useState(false);
  const openDrawerRight = () => setOpenSidebarRight(true);

  const [showItemDashBoard, setShowItemDashBoard] = useState("home");

  useEffect(() => {
    setShowItemDashBoard(
      sessionStorage.whereTeahcer ? sessionStorage.whereTeahcer : "home"
    );
  }, []);

  return (
    <>
      <div dir="rtl" className="flex flex-col w-full">
        <TeacherResponsiveSidebar
          openSidebarRight={openSidebarRight}
          setOpenSidebarRight={setOpenSidebarRight}
        />
        <div className="mb-[76px]">
          <Nav />
        </div>
        <div className="h-12">
          <TeacherNavbar openDrawerRight={openDrawerRight} />
        </div>
        <div className="flex gap-2">
          <div className="lg:w-[25%] xl:w-[22%] xxl:w-[19%] hidden lg:block">
            <TeacherSidebar
              showItemDashBoard={showItemDashBoard}
              setShowItemDashBoard={setShowItemDashBoard}
            />
          </div>
          <div
            className={`${
              showItemDashBoard === "uploading-classroom-sessions"
                ? "block"
                : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <UploadingClassroomSessions />
          </div>
          <div
            className={`${
              showItemDashBoard === "short-test-questions" ? "block" : "hidden"
            } w-full lg:w-[75%] xl:w-[78%] xxl:w-[81%]`}
          >
            <UploadingExam />
          </div>

          <div
            className={`${
              showItemDashBoard === "teachers-ads" ? "block" : "hidden"
            } w-full lg:w-[84%]`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
