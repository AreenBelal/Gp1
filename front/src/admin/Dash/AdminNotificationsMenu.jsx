import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Spinner,
  Button,
  Badge,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllAdminNotifications } from "../../system-redux/users/owners/allAdminNotificationsSlice";
import FormatTimeAgo from "../../helpers/FormatTimeAgo";
import { MdDelete, MdMarkChatRead, MdMarkChatUnread } from "react-icons/md";
import { base_url } from "../../system-redux/data/apis";
import axios from "axios";

function ClockIcon() {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.99998 14.9C9.69736 14.9 11.3252 14.2257 12.5255 13.0255C13.7257 11.8252 14.4 10.1974 14.4 8.49998C14.4 6.80259 13.7257 5.17472 12.5255 3.97449C11.3252 2.77426 9.69736 2.09998 7.99998 2.09998C6.30259 2.09998 4.67472 2.77426 3.47449 3.97449C2.27426 5.17472 1.59998 6.80259 1.59998 8.49998C1.59998 10.1974 2.27426 11.8252 3.47449 13.0255C4.67472 14.2257 6.30259 14.9 7.99998 14.9ZM8.79998 5.29998C8.79998 5.0878 8.71569 4.88432 8.56566 4.73429C8.41563 4.58426 8.21215 4.49998 7.99998 4.49998C7.7878 4.49998 7.58432 4.58426 7.43429 4.73429C7.28426 4.88432 7.19998 5.0878 7.19998 5.29998V8.49998C7.20002 8.71213 7.28434 8.91558 7.43438 9.06558L9.69678 11.3288C9.7711 11.4031 9.85934 11.4621 9.95646 11.5023C10.0536 11.5425 10.1577 11.5632 10.2628 11.5632C10.3679 11.5632 10.472 11.5425 10.5691 11.5023C10.6662 11.4621 10.7544 11.4031 10.8288 11.3288C10.9031 11.2544 10.9621 11.1662 11.0023 11.0691C11.0425 10.972 11.0632 10.8679 11.0632 10.7628C11.0632 10.6577 11.0425 10.5536 11.0023 10.4565C10.9621 10.3593 10.9031 10.2711 10.8288 10.1968L8.79998 8.16878V5.29998Z"
        fill="#90A4AE"
      />
    </svg>
  );
}

