import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleRight, FaImage, FaPlus, FaVideo } from "react-icons/fa";
import uploadFile from "../../../helpers/uploadFile";
import { IoClose } from "react-icons/io5";
import Loading from "../../../components/Loading";
import backgroundImage from "../../../assets/wallapaper.jpeg";
import { MdOutlineSend } from "react-icons/md";
import moment from "moment";
const MessagePart = () => {
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id");
  const { socketConnection } = useSelector((state) => state.socketIo);
  const { studentData, studentLoading } = useSelector(
    (state) => state.singleStudent
  );
  const [dataStudent, setDataStudent] = useState({
    fullName: "",
    email: "",
    avatar: "",
    online: false,
    _id: "",
  });

  const [loading, setLoading] = useState(false);
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [allMessages]);

  useEffect(() => {
    if (id) {
      if (socketConnection) {
        socketConnection.emit("message-part", id);

        socketConnection.emit("seen", id);

        socketConnection.on("message-user", (data) => {
          setDataStudent(data);
        });

        socketConnection.on("message", (data) => {
          console.log("data:", data);
          setAllMessages(data);
        });
      }
    }
  }, [socketConnection, id, studentData]);

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload((preve) => !preve);
  };

  const handleUploadImage = async (ev) => {
    const file = ev.target.files[0];
    setLoading(true);
    console.log("image file:", file);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);
    console.log("uploadPhoto:", uploadPhoto);
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: uploadPhoto?.url,
      };
    });
    console.log("message:", message);
  };
  const handleUploadVideo = async (ev) => {
    const file = ev.target.files[0];

    setLoading(true);
    const uploadVideo = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);

    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: uploadVideo?.url,
      };
    });
  };

  const handleClearUploadImage = () => {
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: "",
      };
    });
  };

  const handleClearUploadVideo = () => {
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: "",
      };
    });
  };

  const handleOnChange = (ev) => {
    const { name, value } = ev.target;
    setMessage((preve) => {
      return {
        ...preve,
        text: value,
      };
    });
  };
  const handleSendMessage = (ev) => {
    ev.preventDefault();
    const { text, imageUrl, videoUrl } = message;
    if (text || imageUrl || videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: studentData?._id,
          receiver: id && id,
          text,
          imageUrl,
          videoUrl,
          msgByStudentId: studentData?._id,
        });
      }
      setMessage({
        text: "",
        imageUrl: "",
        videoUrl: "",
      });
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-no-repeat bg-cover"
    >
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to={`/student/dashboard`} className="lg:hidden text-lg">
            <FaAngleRight size={25} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataStudent?.avatar}
              name={dataStudent?.fullName}
              userId={dataStudent?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {dataStudent?.fullName}
            </h3>
            <p className="-my-[2px] text-sm">
              {dataStudent.online ? (
                <span className="text-mainColor600">نشط الآن</span>
              ) : (
                <span className="text-darkMode-dark400">غير نشط</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer hover:text-mainColor500 duration-200">
            <HiDotsVertical />
          </button>
        </div>
      </header>

      {/* show all message */}
      <section className="h-[calc(82vh-120px)] overflow-x-hidden overflow-y-auto relative bg-darkMode-dark200 bg-opacity-50">
        {/* all messages show here */}
        <div ref={currentMessage} className="flex flex-col gap-2 py-2 mx-2">
          {allMessages?.map((msg, index) => {
            return (
              <div
                key={index}
                className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
                  studentData?._id === msg?.msgByStudentId
                    ? "mr-auto bg-teal-100"
                    : "bg-white"
                }`}
              >
                <div className="w-full relative">
                  {msg?.imageUrl && (
                    <img
                      className="w-full h-full object-scale-down"
                      src={msg?.imageUrl}
                      alt={msg?.text || "message img"}
                    />
                  )}
                  {msg.videoUrl && (
                    <video
                      src={msg.videoUrl}
                      className="w-full h-full object-scale-down"
                      controls
                    />
                  )}
                </div>
                <p className="px-2">{msg.text}</p>
                <p className="text-xs mr-auto w-fit">
                  {moment(msg.createdAt).format("hh:mm")}
                </p>
              </div>
            );
          })}
        </div>

        {/* upload image display */}
        {message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-darkMode-dark700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            {/* close button */}
            <div
              onClick={handleClearUploadImage}
              className="w-fit p-2 absolute top-0 right-0 text-mainColor900 hover:text-red-500 duration-200  cursor-pointer"
            >
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <img
                src={message?.imageUrl}
                className="aspect-square h-full max-w-sm m-2 object-scale-down"
                alt={message?.text}
              />
            </div>
          </div>
        )}
        {/* upload video display */}
        {message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-darkMode-dark700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            {/* close button */}
            <div
              onClick={handleClearUploadVideo}
              className="w-fit p-2 absolute top-0 right-0 text-mainColor900 hover:text-red-500 duration-200  cursor-pointer"
            >
              <IoClose size={30} />
            </div>
            <div className="bg-white p-3">
              <video
                className="aspect-square h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
                src={message.videoUrl}
              ></video>
            </div>
          </div>
        )}
        {loading && (
          <div className="z-[500] w-full h-full sticky bottom-0 flex justify-center items-center">
            <Loading />
          </div>
        )}
      </section>
      {/* send message */}
      <section className="h-16 bg-white flex items-center px-4">
        <div className="relative">
          <button
            className="flex justify-center items-center duration-200 w-11 h-11 rounded-full hover:bg-mainColor500 hover:text-darkMode-dark50"
            onClick={handleUploadImageVideoOpen}
          >
            <FaPlus size={20} />
          </button>

          {/**video and image */}
          {openImageVideoUpload && (
            <div className="bg-white z-50 shadow rounded absolute bottom-14 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="hover:bg-darkMode-dark200 group duration-200 cursor-pointer px-3 rounded-md w-full"
                >
                  <div className="flex items-center p-2 gap-2 text-mainColor500">
                    <FaImage size={18} />
                    <p>صورة</p>
                  </div>
                </label>
                <input
                  type="file"
                  id="uploadImage"
                  onChange={handleUploadImage}
                  className="hidden"
                />
                <label
                  htmlFor="uploadVideo"
                  className="hover:bg-darkMode-dark200 group duration-200 cursor-pointer px-3 rounded-md w-full"
                >
                  <div className="flex items-center p-2 gap-2 text-mainColor500">
                    <FaVideo size={18} />
                    <p>فيديو</p>
                  </div>
                </label>
                <input
                  type="file"
                  id="uploadVideo"
                  onChange={handleUploadVideo}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>

        {/* input box  */}
        <form onSubmit={handleSendMessage} className="h-full w-full flex gap-2">
          <input
            type="text"
            placeholder="ادخل رسالتك هنا..."
            className="py-1 px-4 outline-none focus:outline-none focus:border-none border-none w-full h-full"
            value={message.text}
            onChange={handleOnChange}
          />
          <button className="text-mainColor500 hover:text-mainColor600 duration-200">
            <MdOutlineSend size={30} />
          </button>
        </form>
      </section>
    </div>
  );
};

export default MessagePart;
