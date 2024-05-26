import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaImage, FaUserPlus, FaVideo } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import Divider from "../../../components/Divider";
import { FiArrowUpRight } from "react-icons/fi";
import SearchInStudentForChat from "./SearchInStudentForChat";
import { useSearchParams } from "react-router-dom";

const SidebarOfChat = () => {
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id");
  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  const { socketConnection } = useSelector((state) => state.socketIo);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", studentData?._id);

      socketConnection.on("conversation", (data) => {
        const conversationStudentData = data?.map((conversationStu, index) => {
          if (conversationStu?.sender?._id === conversationStu?.receiver?._id) {
            return {
              ...conversationStu,
              studentDetails: conversationStu?.sender,
            };
          } else if (conversationStu?.receiver?._id !== studentData?._id) {
            return {
              ...conversationStu,
              studentDetails: conversationStu?.receiver,
            };
          } else {
            return {
              ...conversationStu,
              studentDetails: conversationStu?.sender,
            };
          }
        });

        setAllUsers(conversationStudentData);
      });
    }
  }, [socketConnection, studentData]);

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className=" bg-darkMode-dark50 w-12 h-full py-5 rounded-tr-lg rounded-br-lg text-gray-600 flex flex-col justify-between ">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 cursor-pointer hover:bg-gray-200 duration-200 flex justify-center items-center rounded ${
                isActive && "bg-gray-300"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>

          <div
            title="add friend"
            className="w-12 h-12 cursor-pointer hover:bg-gray-200 duration-200 flex justify-center items-center rounded"
            onClick={() => setOpenSearchUser(true)}
          >
            <FaUserPlus size={20} />
          </div>
        </div>

        {/* logout */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setEditUserOpen(true)}
            className="mx-auto"
            title={studentData?.fullName}
          >
            <Avatar
              userId={studentData?._id}
              width={40}
              height={40}
              name={studentData?.fullName}
              imageUrl={studentData?.avatar}
            />
          </button>
          <button
            title="logout"
            className="w-12 h-12 cursor-pointer hover:bg-gray-200 duration-200 flex justify-center items-center rounded"
          >
            <span className="-ml-2">
              <BiLogOut size={20} />
            </span>
          </button>
        </div>
        {/* end */}
      </div>

      <div className="w-full ">
        <div className="h-16 flex items-center">
          <p className="text-xl font-bold p-4 text-darkMode-dark800">الرسائل</p>
        </div>

        <div className="bg-darkMode-dark200 p-[0.5px]"></div>
        <div className="h-[calc(82vh-65px)] overflow-x-hidden overflow-y-auto">
          {allUsers.length === 0 ? (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-darkMode-dark500">
                <FiArrowUpRight size={50} />
              </div>
              <p>إستكشف بقية الطلاب للبدء معهم محادثة</p>
            </div>
          ) : (
            allUsers?.map((conv, index) => {
              console.log("studentDetails", conv);
              return (
                <Link
                  to={`/student/dashboard?id=${conv?.studentDetails?._id}`}
                  key={conv?._id}
                  className="flex items-center gap-2 py-3 px-2 border hover:border-mainColor500 duration-200 rounded hover:bg-darkMode-dark100 cursor-pointer"
                >
                  <div>
                    <Avatar
                      width={40}
                      height={40}
                      name={conv?.studentDetails?.fullName}
                      imageUrl={conv?.studentDetails?.avatar}
                    />
                  </div>
                  <div>
                    <h3 className="text-ellipsis line-clamp-1 font-semibold text-base ">
                      {conv?.studentDetails?.fullName}
                    </h3>
                    <div className="text-xs text-darkMode-dark500 flex items-center gap-1">
                      <div className="flex items-center gap-1">
                        {conv?.lastMsg?.imageUrl && (
                          <div className="flex items-center gap-1">
                            <span>
                              <FaImage />
                            </span>
                            {!conv?.lastMsg?.text && <span>صورة</span>}
                          </div>
                        )}
                        {conv?.lastMsg.videoUrl && (
                          <div className="flex items-center gap-1">
                            <span>
                              <FaVideo />
                            </span>
                            {!conv?.lastMsg?.text && <span>فيديو</span>}
                          </div>
                        )}
                      </div>
                      <p className="text-ellipsis line-clamp-1">
                        {conv?.lastMsg?.text}
                      </p>
                    </div>
                  </div>
                  {Boolean(conv?.unseenMsg) && (
                    <p className="text-xs w-6 h-6 flex justify-center items-center mr-auto p-1 bg-mainColor500 text-white font-semibold rounded-full">
                      {conv?.unseenMsg}
                    </p>
                  )}
                </Link>
              );
            })
          )}
        </div>
      </div>

      {/* edit user details */}
      {editUserOpen && (
        <EditUserDetails
          onClose={() => setEditUserOpen(false)}
          student={studentData && studentData}
        />
      )}

      {openSearchUser && (
        <SearchInStudentForChat onClose={() => setOpenSearchUser(false)} />
      )}

      {/* search user */}
    </div>
  );
};

export default SidebarOfChat;
