import React from "react";
import Avatar from "../../../components/Avatar";
import { Link } from "react-router-dom";

const UserSearchCard = ({ student, onClose }) => {
  return (
    <Link
      onClick={onClose}
      to={`/student/dashboard?id=${student?._id}`}
      className="flex items-center gap-3 p-2 lg:p-4 border-b  border-darkMode-dark400 hover:border hover:border-mainColor500  hover:rounded-md
     cursor-pointer duration-200"
    >
      <div>
        <Avatar
          userId={student?._id}
          width={50}
          height={50}
          name={student?.fullName}
          imageUrl={student?.avatar}
        />
      </div>
      <div>
        <div className="font-semibold text-ellipsis line-clamp-1">
          {student?.fullName}
        </div>
        <p className="text-sm">{student?.email}</p>
      </div>
    </Link>
  );
};

export default UserSearchCard;
