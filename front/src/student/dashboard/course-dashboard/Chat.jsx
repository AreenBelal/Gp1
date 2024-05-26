import React, { useEffect } from "react";
import io from "socket.io-client";
import SidebarOfChat from "./SidebarOfChat";
import { useDispatch, useSelector } from "react-redux";
import {
  setOnlineStudents,
  setSocketConnection,
} from "../../../system-redux/functionality/socketIoSlice";
import MessagePart from "./MessagePart";
import { useSearchParams } from "react-router-dom";

const Chat = () => {
  const { tc } = useSelector((state) => state.ma);
  const dispatch = useDispatch();

  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("id");

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: tc,
      },
    });

    socketConnection.on("onlineUser", (data) => {
      dispatch(setOnlineStudents(data));
    });

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-[82vh] max-h-max">
      {/* sidebar */}
      <div className={`flex bg-white ${id && "hidden"} lg:block`}>
        <SidebarOfChat />
      </div>
      {/* message component */}
      <div className="bg-darkMode-dark100 block lg:hidden"></div>
      <div className={`bg-darkMode-dark300 ${!id && "hidden"} `}>
        <MessagePart />
      </div>

      {!id && (
        <div className="hidden lg:flex justify-center items-center flex-col gap-2 h-full bg-darkMode-dark100">
          <div>
            <p className="text-6xl font-bold tracking-widest">تفوَّق</p>
          </div>
          <p className="text-lg text-darkMode-dark500 mt-2">
            اختر طالب لبدء محادثة معه
          </p>
        </div>
      )}

      {/* end */}
    </div>
  );
};

export default Chat;
