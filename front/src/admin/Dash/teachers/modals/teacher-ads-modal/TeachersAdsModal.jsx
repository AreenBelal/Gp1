import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import EditTeachersAds from "./EditTeachersAds";
import AddTeachersAds from "./AddTeachersAds";

const TeachersAdsModal = ({
  openTeachersAdsModal,
  setOpenTeachersAdsModal,
  teacherAdModal,
  setTeacherAdModal,
  setUpdateTeachersAdsPage,
  updateTeachersAdsPage,
  teachersAdsControlModal,
}) => {
  const handleClose = () => setOpenTeachersAdsModal(false);
  const [modalWidth, setModalWidth] = useState(1000);
  const [modalHeight, setModalHeight] = useState(800);

  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      setModalWidth(1050);
      setModalHeight(700);
    } else if (window.innerWidth >= 992) {
      setModalWidth(900);
      setModalHeight(580);
    } else if (window.innerWidth >= 768) {
      setModalWidth(650);
      setModalHeight(650);
    } else {
      setModalWidth(300);
      setModalHeight(650);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalWidth,
    height: modalHeight,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    backgroundImage: "url(/bg-img.jpeg)",
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openTeachersAdsModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openTeachersAdsModal}>
          <Box sx={style}>
            <div className="flex flex-col gap-5 relative">
              <span
                onClick={handleClose}
                className="cursor-pointer bg-gradient-to-tr shadow-md shadow-orange-500 from-orange-500 to-orange-900 hover:shadow-orange-400 hover:to-orange-800 z-30 absolute top-0 right-0 p-2 rounded-full text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3 md:w-6 md:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <div>
                <p className="font-bold text-2xl">
                  {teachersAdsControlModal === "add-teacher-ad"
                    ? "إضافة إعلان معلم"
                    : "تعديل إعلان المعلم"}
                </p>
                <p className="font-bold text-2xl"></p>
              </div>
              {/* div container */}
              <div>
                <div>
                  {teachersAdsControlModal === "add-teacher-ad" ? (
                    <AddTeachersAds
                      setUpdateTeachersAdsPage={setUpdateTeachersAdsPage}
                      updateTeachersAdsPage={updateTeachersAdsPage}
                      setOpenTeachersAdsModal={setOpenTeachersAdsModal}
                      openTeachersAdsModal={openTeachersAdsModal}
                    />
                  ) : (
                    <EditTeachersAds
                      teacherAdModal={teacherAdModal}
                      setTeacherAdModal={setTeacherAdModal}
                      setUpdateTeachersAdsPage={setUpdateTeachersAdsPage}
                      updateTeachersAdsPage={updateTeachersAdsPage}
                      setOpenTeachersAdsModal={setOpenTeachersAdsModal}
                      openTeachersAdsModal={openTeachersAdsModal}
                    />
                  )}
                </div>
              </div>
              {/* end div container */}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TeachersAdsModal;
