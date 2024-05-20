import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { auth } from "./users/auth/authSlice";

// redux persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { simpleDataFlowManagement } from "./simpleDataFlowManagementSlice";
import { usersManagement } from "./usersManagementSlice";
import { singleTeacher } from "./users/teachers/singleTeacherSlice";
import { singleOwner } from "./users/owners/singleOwnerSlice";
import { allTeachers } from "./users/teachers/allTeachersSlice";
import { allAdminNotifications } from "./users/owners/allAdminNotificationsSlice";
import { allAds } from "./functionality/ads/allAdsSlice";
import { singleStudent } from "./users/students/singleStudentSlice";
import { allCourses } from "./functionality/courses/allCoursesSlice";
import { allCoursesInCart } from "./functionality/cart/allCoursesInCartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ma"],
};

const rootReducer = combineReducers({
  ma: auth,
  simpleDataFlowManagement,
  usersManagement,
  singleTeacher,
  singleOwner,
  allTeachers,
  allAdminNotifications,
  allAds,
  singleStudent,

  //
  allCourses,

  //
  allCoursesInCart,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// end

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
