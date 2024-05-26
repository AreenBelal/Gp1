import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../../system-redux/data/apis";
import { FaFilePdf } from "react-icons/fa";

const CourseVideos = ({ course }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${base_url}/teachers/lectures/${
            course?.courseId || localStorage.idT
          }`
        );
        setVideos(response.data.data.teacherLectures);
        setCurrentVideoIndex(0); // Reset the current video index when videos are fetched
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [course?.courseId]);

  useEffect(() => {
    // Effect to ensure the component updates when currentVideoIndex changes
  }, [currentVideoIndex]);

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4">الفيديوهات</h2>
        {videos?.map((video, index) => (
          <div
            key={video._id}
            className={`cursor-pointer p-2 mb-2 ${
              currentVideoIndex === index
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setCurrentVideoIndex(index)}
          >
            {video.lectureTitle}
          </div>
        ))}
      </div>

      <div className="w-full md:w-3/4 p-4">
        {currentVideo ? (
          <>
            <video
              key={currentVideo.lectureVideo}
              className="w-full mb-4"
              controls
            >
              <source src={currentVideo.lectureVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h2 className="text-2xl font-bold mb-2">
              {currentVideo.lectureTitle}
            </h2>
            <p className="mb-4">{currentVideo.lectureDescription}</p>
            <div>
              <h3 className="text-lg font-bold mb-2">المرفقات:</h3>
              {currentVideo?.lectureAttachments.length > 0 ? (
                currentVideo.lectureAttachments.map((attachment, index) => (
                  <div key={index} className="mb-4">
                    <a
                      href={attachment.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-red-500 underline"
                    >
                      <FaFilePdf className="text-2xl" />
                      <span>{`مرفق ${index + 1}`}</span>
                    </a>
                    <p className="text-gray-700">
                      {attachment.attachmentDescription}
                    </p>
                  </div>
                ))
              ) : (
                <p>لا يوجد مرفقات لهذا الفيديو</p>
              )}
            </div>
          </>
        ) : (
          <p>تحميل الفيديو...</p>
        )}
      </div>
    </div>
  );
};

export default CourseVideos;
