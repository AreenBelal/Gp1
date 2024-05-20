import { PencilIcon } from "@heroicons/react/24/solid";

import { Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { base_url } from "../../../../../system-redux/data/apis";
import toast from "react-hot-toast";
import axios from "axios";
const TeachersAdsItem = ({
  setOpenTeachersAdsModal,
  openTeachersAdsModal,
  teacherAd,
  setTeacherAdModal,
  setTeachersAdsControlModal,
  setUpdateTeachersAdsPage,
  updateTeachersAdsPage,
}) => {
  const deleteAd = () => {
    Swal.fire({
      title: "هل انت متأكد من حذف هذا الإعلان؟",
      text: "لن تتمكن من إستعادته مرة أخري!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم, إحذفه!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const option = {
          method: "DELETE",
          url: `${base_url}/owners/ads/${teacherAd?._id}`,
          // headers: { Authorization: `Bearer ${userData?.token}` },
        };

        const response = await axios(option);

        if (response.data.status === "success") {
          setUpdateTeachersAdsPage(!updateTeachersAdsPage);
          Swal.fire({
            title: "تم الحذف!",
            text: "تم حذف هذا الإعلان بنجاح",
            icon: "success",
          });
          toast.success("تم حذف الإعلان بنجاح");
        }
      }
    });
  };

  const handleOpen = () => {
    setOpenTeachersAdsModal(true);
    setTeachersAdsControlModal("edit-teacher-ad");
    setTeacherAdModal(teacherAd);
  };

  return (
    <tr className="flex justify-between items-center w-full px-6 hover:bg-mainColor100 duration-100">
      <td className={`w-1/5 flex justify-center items-center`}>
        <div className="">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {teacherAd?.branch}
          </Typography>
        </div>
      </td>
      <td className={`w-1/5 flex justify-center items-center`}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {teacherAd?.course}
        </Typography>
      </td>
      <td className={`w-1/5 flex justify-center items-center`}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {teacherAd?.timeFrom} - {teacherAd?.timeTo}
        </Typography>
      </td>
      <td className={`w-1/5 flex justify-center items-center`}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {teacherAd?.dayFrom} - {teacherAd?.dayTo}
        </Typography>
      </td>

      <td className={`w-1/5 flex justify-center items-center`}>
        <Tooltip content="تعديل الإعلان">
          <IconButton onClick={() => handleOpen()} variant="text">
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="حذف الإعلان">
          <IconButton onClick={deleteAd} variant="text">
            <FaTrash className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};

export default TeachersAdsItem;