const AdminNotificationsMenu = () => {
  const { ownerData, ownerLoading } = useSelector((state) => state.singleOwner);
  const { allAdminNotificationsData, allAdminNotificationsLoading } =
    useSelector((state) => state.allAdminNotifications);

  const [updatePage, setUpdatePage] = useState(false);
  const [loading, setLoading] = useState({
    unread: false,
    read: false,
    deleteOne: false,
    deleteAll: false,
    readAll: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (ownerData?._id) {
      dispatch(getAllAdminNotifications(ownerData?._id));
    }
    console.log(allAdminNotificationsData);
  }, [ownerData, updatePage]);

  const unread = async (notificationId) => {
    setLoading((prevState) => ({
      ...prevState,
      unread: true,
    }));
    try {
      const option = {
        method: "PATCH",
        url: `${base_url}/owners/notifications/${notificationId}`,
        // headers: { Authorization: `Bearer ${userData?.token}` },
        data: {
          seen: false,
        },
      };

      const response = await axios(option);
      setUpdatePage(!updatePage);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        unread: false,
      }));
    }
  };
  const read = async (notificationId) => {
    console.log("notificationId:", notificationId);
    setLoading((prevState) => ({
      ...prevState,
      read: true,
    }));
    try {
      const option = {
        method: "PATCH",
        url: `${base_url}/owners/notifications/${notificationId}`,
        // headers: { Authorization: `Bearer ${userData?.token}` },
        data: {
          seen: true,
        },
      };

      const response = await axios(option);
      setUpdatePage(!updatePage);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        read: false,
      }));
    }
  };
  const deleteOne = async (notificationId) => {
    setLoading((prevState) => ({
      ...prevState,
      deleteOne: true,
    }));
    try {
      const option = {
        method: "DELETE",
        url: `${base_url}/owners/notifications/${notificationId}`,
        // headers: { Authorization: `Bearer ${userData?.token}` },
      };

      const response = await axios(option);
      setUpdatePage(!updatePage);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        deleteOne: false,
      }));
    }
  };
  const deleteAll = async () => {
    setLoading((prevState) => ({
      ...prevState,
      deleteAll: true,
    }));
    try {
      const option = {
        method: "GET",
        url: `${base_url}/owners/notifications/delete-or-update/${ownerData?._id}?deleteAll=all`,
        // headers: { Authorization: `Bearer ${userData?.token}` },
      };

      const response = await axios(option);
      setUpdatePage(!updatePage);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        deleteAll: false,
      }));
    }
  };
  const readAll = async () => {
    setLoading((prevState) => ({
      ...prevState,
      readAll: true,
    }));
    try {
      const option = {
        method: "GET",
        url: `${base_url}/owners/notifications/delete-or-update/${ownerData?._id}?seen=all`,
        // headers: { Authorization: `Bearer ${userData?.token}` },
      };

      const response = await axios(option);
      setUpdatePage(!updatePage);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        readAll: false,
      }));
    }
  };

  const counter = allAdminNotificationsData?.filter(
    (notification) => notification.seen === false
  ).length;

  return (
    <Menu>
      <MenuHandler>
        <IconButton variant="text">
          <Badge
            content={
              allAdminNotificationsLoading ? (
                <Spinner color="green" className="h-3 w-3" />
              ) : (
                counter
              )
            }
            className=""
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                clipRule="evenodd"
              />
            </svg>
          </Badge>
        </IconButton>
      </MenuHandler>

      <MenuList className="flex flex-col gap-2" dir="rtl">
        {allAdminNotificationsData.length > 0 && (
          <div className="flex items-center gap-2 justify-center flex-wrap">
            <Button onClick={deleteAll} className="p-1">
              {loading.deleteAll ? (
                <div className="px-8">
                  <Spinner color="green" className="h-4 w-4" />
                </div>
              ) : (
                "حذف جميع الإشعارات"
              )}
            </Button>
            <Button onClick={readAll} className="p-1">
              {loading.readAll ? (
                <div className="px-8">
                  <Spinner color="green" className="h-4 w-4" />
                </div>
              ) : (
                "تمييز الكل كمقروء"
              )}
            </Button>
          </div>
        )}
        {allAdminNotificationsLoading ? (
          <div className="flex justify-center">
            <Spinner color="green" />
          </div>
        ) : allAdminNotificationsData.length > 0 ? (
          allAdminNotificationsData?.map((notification, index) => (
            <MenuItem
              key={index}
              className={`flex items-center gap-4 py-2 pl-2 pr-8 ${
                notification?.seen === false && "bg-darkMode-dark200"
              }`}
            >
              <div className="flex flex-col gap-1">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-semibold"
                >
                  {notification?.content}
                </Typography>
                <div className="flex group items-center justify-between text-sm font-medium text-blue-gray-500 ">
                  <div className="flex items-center gap-1">
                    <ClockIcon />
                    <FormatTimeAgo createdAt={notification?.createdAt} />
                  </div>
                  <div className="flex items-center gap-2">
                    {notification.seen === true ? (
                      loading.unread ? (
                        <div className="">
                          <Spinner color="green" className="h-4 w-4" />
                        </div>
                      ) : (
                        <MdMarkChatUnread
                          onClick={() => unread(notification?._id)}
                          className="text-lg hover:text-mainColor500 duration-200"
                        />
                      )
                    ) : loading.read ? (
                      <div className="">
                        <Spinner color="green" className="h-4 w-4" />
                      </div>
                    ) : (
                      <MdMarkChatRead
                        onClick={() => read(notification?._id)}
                        className="text-lg hover:text-mainColor500 duration-200"
                      />
                    )}

                    {loading.deleteOne ? (
                      <div className="">
                        <Spinner color="red" className="h-4 w-4" />
                      </div>
                    ) : (
                      <MdDelete
                        onClick={() => deleteOne(notification?._id)}
                        className="text-xl hover:text-deep-orange-600 duration-200"
                      />
                    )}
                  </div>
                </div>
              </div>
            </MenuItem>
          ))
        ) : (
          <p className="text-center">لا يوجد إشعارات حتي الآن</p>
        )}
      </MenuList>
    </Menu>
  );
};

export default AdminNotificationsMenu;
