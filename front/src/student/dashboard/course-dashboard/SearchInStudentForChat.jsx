import React, { useEffect, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import Loading from "../../../components/Loading";
import UserSearchCard from "./UserSearchCard";
import { toast } from "react-hot-toast";
import { base_url } from "../../../system-redux/data/apis";
import axios from "axios";
const SearchInStudentForChat = ({ onClose }) => {
  const [searchStudent, setSearchStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${base_url}/students/search`, {
        search: search,
      });
      setSearchStudent(res?.data?.data?.students);
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  console.log("searchStudent:", searchStudent);
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-darkMode-dark700 bg-opacity-40 p-2 z-10">
      <div className="w-full max-w-lg mx-auto mt-44">
        {/* input search  in student */}
        <div className="flex items-center bg-darkMode-dark50 rounded h-14 overflow-auto">
          <input
            type="text"
            placeholder="ابحث في الطلاب من خلال اسمائهم أو إيميلاتهم..."
            className="w-full outline-none py-1 h-full px-4"
            name=""
            id=""
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
          <div className="h-14 w-14 bg-darkMode-dark50 flex justify-center items-center">
            <IoSearchOutline size={24} />
          </div>
        </div>

        {/* display search Student */}
        <div className="bg-darkMode-dark50 mt-2 w-full p-4 rounded">
          {/* no Student found */}
          {searchStudent.length === 0 && !loading && (
            <p className="text-center text-darkMode-dark600">
              {" "}
              لا يوجد طلاب حتي الآن
            </p>
          )}

          {loading && (
            <p>
              <Loading />
            </p>
          )}

          {searchStudent.length !== 0 &&
            !loading &&
            searchStudent.map((student, index) => {
              return (
                <UserSearchCard
                  onClose={onClose}
                  key={index}
                  student={student}
                />
              );
            })}
        </div>
      </div>
      <div
        className="absolute top-32  right-5 lg:right-80 text-3xl p-2 lg:text-5xl hover:text-red-600 text-red-500 duration-200 z-50"
        onClick={onClose}
      >
        <button>
          <IoClose size={30} />
        </button>
      </div>
    </div>
  );
};

export default SearchInStudentForChat;
