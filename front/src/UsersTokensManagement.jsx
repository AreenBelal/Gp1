import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTeacher } from "./system-redux/users/teachers/singleTeacherSlice";
import { getSingleOwner } from "./system-redux/users/owners/singleOwnerSlice";
import { getSingleStudent } from "./system-redux/users/students/singleStudentSlice";

const UsersTokensManagement = () => {
  const { cn, tc, ro } = useSelector((state) => state.ma);

  const dispatch = useDispatch();
  useEffect(() => {
    if (tc) {
      const { role, id } = jwtDecode(tc);

      if (role === "TEACHER") {
        dispatch(getSingleTeacher(id));
      } else if (role === "OWNER") {
        dispatch(getSingleOwner(id));
      } else if (role === "STUDENT") {
        dispatch(getSingleStudent(id));
      }
    }
  }, [cn, tc]);

  return;
};

export default UsersTokensManagement;
